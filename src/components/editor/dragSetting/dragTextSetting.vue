<template>
  <div
    :class="['setting-content', $store.state.editor.isTextSet ? 'setting-show' : '']"
    :style="{width: 280+'px', height: sHeight+'px',
    left: setForm.location.x+'px', top: setForm.location.y+'px'}"
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
        <el-select v-model="dragForm.fontSize" placeholder="请选择">
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
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange(1, dragForm.location.x)" :min="location.xmin" :max="location.xmax" label="描述文字" controls-position="right"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange(2, dragForm.location.y)" :min="location.ymin" :max="location.xmax" label="描述文字" controls-position="right"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange(1, dragForm.size.w)" :min="size.wmin" :max="size.wmax" label="描述文字" controls-position="right"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange(2, dragForm.size.h)" :min="size.hmin" :max="size.hmax" label="描述文字" controls-position="right"></el-input-number>
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
        // xmax: 10000000,
        ymin: 0,
        // ymax: 100,
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
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isTextSet: false });
    },
    locationChange() { // 位置值发生改变
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
  },
  mounted() {
    console.log('mounted');
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
.setting-content {
  position: fixed;
  top: 66px;
  bottom: 10px;
  right: 266px;
  width: 260px;
  z-index: 1001;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  visibility: hidden;
}
.setting-show{
  visibility: visible;
}
.setting-title {
  height: 31px;
  padding-left: 15px;
  padding-right: 15px;
  line-height: 31px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #d9d9d9;
  text-align: left;
  color: #8d9ea7;
}
.header-btn {
  float: right;
}
.header-btn i {
  cursor: pointer;
  margin-left: 5px;
}
.header-btn i:hover {
  color: #323232;
}
.setting {
  padding: 5px;
  background-color: #f5f5f5;
  text-align: left;
}
.el-form-item__label {
  padding-right: 0;
}
.el-form-item {
  margin-bottom: 8px;
}
.el-radio + .el-radio,
.el-form-item--mini.el-form-item {
  margin-left: 5px;
}
.el-radio__label {
  padding-left: 2px;
}
.el-input-number--mini {
  width: 100px;
  margin-left: 5px;
}
.el-input-number--mini .el-input__inner {
  padding-left: 5px;
  padding-right: 26px;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  width: 20px;
}
.el-select.el-select--mini {
  width: 100px;
}

.dec-label {
  padding-left: 80px;
  height: 30px;
  line-height: 30px;
  color: #323232;
  font-size: 14px;
  margin-top: -18px;
}

.dec-label label {
  display: inline-block;
  width: 80px;
  text-align: center;
  margin-top: -20px;
}

.dec-label label:first-child {
  padding-right: 10px;
  padding-left: 10px;
  width: auto;
}
.dec-label label:last-child {
  margin-left: 50px;
}
</style>
