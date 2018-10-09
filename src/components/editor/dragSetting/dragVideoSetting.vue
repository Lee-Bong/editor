<template>
  <div :class="['setting-content', editor.isVideoSet
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
      <div class="setting" :style="{ maxHeight: setForm.maxHeight + 'px'}">
        <el-form ref="form" label-width="80px">
          <el-form-item label="类型：" size="mini">
            <el-radio v-model="dragForm.sourceType"
              @change="sourceChange('1')" label="1">本地上传</el-radio>
            <el-radio v-model="dragForm.sourceType"
              @change="sourceChange('2')" label="2">在线视频</el-radio>
          </el-form-item>
          <el-form-item v-if="dragForm.sourceType === '1'"
            label="选择视频：" size="mini" class="is-require video-el">
            <media-upload :source="mediaSource" @upload-done="mediaUploadDone"
            @file-remove="mediaFileRemove" ref="mediaUpload" :dec="mediaDec"/>
          </el-form-item>
          <el-form-item v-if="dragForm.sourceType === '2'" label="视频链接："
            size="mini" class="is-require video-el">
            <el-input type="text" ref="lineVideo"
               v-model="lineSource" @blur="lineSourceBlur"></el-input>
          </el-form-item>
          <el-form-item label="视频封面：" size="mini" class="is-require video-el">
            <img-uplaod :imgObj="imgObj" @upload-done="uploadDone" @file-remove="fileRemove"
              :dec="String('图片尺寸16:9')"/>
          </el-form-item>
          <el-form-item label="位置：" size="mini" class="number-item">
            <el-input-number v-model="locationX" @change="locationXchange"
              :min="location.xmin"
              :max="mediaSource.size ? (page.phoneWidth-mediaSource.size.w) : 375"
              :disabled="!isAction" controls-position="right"
              class="num-input"></el-input-number>
            <el-input-number v-model="locationY" @change="locationYchange"
              :min="location.ymin"
              :max="mediaSource.size ? (page.phoneHeight-mediaSource.size.h) : 667"
              :disabled="!isAction" controls-position="right"
              class="num-input"></el-input-number>
          </el-form-item>
          <div class="dec-label"> <label>X</label> <label> Y</label></div>
          <el-form-item label="尺寸：" size="mini" class="number-item">
            <el-input-number v-model="videoW" @change="sizeWChange"
              :min="size.wmin"
              :max="mediaSource.location ? (page.phoneWidth-mediaSource.location.x) : 375"
              :disabled="!isAction" controls-position="right"
              class="num-input"></el-input-number>
            <el-input-number v-model="videoH" @change="sizeHChange"
              :min="size.hmin"
              :max="mediaSource.location ? (page.phoneHeight-mediaSource.location.y) : 667"
              :disabled="!isAction" controls-position="right"
              class="num-input"></el-input-number>
          </el-form-item>
          <div class="dec-label"> <label>宽</label> <label>高</label></div>
          <div v-if="isAction">
            <el-form-item label="固定位置：" size="mini" class="posotion-item">
              <el-radio v-model="playPositon" label="relative"
               @change="positionChange('relative')">不固定</el-radio>
              <el-radio v-model="playPositon" label="fixedTop" @change="positionChange('fixedTop')"
                >相对顶部固定</el-radio>
              <el-radio v-model="playPositon" label="fixedBottom"
                @change="positionChange('fixedBottom')"
                >相对底部固定</el-radio>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="playPositon === 'fixedTop'">
              <el-input-number
                v-model="locationY" @change="fixedTopChange"
                :min="location.ymin" :max="(page.screenHeight-mediaSource.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="playPositon === 'fixedBottom'">
              <el-input-number
                v-model="locationBottom" @change="fixedBottomChange"
                :min="location.ymin" :max="(page.screenHeight-mediaSource.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <video ref="videoLoad" controls v-show="false">
    </video>
  </div>
</template>

