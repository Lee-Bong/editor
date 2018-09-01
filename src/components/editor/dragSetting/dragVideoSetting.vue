<template>
  <div
    :class="['setting-content', $store.state.editor.isVideoSet ? 'setting-show' : '', 'video-setting']"
    :style="{width: setForm.width+'px'}"
  >
  <!-- <vue-drag-resize
    class="setting-content"
    :isActive="true"
    :w="280"
    :h="sHeight"
    :x="600"
    :y="66"
    :isResizable="false"> -->
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
          <el-radio v-model="dragForm.sourceType" @change="sourceChange('1')" label="1">本地上传</el-radio>
          <el-radio v-model="dragForm.sourceType" @change="sourceChange('2')" label="2">在线视频</el-radio>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '1'"  label="选择视频：" size="mini" class="video-el">
          <el-input :span="16" type="text" v-model="dragForm.textColor"></el-input>
        </el-form-item>
        <el-form-item v-if="dragForm.sourceType === '2'" label="视频链接：" size="mini" class="video-el">
          <el-input type="text" v-model="dragForm.textColor"></el-input>
        </el-form-item>
        <el-form-item label="视频封面：" size="mini" class="video-el">
          <el-input type="text" v-model="dragForm.textColor"></el-input>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange" :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)" label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange" :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)" label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange" :min="size.wmin" :max="$store.state.editor.phoneWidth-dragForm.location.x" label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange" :min="size.hmin" :max="$store.state.editor.phoneHeight-dragForm.location.y" label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
        </el-form>
      </div>
    </div>
   <!-- </vue-drag-resize> -->
   </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  data() {
    return {
      sHeight: 800,

      sizeList: ['12px', '14px'],

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
  },
};
</script>

<style>
.video-el.el-form-item--mini .el-form-item__content {
    display: inline-block;
    width: 255px;
}
</style>
