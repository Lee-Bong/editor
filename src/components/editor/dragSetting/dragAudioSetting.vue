<template>
  <div
    :class="['setting-content', editor.isAudioSet ? 'setting-show' : '', 'audio-setting']"
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
      <el-form ref="form" label-width="80px" >
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
          <el-checkbox v-model="dragForm.loop" @change="loopChange">开启循环播放</el-checkbox>
        </el-form-item>
        <el-form-item label="位置：" size="mini" class="number-item">
          <el-input-number v-model="locationX" @change="locationXchange"
            :min="location.xmin" :max="(page.phoneWidth-dragForm.size.w)"
            :disabled="!isAction" controls-position="right"
            class="num-input"></el-input-number>
          <el-input-number v-model="locationY" @change="locationYchange"
            :min="location.ymin" :max="yMax"
            :disabled="!isAction" controls-position="right"
            class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <div v-if="isAction">
            <el-form-item label="固定位置：" size="mini" class="posotion-item">
            <el-radio v-model="dragForm.position" label="relative"
              @change="positionChange">不固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedTop" @change="positionChange"
              >相对顶部固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedBottom" @change="positionChange"
              >相对底部固定</el-radio>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'">
              <el-input-number
                v-model="locationY" @change="fixedTopChange"
                :min="location.ymin" :max="(page.screenHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'">
              <el-input-number
                v-model="locationBottom" @change="fixedBottomChange"
                :min="location.ymin" :max="(page.phoneHeight-dragForm.size.h)"
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
import { dragCom } from '@/util/dragMxi';

export default {
  name: 'DragSetting',
  mixins: [dragCom()],
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
      // mediaSource: {
      //   accept: '.mp3',
      // },
      lastCont: '',
      lineSource: '',
      lineTitle: '',
      title: '',
    };
  },
  computed: {
    isAction() {
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.play && this.dragForm.play.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.linePlay && this.dragForm.linePlay.url);
    },
    locationAble() {
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.play && this.dragForm.play.location)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.linePlay && this.dragForm.linePlay.location);
    },
    locationX: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        return curPlay.location ? curPlay.location.x : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    locationY: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
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
        return this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    audioSourceChange(type) {
      if (!this.isActive) {
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
      const curPlay = isAction ? this.dragForm.play : this.dragForm.linePlay;
      curPlay.location = location;
      let playObj = {};
      if (isAction) {
        playObj = { play: curPlay };
      } else {
        playObj = { linePlay: curPlay };
      }
      const { dragAudios, audioActive } = this.editor;
      let drags = dragAudios[audioActive];
      drags = Object.assign({}, drags, playObj);
      dragAudios[audioActive] = drags;
      const lists = Object.assign([], dragAudios);
      this.$store.commit('editor_update', { dragAudios: lists });
      // this.$emit('input-locationChange', 'dragAudios', this.dragForm.location, 'audioActive');
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
        loop: this.dragForm.loop,
        w: this.page.phoneWidth,
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
          name,
          url: file.url,
          second: se,
          duration: formatSecond(se),
          isUplaod: true,
          loop: ele.dragForm.loop,
          w: ele.page.phoneWidth,
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
      const lists = ele.editor[dragList];
      let drags = lists[ele.editor[active]];
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
      lists[ele.editor[active]] = drags;
      ele.$store.commit('editor_update', { [dragList]: lists });
      setTimeout(() => {
        drags.isUpload = true;
        lists[ele.editor[active]] = drags;
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
      const curPlay = this.dragForm.sourceType === '1' ? 'play' : 'linePlay';
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      const audios = this.editor.dragAudios;
      let drags = audios[this.editor.audioActive];
      if (drags[curPlay].location.y > maxBottom) {
        drags[curPlay].location.y = maxBottom;
      }
      drags = Object.assign({}, drags, drags[curPlay]);
      audios[this.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: audios });
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
          w: this.page.phoneWidth,
          h: this.editor.audioHeight,
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
      const medias = this.editor.dragAudios;
      let drags = medias[this.editor.audioActive];
      drags = Object.assign({}, drags, newObj);
      medias[this.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: medias });
    },
    lineTitleBlur() {
      const isAction = this.dragForm.sourceType === '1';
      const obj = isAction ? 'play' : 'linePlay';
      const title = isAction ? this.title : this.lineTitle;
      const medias = this.editor.dragAudios;
      let drags = medias[this.editor.audioActive];
      const play = Object.assign({}, drags[obj], { title });
      drags = Object.assign({}, drags, { [obj]: play });
      medias[this.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: medias });
    },
    loopChange() {
      const audios = this.editor.dragAudios;
      let drags = audios[this.editor.audioActive];
      drags.loop = this.dragForm.loop;
      const play = Object.assign({}, drags.play, { loop: this.dragForm.loop });
      const linePlay = Object.assign({}, drags.linePlay, { loop: this.dragForm.loop });
      drags.play = play;
      drags.linePlay = linePlay;
      drags = Object.assign({}, drags);
      audios[this.editor.audioActive] = drags;
      this.$store.commit('editor_update', { dragAudios: audios });
    },
  },
  updated() {
  },
  mounted() {
    this.$nextTick(() => {
      this.title = this.dragForm.play.title || '';
      this.lineTitle = this.dragForm.linePlay.title || '';
      this.lineSource = this.dragForm.linePlay.url || '';
    });
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
.audio-setting .el-form-item__content {
  margin-left: 0 !important;
}
</style>
