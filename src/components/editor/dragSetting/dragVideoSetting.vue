<template>
  <div :class="['setting-content', $store.state.editor.isVideoSet
    ? 'setting-show' : '', 'video-setting']"
    :style="{width: setForm.width+'px'}"
  >
  <div class="setting-box">
    <div class="setting-title">
      <span>组件设置</span>
      <span class="header-btn">
          <i class="el-icon-news" @click="settingFixed"></i>
          <i class="el-icon-close" @click="settingClose"></i>
      </span>
    </div>
    <div class="setting">
      <el-form ref="form" >
        <el-form-item label="类型：" size="mini">
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('1')" label="1">本地上传</el-radio>
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('2')" label="2">在线视频</el-radio>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '1'"
          label="选择视频：" size="mini" class="video-el">
          <el-upload
            class="upload-demo upload-video"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
            :auto-upload="false"
            :on-change="onFileChange"
            :file-list="fileList">
            <el-button size="small" type="primary">
              <i class="el-icon-upload el-icon--right"></i>选择视频</el-button>
            <div slot="tip" class="el-upload__tip">仅支持MP4格式</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '2'" label="视频链接：" size="mini" class="video-el">
          <el-input type="text" v-model="dragForm.textColor"></el-input>
        </el-form-item>
        <el-form-item label="视频封面：" size="mini" class="video-el">
          <img-uplaod @upload-done="uploadDone"/>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange"
            :min="size.wmin" :max="$store.state.editor.phoneWidth-dragForm.location.x"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange"
            :min="size.hmin" :max="$store.state.editor.phoneHeight-dragForm.location.y"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
        </el-form>

      </div>
    </div>
     <video ref="videoLoad" controls v-show="false">
        <source  type="video/mp4">
      </video>
   </div>
</template>

<script>
import oss from '@/util/oss';
import imgUplaod from '@/components/editor/dragItem/image/imgUpload';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgUplaod,
  },
  data() {
    return {
      sHeight: 800,
      limit: 1,
      sizeList: ['12px', '14px'],
      fileList: [],
      location: {
        x: 10000,
        y: 0,
        xmin: 0,
        xmax: 10000000,
        ymin: 0,
        ymax: 100,
      },
      size: {
        w: 80,
        h: 80,
        wmin: 0,
        // wmax: 100,
        hmin: 0,
        // hmax: 100,
      },
      form: '',
      textAlign: 1,
      textColor: 'rgba(19, 206, 102, 0.8)',
    };
  },
  methods: {
    textInputFocus() {
    },
    textInputClick() {
    },
    handleChange() {

    },
    sourceChange(type) {
      this.$emit('videoSourceChange', type, 'dragVideos', 'videoActive');
    },
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isVideoSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragVideos', this.dragForm.location, 'videoActive');
    },
    sizeChange() { // 大小值发生改变
      this.$emit('input-sizeChange', 'dragVideos', this.dragForm.size, 'videoActive');
    },
    async onFileChange(file) {
      const up = await oss(file.raw);
      if (up && up.url) {
        this.onFileSuccess(up);
      }
    },
    onFileSuccess(file) {
      this.$refs.videoLoad.setAttribute('src', file.url);
      const ele = this;
      this.$refs.videoLoad.addEventListener('loadedmetadata', () => {
        ele.$message({
          message: '视频上传成功～',
          type: 'success',
          duration: 2000,
        });

        // var tol = this.duration;
        const videos = ele.$store.state.editor.dragVideos;
        const drags = videos[ele.$store.state.editor.videoActive];
        const newH = (this.videoHeight * ele.$store.state.editor.phoneWidth) / this.videoWidth;
        const video = {
          w: this.videoWidth,
          h: this.videoHeight,
          title: file.name,
          url: file.url,
          poster: drags.video.poster ? drags.video.poster : 'https://sc.seeyouyima.com/bfe/we/e4af0bea1d97f51eab3c80d99e34f0ce.png',
        };
        drags.video = video;
        drags.location = {
          x: 0,
          y: 0,
        };
        drags.size = {
          h: newH,
          w: ele.$store.state.editor.phoneWidth,
        };

        drags.isUpload = false;
        videos[ele.$store.state.editor.videoActive] = drags;
        ele.$store.commit('editor_update', { dragVideos: videos });
        // todo 解决aspectRatio只根据初始值设定比例
        setTimeout(() => {
          drags.isUpload = true;
          videos[ele.$store.state.editor.videoActive] = drags;
          ele.$store.commit('editor_update', { dragVideos: videos });
        }, 100);
      });
    },
    onFileError() { // 图片上传失败
      this.fileFail = true;
      this.fileAble = false;
      this.$message({
        message: '视频上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
    uploadDone(file) { // 封面上传成功
      const videos = this.$store.state.editor.dragVideos;
      const drags = videos[this.$store.state.editor.videoActive];
      drags.video = Object.assign({}, drags.video, {
        poster: file.url,
        posterTitle: file.name,
      });
      videos[this.$store.state.editor.videoActive] = drags;
      this.$store.commit('editor_update', { dragVideos: videos });
    },
  },
};
</script>

<style>
.video-el.el-form-item--mini .el-form-item__content {
    display: inline-block;
    width: 255px;
}
.upload-video {
  display: inline-block;
  margin-left: 10px;
}
#videoLoad {
    visibility: hidden;
    position: absolute;
    z-index: -1;
    top: 0;
}
</style>
