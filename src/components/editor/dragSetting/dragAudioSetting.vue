<template>
  <div
    :class="['setting-content', $store.state.editor.isAudioSet ? 'setting-show' : '']"
    :style="{width: setForm.width+'px'
    }">
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
          <el-radio v-model="dragForm.sourceType" label="1"
            @change="audioSourceChange('1')">本地上传</el-radio>
          <el-radio v-model="dragForm.sourceType" label="2"
            @change="audioSourceChange('2')">在线音频</el-radio>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '1'" label="上传音频：" size="mini"
          class="is-require audio-el">
          <media-upload :source="mediaSource" @upload-done="uploadDone"
          @file-remove="fileRemove" ref="mediaUpload"/>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '1'" label="标题：" size="mini" class="audio-el">
          <el-input type="text" v-model="title"
           :disabled="!dragForm.play.url" @blur="lineTitleBlur"></el-input>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '2'" label="音频链接：" size="mini"
          class="is-require audio-el">
          <el-input type="text" v-model="lineSource" @blur="lineSourceBlur"></el-input>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '2'" label="标题：" size="mini" class="audio-el">
          <el-input type="text" v-model="lineTitle"
           :disabled="!dragForm.linePlay.url" @blur="lineTitleBlur"></el-input>
        </el-form-item>
        <el-form-item label="循环：" size="mini">
          <el-checkbox v-model="dragForm.loop">开启循环播放</el-checkbox>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
            :disabled="!dragForm.isUpload" controls-position="right"
            class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :min="location.ymin" :max="yMax"
            :disabled="!dragForm.isUpload" controls-position="right"
            class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <div v-if="dragForm.isUpload">
            <el-form-item label="固定位置：" size="mini">
            <el-radio v-model="dragForm.position" label="relative">不固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedTop" @change="positionChange"
              >相对顶部固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedBottom" @change="positionChange"
              >相对底部固定</el-radio>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'">
              <el-input-number
                v-model="fixedTop" @change="fixedTopChange"
                :min="location.ymin" :max="($store.state.page.screenHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'">
              <el-input-number
                v-model="fixedBottom" @change="fixedBottomChange"
                :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
   <audio v-show="false" ref="audioLoad" />
   </div>
</template>