<script>
import oss from '@/service/oss';
import imgUplaod from '@/components/editor/dragSetting/upload/imgUpload';
import mediaUpload from '@/components/editor/dragSetting/upload/mediaUpload';
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  computed: {
    isAction() {
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.video && this.dragForm.video.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.lineVideo && this.dragForm.lineVideo.url);
    },
    locationAble() {
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.video && this.dragForm.video.location)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.lineVideo && this.dragForm.lineVideo.location);
    },
    locationX: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.location ? curPlay.location.x : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    locationY: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.location ? curPlay.location.y : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    locationBottom: {
      get() {
        return this.$store.state.page.screenHeight - this.locationY
            - this.dragForm.size.h;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    mediaSource: {
      get() {
        return this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    playPositon: {
      get() {
        const position = this.dragForm.sourceType === '1' ? this.dragForm.video.position : this.dragForm.lineVideo.position;
        return position;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    imgObj: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.poster !== 'https://sc.seeyouyima.com/bfe/we/e4af0bea1d97f51eab3c80d99e34f0ce.png' ?
          { url: curPlay.poster } : { url: '' };
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    videoW: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.size ? curPlay.size.w : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    videoH: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.size ? curPlay.size.h : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    imgUplaod,
    mediaUpload,
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
      lineSource: '',
      isLineUpload: false,
      lastCont: '', // 标记二次在线url是否一致
      mediaDec: '仅支持MP4格式',
    };
  },
  methods: {
    sourceChange(type) {
      const isActive = Boolean(this.dragForm.sourceType === '1' && this.dragForm.video && this.dragForm.video.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.lineVideo && this.dragForm.lineVideo.url);
      if (!isActive && (this.dragForm.size.h !== this.editor.mediaHeight
        || this.dragForm.size.w !== this.page.phoneWidth
        || !this.dragForm.isLineUpload)) {
        this.setVideoInit();
      } else {
        const videoObj = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        this.setVideoInit({
          size: {
            w: videoObj.w,
            h: videoObj.h,
          },
          location: {
            x: videoObj.x,
            y: videoObj.y,
          },
        });
      }
      this.$emit('videoSourceChange', type, 'dragVideos', 'videoActive');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isVideoSet: false });
    },
    locationXchange(val) {
      this.locationChange({
        x: val,
        y: this.locationY,
      });
    },
    locationYchange(val) {
      this.locationChange({
        x: this.locationX,
        y: val,
      });
    },
    locationChange(location) { // 位置值发生改变
      const isAction = this.dragForm.sourceType === '1';
      const curPlay = isAction ? this.dragForm.video : this.dragForm.lineVideo;
      curPlay.location = location;
      let playObj = {};
      if (isAction) {
        playObj = { video: curPlay };
      } else {
        playObj = { lineVideo: curPlay };
      }
      const { dragVideos, videoActive } = this.editor;
      let drags = dragVideos[videoActive];
      drags = Object.assign({}, drags, playObj);
      dragVideos[videoActive] = drags;
      const lists = Object.assign([], dragVideos);
      this.$store.commit('editor_update', { dragVideos: lists });
    },
    sizeWChange(val) {
      this.sizeChange({
        w: val,
        h: this.dragForm.size.h,
      }, 1);
    },
    sizeHChange(val) {
      this.sizeChange({
        w: this.dragForm.size.w,
        h: val,
      }, 2);
    },
    sizeChange(sizeObj, type) { // 大小值发生改变
      let size = sizeObj;
      const curVideo = this.dragForm.sourceType === '1' ? 'video' : 'lineVideo';
      const videoObj = this.dragForm[curVideo];
      const maxW = this.page.phoneWidth - videoObj.location.x;
      const maxH = this.page.phoneHeight - videoObj.location.y;

      if (type === 1) {
        let newW = size.w > maxW ? maxW : size.w;
        let newH = (videoObj.h * size.w) / videoObj.w;
        if (newH > maxH) {
          newH = maxH;
          newW = (videoObj.w * newH) / videoObj.h;
        }
        size = {
          w: newW,
          h: newH,
        };
      } else {
        let newW = (videoObj.w * size.h) / videoObj.h;
        let newH = size.h > maxH ? maxH : size.h;
        if (newW > maxW) {
          newW = maxW;
          newH = (videoObj.h * newW) / videoObj.w;
        }
        size = {
          w: newW,
          h: newH,
        };
      }
      videoObj.size = size;
      videoObj.location = videoObj.location;
      const videoList = this.editor.dragVideos;
      const videos = Object.assign(
        {}, videoList[this.editor.videoActive],
        {
          curVideo: videoObj,
          isUpload: false,
        },
      );
      videoList[this.editor.videoActive] = videos;
      this.$store.commit('editor_update', { dragVideos: videoList });
      this.ratioSet(this, 'dragVideos', 'videoActive');
    },
    async onFileChange(file) {
      const up = await oss(file.raw);
      if (up && up.url) {
        this.onFileSuccess(up);
      }
    },
    mediaUploadDone(file) {
      this.onMediaFileSuccess(file, 'dragVideos', 'videoActive');
    },
    mediaFileRemove() {
      this.mediaChange({
        poster: '',
        url: '',
        name: '',
        position: 'relative',
        title: '',
      }, this, 'dragVideos', 'videoActive', true);
    },
    onMediaFileSuccess(file, dragList, active) {
      this.$refs.videoLoad.src = file.url;
      const ele = this;
      this.$refs.videoLoad.addEventListener('loadedmetadata', function cb() {
        if (ele.$refs.videoLoad.currentSrc !== file.url) return false;
        ele.$refs.mediaUpload.uplaodDone();
        if (ele.dragForm.sourceType === '1') {
          ele.$message({
            message: '视频上传成功～',
            type: 'success',
            duration: 2000,
          });
        } else {
          ele.$message({
            message: '在线视频访问成功～',
            type: 'success',
            duration: 2000,
          });
        }
        const videos = ele.editor[dragList];
        const drags = videos[ele.editor[active]];
        const newH = (this.videoHeight * ele.page.phoneWidth) / this.videoWidth;

        const video = {
          sourceW: this.videoWidth,
          sourceH: this.videoHeight,
          w: ele.page.phoneWidth,
          h: newH,
          location: {
            x: 0,
            y: 0,
          },
          size: {
            w: ele.page.phoneWidth,
            h: newH,
          },
          title: file.name || '',
          name: file.name || '',
          url: file.url,
          isPoster: !!drags.poster,
          poster: drags.poster ? drags.poster : 'https://sc.seeyouyima.com/bfe/we/e4af0bea1d97f51eab3c80d99e34f0ce.png',
        };
        ele.mediaChange(video, ele, dragList, active);
      });
      this.$refs.videoLoad.addEventListener('error', () => {
        if (ele.dragForm.sourceType === '2') {
          ele.onFileError('资源不存在或已经损坏，请重试～');
          ele.$refs.lineVideo.focus();
          ele.mediaChange({
            poster: '',
            url: '',
          }, ele, 'dragVideos', 'videoActive', true);
        } else {
          ele.onFileError();
          ele.mediaChange({}, ele, dragList, active, true);
        }
      });
    },
    mediaChange(play, ele, dragList, active, isRemove, isChange) {
      const lists = ele.editor[dragList];
      let drags = lists[ele.editor[active]];
      let videoObj = {};
      const isAction = ele.dragForm.sourceType === '1';
      const curPlay = isAction ? ele.dragForm.video : ele.dragForm.lineVideo;
      const video = Object.assign({}, curPlay, play);
      if (isRemove) {
        video.size = {
          w: ele.page.phoneWidth,
          h: ele.editor.mediaHeight,
        };
      }
      if (isChange || isRemove) {
        video.location = {
          x: 0,
          y: 0,
        };
      }
      if (!isChange) {
        videoObj = { video };
        if (this.dragForm.sourceType === '2') {
          videoObj = { lineVideo: video };
        }
      }
      drags = Object.assign({}, drags, videoObj, { isUpload: false });
      lists[ele.editor[active]] = drags;
      ele.$store.commit('editor_update', { [dragList]: lists });
      this.ratioSet(ele, dragList, active);
    },
    onFileError(msg) { // 图片上传失败
      this.fileFail = true;
      this.fileAble = false;
      const message = msg || '视频上传失败，请重试～';
      this.$message({
        message,
        type: 'error',
        duration: 2000,
      });
      if (!msg) this.$refs.mediaUpload.uplaodDone(true);
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
          poster: 'https://sc.seeyouyima.com/bfe/we/e4af0bea1d97f51eab3c80d99e34f0ce.png',
          posterTitle: '',
          isPoster: false,
        };
      }
      const videos = this.editor.dragVideos;
      const drags = videos[this.editor.videoActive];
      drags.poster = newFile.poster;
      drags.video = Object.assign({}, drags.video, newFile);
      drags.lineVideo = Object.assign({}, drags.lineVideo, newFile);
      videos[this.editor.videoActive] = drags;
      this.$store.commit('editor_update', { dragVideos: videos });
    },
    fileRemove() {
      this.uploadDone();
    },
    ratioSet(ele, dragList, active) {
      const lists = ele.editor[dragList];
      let drags = lists[ele.editor[active]];
      const ratioTime = setTimeout(() => {
        drags = Object.assign({}, drags, { isUpload: true });
        lists[ele.editor[active]] = drags;
        ele.$store.commit('editor_update', { [dragList]: lists });
        clearTimeout(ratioTime);
      }, 100);
    },
    positionChange(val) {
      const curPlay = this.dragForm.sourceType === '1' ? 'video' : 'lineVideo';
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      const videos = this.editor.dragVideos;
      if (val !== 'relative' && curPlay.size.h > this.page.screenHeight) {
        this.$message({
          message: '组件高度大于一屏，无法设置固定位置～',
          type: 'error',
          duration: 2000,
        });
        const { dragVideos, videoActive } = this.editor;
        dragVideos[videoActive].position = 'relative';
        this.$store.commit('editor_update', {
          dragVideos,
        });
        return false;
      }
      let drags = videos[this.editor.videoActive];
      if (drags[curPlay].location.y > maxBottom && val !== 'relative') {
        drags[curPlay].location.y = maxBottom;
      }
      drags[curPlay].position = val;
      drags = Object.assign({}, drags, drags[curPlay]);
      videos[this.editor.videoActive] = drags;
      this.$store.commit('editor_update', { dragVideos: videos });
    },
    lineSourceBlur() {
      const val = this.lineSource;
      if (this.lastCont && this.lastCont === val) return false;
      this.lastCont = val;
      if (val) {
        if (this.dragForm.lineVideo &&
        this.dragForm.lineVideo.url && this.dragForm.lineVideo.url === val) return false;
        this.onMediaFileSuccess({ url: val }, 'dragVideos', 'videoActive');
      } else {
        this.setVideoInit(null, true);
      }
    },
    onlineFileError() { // 图片上传失败
      this.$message({
        message: '该资源不存在或者已经损坏，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
    setVideoInit(newVideo, isClear) { // 恢复视频初始展示
      let newObj = {
        sourceType: this.dragForm.sourceType,
        isUpload: false,
        size: {
          w: this.page.phoneWidth,
          h: this.editor.mediaHeight,
        },
        location: {
          x: 0,
          y: 0,
        },
      };
      if (newVideo) {
        newObj = Object.assign({}, newObj, newVideo);
      }
      if (isClear) {
        if (this.dragForm.sourceType === '1' && this.dragForm.video.url) {
          newObj = Object.assign({}, newObj, { video: { url: '' } });
        } else if (this.dragForm.sourceType === '2' && this.dragForm.lineVideo.url) {
          newObj = Object.assign({}, newObj, { lineVideo: { url: '' } });
        }
      }
      const videos = this.editor.dragVideos;
      let drags = videos[this.editor.videoActive];
      drags = Object.assign({}, drags, newObj);
      videos[this.editor.videoActive] = drags;
      this.$store.commit('editor_update', { dragVideos: videos });
    },
  },
  mounted() {
    const ele = this;
    this.$nextTick(() => {
      ele.lineSource = this.dragForm.lineVideo.url;
    });
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
.video-setting .el-input__inner {
  padding: 0 8px;
}
.video-setting .el-form-item__content {
  margin-left: 0 !important;
}
</style>
