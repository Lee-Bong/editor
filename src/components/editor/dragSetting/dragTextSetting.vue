<template>
  <div
    :class="['setting-content', $store.state.editor.isTextSet ? 'setting-show' : '']"
    :style="{width: setForm.width+'px'}"
    @click="settingClick">
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
        <el-form-item label="" label-width="0">
          文本内容：
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          label-width='0'
          value="dragForm.content"
          @focus='textInputFocus'
          @click='textInputClick'
          v-model="dragForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="字体大小：" size="mini">
        <el-select v-model="dragForm.fontSize"
          filterable remote :remote-method="remoteMethod" placeholder="请选择">
          <el-option
            v-for="item in sizeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="对齐方式：" size="mini">
          <el-radio v-model="dragForm.textAlign" label="left">左对齐</el-radio>
          <el-radio v-model="dragForm.textAlign" label="center">居中</el-radio>
          <el-radio v-model="dragForm.textAlign" label="right">右对齐</el-radio>
        </el-form-item>
        <el-form-item label="文本颜色：" size="mini">
          <el-color-picker v-model="dragForm.textColor" :show-alpha="true"></el-color-picker>
          <el-button type="text" class="bg-reset" @click="textColorReset">重置</el-button>
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
   <!-- </vue-drag-resize>  -->
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
        xmax: 10000,
        ymin: 0,
        ymax: 1000,
      },
      size: {
        w: 80,
        h: 80,
        wmin: 0,
        wmax: this.$store.state.editor.phoneWidth,
        hmin: 0,
        hmax: this.$store.state.editor.phoneHeight,
      },
      form: '',
      textAlign: 1,
      textColor: 'rgba(19, 206, 102, 0.8)',
      xDisabled: false,
      yDisabled: false,
    };
  },
  methods: {
    textInputFocus() {
    },
    textInputClick() {
    },
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isTextSet: false });
    },
    locationChange(type) { // 位置值发生改变
      this.$emit('input-locationChange', 'dragTexts', this.dragForm.location, 'textActive');
    },
    sizeChange() { // 大小值发生改变
      this.$emit('input-sizeChange', 'dragTexts', this.dragForm.size, 'textActive');
    },
    settingClick() {
      this.$store.commit('editor_update', {
        textSet: true,
        isClick: true,
      });
      // this.$store.commit('inactive_drags', {index: this.$store.state.editor.textActive, arr: 'dragTexts'});
    },
    remoteMethod(val) { // 字体输入监听

    },
    textColorReset() { // 字体颜色重置
      const { dragTexts, textActive } = this.$store.state.editor;
      dragTexts[textActive].textColor = '#000';
      this.$store.commit('editor_update', {
        dragTexts,
      });
    },


  },
  mounted() {
    console.log('mounted');
    let i = 12;
    const list = [];
    while (i < 75) {
      list.push(`${i}px`);
      i += 2;
    }
    this.sizeList = list;
  },
  destroyed() {
    console.log('destroyed');
  },
  updated() {
    console.log(this.$store.state.editor.textActive);
  },
};
</script>

<style>

.el-input-number.is-controls-right .el-input__inner {
      padding-left: 5px!important;
    padding-right: 34px!important;
}
</style>