<script>
import mediaUpload from '@/components/editor/dragSetting/upload/mediaUpload';
import { formatSecond } from '@/util/tools';
import dragCom from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    mediaUpload,
  },
  data() {
    return {
      isUpload: false,
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      mediaSource: {
        accept: '.mp3',
      },
      lastCont: '',
      lineSource: '',
      lineTitle: '',
      title: '',
    };
  },
  methods: {
    audioSourceChange(type) {
      const isActive = Boolean(this.dragForm.sourceType === '1' && this.dragForm.play && this.dragForm.play.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.linePlay && this.dragForm.linePlay.url);
      if (!isActive) {
        this.setMediaInit();
      } else {
        const playObj = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        this.setMediaInit({
          size: {
            w: playObj.w,
            h: playObj.h,
          },
          location: {
            x: playObj.x,
            y: playObj.y,
          },
        });
      }
      this.$emit('audioSourceChange', type, 'dragAudios', 'audioActive');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isAudioSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragAudios', this.dragForm.location, 'audioActive');
    },
    uploadDone(file) {
      this.onFileSuccess(file, 'dragAudios', 'audioActive');
    },
    fileRemove() {
      this.mediaSource.name = '';
      this.title = '';
      const play = {
        title: '',
        url: '',
        second: 0,
        duration: '00:00',
        isUplaod: false,
        loop: false,
        w: this.$store.state.page.phoneWidth,
        h: 82,
        x: 0,
        y: 0,
      };
      let playObj = { play };
      if (this.dragForm.sourceType === '2') {
        playObj = { linePlay: play };
      }
      this.audioChange(playObj, this, 'dragAudios', 'audioActive', true);
    },
    onFileSuccess(file, dragList, active) {
      this.$refs.audioLoad.setAttribute('src', file.url);
      const ele = this;
      this.$refs.audioLoad.addEventListener('loadedmetadata', function cb() {
        const beforeName = file.beforeName ? file.beforeName : file.name;
        const name = ele.dragForm.sourceType === '1' ? beforeName : file.url;
        if (ele.dragForm.sourceType === '1') ele.mediaSource = { name, accept: '.mp3' };
        const se = this.duration;
        const play = {
          title: name,
          url: file.url,
          second: se,
          duration: formatSecond(se),
          isUplaod: true,
          loop: false,
          w: ele.$store.state.page.phoneWidth,
          h: 82,
          x: 0,
          y: 0,
        };
        let playObj = { play };
        if (ele.dragForm.sourceType === '2') {
          playObj = { linePlay: play };
        }
        ele.audioChange(playObj, ele, dragList, active);
        if (ele.dragForm.sourceType === '1') {
          ele.$message({
            message: '音频上传成功～',
            type: 'success',
            duration: 2000,
          });
          ele.title = name;
          ele.$refs.mediaUpload.uplaodDone();
        } else {
          ele.$message({
            message: '在线音频访问成功～',
            type: 'success',
            duration: 2000,
          });
          ele.lineTitle = name;
        }
      });

      this.$refs.audioLoad.addEventListener('error', () => {
        if (ele.dragForm.sourceType === '2') {
          ele.onFileError('资源不存在或已经损坏，请重试～');
        } else {
          ele.onFileError();
        }
        this.setMediaInit(null, true);
      });
    },
    audioChange(play, ele, dragList, active, isRemove) {
      const lists = ele.$store.state.editor[dragList];
      let drags = lists[ele.$store.state.editor[active]];
      drags = Object.assign({}, drags, play);
      if (!isRemove) {
        drags.location = {
          x: 0,
          y: 0,
        };
        drags.isUpload = true;
      } else {
        drags.isUpload = false;
      }
      lists[ele.$store.state.editor[active]] = drags;
      ele.$store.commit('editor_update', { [dragList]: lists });
      setTimeout(() => {
        drags.isUpload = true;
        lists[ele.$store.state.editor[active]] = drags;
        ele.$store.commit('editor_update', { [dragList]: lists });
      }, 100);
    },
    onFileError(msg) { // 图片上传失败
      this.fileFail = true;
      this.fileAble = false;
      const message = msg || '音频上传失败，请重试～';
      this.$message({
        message,
        type: 'error',
        duration: 2000,
      });
      if (!msg) this.$refs.mediaUpload.uplaodDone(true);
    },
    positionChange() {
      const maxBottom = this.$store.state.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        const { location } = this.dragForm;
        location.y = maxBottom;
        this.$emit('input-locationChange', 'dragAudios', location, 'audioActive');
      }
    },
    lineSourceBlur() {
      const val = this.lineSource;
      if (this.lastCont && this.lastCont === val) return false;
      this.lastCont = val;
      if (val) {
        if (this.dragForm.linePlay &&
        this.dragForm.linePlay.url && this.dragForm.linePlay.url === val) return false;
        this.onFileSuccess({ url: val }, 'dragAudios', 'audioActive');
      } else {
        this.setMediaInit(null, true);
      }
    },
    setMediaInit(newMedia, isClear) {
      let newObj = {
        sourceType: this.dragForm.sourceType,
        isUpload: false,
        size: {
          w: this.$store.state.page.phoneWidth,
          h: this.$store.state.editor.audioHeight,
        },
        location: {
          x: 0,
          y: 0,
        },
      };
      if (newMedia) {
        newObj = Object.assign({}, newObj, newMedia);
      }
      if (isClear) {
        const init = {
          title: '',
          isUplaod: false,
          duration: '00:00',
          url: '',
        };
        if (this.dragForm.sourceType === '1' && this.dragForm.play.url) {
          this.title = '';
          newObj = Object.assign({}, newObj, { play: init });
        } else if (this.dragForm.sourceType === '2' && this.dragForm.linePlay.url) {
          this.lineTitle = '';
          newObj = Object.assign({}, newObj, { linePlay: init });
        }
      }
      const medias = this.$store.state.editor.dragAudios;
      let drags = medias[this.$store.state.editor.audioActive];
      drags = Object.assign({}, drags, newObj);
      medias[this.$store.state.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: medias });
    },
    lineTitleBlur() {
      const isAction = this.dragForm.sourceType === '1';
      const obj = isAction ? 'play' : 'linePlay';
      const title = isAction ? this.title : this.lineTitle;
      const medias = this.$store.state.editor.dragAudios;
      let drags = medias[this.$store.state.editor.audioActive];
      const play = Object.assign({}, drags[obj], { title });
      drags = Object.assign({}, drags, { [obj]: play });
      medias[this.$store.state.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: medias });
    },
  },
  updated() {

  },
};
</script>

<style>
.audio-el.el-form-item--mini .el-form-item__content {
    display: inline-block;
    width: 255px;
}
.audio-el .el-input__inner {
  padding: 0 8px;
}
</style>
