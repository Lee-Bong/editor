<template>
  <div
    :class="['setting-content', $store.state.editor.isLinkSet ? 'setting-show' : '']"
    :style="{width: 280+'px', height: sHeight+'px',
    left: setForm.location.x+'px', top: setForm.location.y+'px'}"
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
        <el-form-item label="App内跳转：" size="mini">
          <el-input :span="16" type="text" v-model="dragForm.appLink"></el-input>
        </el-form-item>
        <el-form-item label="App内跳转：" size="mini">
          <el-input type="text" v-model="dragForm.outLink"></el-input>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange" :min="location.xmin" :max="location.xmax" label="描述文字" controls-position="right"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange" :min="location.ymin" :max="location.xmax" label="描述文字" controls-position="right"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange" :min="size.wmin" :max="size.wmax" label="描述文字" controls-position="right"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange" :min="size.hmin" :max="size.hmax" label="描述文字" controls-position="right"></el-input-number>
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
        wmax: 1000000,
        hmin: 0,
        hmax: 1000000,
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
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isLinkSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragLinks', this.dragForm.location, 'linkActive');
    },
    sizeChange() { // 大小值发生改变
      this.$emit('input-sizeChange', 'dragLinks', this.dragForm.size, 'linkActive');
    },
  },
  updated() {
    console.log('update');
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
.el-input-number--mini {
  width: 100px!important;
}
.el-input-number.is-controls-right .el-input__inner {
  padding-left: 5px!important;
  padding-right: 34px!important;
}
.el-form-item__label {
  padding-right: 5px!important;
}
</style>
