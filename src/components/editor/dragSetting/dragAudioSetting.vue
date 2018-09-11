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
        <el-form-item v-if="dragForm.sourceType === '1'" label="上传音频：" size="mini">
          <audio-uplaod :srouce="audioSource" @upload-done="uploadDone"
          @file-remove="fileRemove" />
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '2'" label="音频链接：" size="mini">
          <el-input type="text" v-model="dragForm.srouce"></el-input>
        </el-form-item>
        <el-form-item label="标题：" size="mini" class="audio-el">
          <el-input type="text" v-model="dragForm.audioTitle"></el-input>
        </el-form-item>
        <el-form-item label="循环：" size="mini">
          <el-checkbox v-model="dragForm.loop">开启循环播放</el-checkbox>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)"
            :disabled="!isUpload" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)"
            :disabled="!isUpload" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange"
            :min="size.wmin" :max="$store.state.editor.phoneWidth-dragForm.location.x"
            :disabled="!isUpload" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange"
            :min="size.hmin" :max="$store.state.editor.phoneHeight-dragForm.location.y"
            :disabled="!isUpload" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
        </el-form>
      </div>
    </div>
   <audio v-show="false" ref="audioLoad" />
   </div>
</template>

<script>
import audioUplaod from '@/components/editor/dragItem/image/audioUpload';
import { formatSecond } from '@/util/tools';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    audioUplaod,
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
      audioSource: {},
    };
  },
  methods: {
    audioSourceChange(type) {
      this.$emit('audioSourceChange', type, 'dragAudios', 'audioActive');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isAudioSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragAudios', this.dragForm.location, 'audioActive');
    },
    sizeChange() { // 大小值发生改变
      this.$emit('input-sizeChange', 'dragAudios', this.dragForm.size, 'audioActive');
    },
    uploadDone(file) {
      this.audioSource = { name: file.name };
      this.onFileSuccess(file, 'dragAudios', 'videoActive');
    },
    fileRemove() {
      this.audioSource = { };
      this.audioChange({
        isUplaod: false,
        title: '',
        url: '',
        second: 0,
        duration: '00:00',
        loop: false,
      }, this, 'dragAudios', 'videoActive', true);
    },
    onFileSuccess(file, dragList, active) {
      this.$refs.audioLoad.setAttribute('src', file.url);
      const ele = this;
      this.$refs.audioLoad.addEventListener('loadedmetadata', function cb() {
        const se = this.duration;
        const play = {
          title: file.beforeName ? file.beforeName : file.name,
          url: file.url,
          second: se,
          duration: formatSecond(se),
          isUplaod: true,
          loop: false,
        };
        ele.audioChange(play, ele, dragList, active);
      });
    },
    audioChange(play, ele, dragList, active, isRemove) {
      const lists = ele.$store.state.editor[dragList];
      let drags = lists[ele.$store.state.editor[active]];
      drags = Object.assign(drags, { play });
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
    onFileError() { // 图片上传失败
      this.fileFail = true;
      this.fileAble = false;
      this.$message({
        message: '视频上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
  },
};
</script>

<style>
.audio-el.el-form-item--mini .el-form-item__content {
    display: inline-block;
    width: 255px;
}
</style>
