<template>
  <div :class="['setting-content', $store.state.editor.isVideoSet
    ? 'setting-show' : '', 'video-setting']"
    :style="{width: setForm.width+'px'}"
  >
    <div class="setting-box">
      <div class="setting-title">
        <span>组件设置</span>
        <span class="header-btn">
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
            <audio-uplaod :source="mediaSource" @upload-done="mediaUploadDone"
            @file-remove="mediaFileRemove"/>
          </el-form-item>
          <el-form-item v-if="dragForm.sourceType === '2'" label="视频链接："
            size="mini" class="video-el">
            <el-input type="text" v-model="dragForm.textColor"></el-input>
          </el-form-item>
          <el-form-item label="视频封面：" size="mini" class="video-el">
            <img-uplaod :imgObj="imgObj" @upload-done="uploadDone" @file-remove="fileRemove"/>
          </el-form-item>
          <el-form-item label="位置：" size="mini">
            <el-input-number v-model="dragForm.location.x" @change="locationChange"
              :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
              :disabled="!Boolean(dragForm.video && dragForm.video.url)" controls-position="right"
              class="num-input"></el-input-number>
            <el-input-number v-model="dragForm.location.y" @change="locationChange"
              :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
              :disabled="!Boolean(dragForm.video && dragForm.video.url)" controls-position="right"
              class="num-input"></el-input-number>
          </el-form-item>
          <div class="dec-label"> <label>X</label> <label> Y</label></div>
          <el-form-item label="尺寸：" size="mini">
            <el-input-number v-model="dragForm.size.w" @change="sizeChange(1)"
              :min="size.wmin" :max="$store.state.page.phoneWidth-dragForm.location.x"
              :disabled="!Boolean(dragForm.video && dragForm.video.url)" controls-position="right"
              class="num-input"></el-input-number>
            <el-input-number v-model="dragForm.size.h" @change="sizeChange(2)"
              :min="size.hmin" :max="$store.state.page.phoneHeight-dragForm.location.y"
              :disabled="!Boolean(dragForm.video && dragForm.video.url)" controls-position="right"
              class="num-input"></el-input-number>
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
import audioUplaod from '@/components/editor/dragItem/image/audioUpload';


export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgUplaod,
    audioUplaod,
  },
  data() {
    return {
      limit: 1,
      fileList: [],
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      imgObj: {},
      mediaSource: {
        accept: '.mp4',
      },
    };
  },
  methods: {
    sourceChange(type) {
      this.$emit('videoSourceChange', type, 'dragVideos', 'videoActive');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isVideoSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragVideos', this.dragForm.location, 'videoActive');
    },
    sizeChange(type) { // 大小值发生改变
      let { size } = this.dragForm;
      const { video } = this.dragForm;
      if (type === 1) {
        let newW = size.w;
        let newH = (video.h * size.w) / video.w;
        const maxH = this.$store.state.page.phoneHeight - this.dragForm.location.y;
        if (newH > maxH) {
          newH = maxH;
          newW = (video.w * newH) / video.h;
        }
        size = {
          w: newW,
          h: newH,
        };
      } else {
        let newW = (video.w * size.h) / video.h;
        let newH = size.h;
        const maxW = this.$store.state.page.phoneWidth - this.dragForm.location.x;
        if (newW > maxW) {
          newW = maxW;
          newH = (video.h * newW) / video.w;
        }
        size = {
          w: newW,
          h: newH,
        };
      }
      this.$emit('input-sizeChange', 'dragVideos', size, 'videoActive');
      this.ratioSet(this, 'dragVideos', 'videoActive');
    },
    async onFileChange(file) {
      const up = await oss(file.raw);
      if (up && up.url) {
        this.onFileSuccess(up);
      }
    },
    mediaUploadDone(file) {
      this.mediaSource = Object.assign({}, this.mediaSource, { name: file.beforeName });
      this.onMediaFileSuccess(file, 'dragVideos', 'videoActive');
    },
    mediaFileRemove() {
      this.mediaSource = Object.assign({}, this.mediaSource, { name: '', url: '' });
      this.mediaChange({
        poster: '',
        url: '',
      }, this, 'dragVideos', 'videoActive', true);
    },
    onMediaFileSuccess(file, dragList, active) {
      this.$refs.videoLoad.setAttribute('src', file.url);
      const ele = this;
      this.$refs.videoLoad.addEventListener('loadedmetadata', function cb() {
        ele.$message({
          message: '视频上传成功～',
          type: 'success',
          duration: 2000,
        });

        const videos = ele.$store.state.editor[dragList];
        const drags = videos[ele.$store.state.editor[active]];
        const newH = (this.videoHeight * ele.$store.state.page.phoneWidth) / this.videoWidth;
        const video = {
          w: ele.$store.state.page.phoneWidth,
          h: newH,
          title: file.name,
          url: file.url,
          isPoster: !!drags.video.poster,
          poster: drags.video.poster ? drags.video.poster : 'https://sc.seeyouyima.com/bfe/we/e4af0bea1d97f51eab3c80d99e34f0ce.png',
        };
        ele.mediaChange(video, ele, dragList, active);
        setTimeout(() => {
          drags.isUpload = true;
          videos[ele.$store.state.editor[active]] = drags;
          ele.$store.commit('editor_update', { dragVideos: videos });
        }, 100);
      });
    },
    mediaChange(video, ele, dragList, active, isRemove) {
      const lists = ele.$store.state.editor[dragList];
      let drags = lists[ele.$store.state.editor[active]];
      const clone = Object.assign({}, { video });
      clone.isUpload = false;
      if (!isRemove) {
        clone.location = {
          x: 0,
          y: 0,
        };
        clone.size = {
          w: ele.$store.state.page.phoneWidth,
          h: video.h,
        };
      } else {
        clone.size = {
          w: ele.$store.state.page.phoneWidth,
          h: ele.$store.state.editor.mediaHeight,
        };
      }
      drags = Object.assign(drags, clone);
      lists[ele.$store.state.editor[active]] = drags;
      ele.$store.commit('editor_update', { [dragList]: lists });
      this.ratioSet(ele, dragList, active);
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
      let newFile;
      if (file && file.url) {
        this.imgObj = { url: file.url };
        newFile = {
          poster: file.url,
          posterTitle: file.name,
          isPoster: true,
        };
      } else {
        this.imgObj = {};
        newFile = {
          poster: '',
          posterTitle: '',
          isPoster: false,
        };
      }
      const videos = this.$store.state.editor.dragVideos;
      const drags = videos[this.$store.state.editor.videoActive];
      drags.video = Object.assign({}, drags.video, newFile);
      videos[this.$store.state.editor.videoActive] = drags;
      this.$store.commit('editor_update', { dragVideos: videos });
    },
    fileRemove() {
      this.uploadDone();
    },
    ratioSet(ele, dragList, active) {
      const lists = ele.$store.state.editor[dragList];
      let drags = lists[ele.$store.state.editor[active]];
      setTimeout(() => {
        drags = Object.assign(drags, { isUpload: true });
        lists[ele.$store.state.editor[active]] = drags;
        ele.$store.commit('editor_update', { [dragList]: lists });
      }, 100);
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
