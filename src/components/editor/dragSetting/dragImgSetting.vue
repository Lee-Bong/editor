<template>
<div
    :class="['setting-content', $store.state.editor.isImgSet ? 'setting-show' : '']"
:style="{width: 280+'px', height: sHeight+'px',
          left: setForm.location.x+'px', top: setForm.location.y+'px'}">

   <div class="setting-box">
     <div class="setting-title">
        <span>组件设置</span>
          <span class="header-btn">
            <i class="el-icon-news" @click="settingFixed"></i>
            <i class="el-icon-close" @click="settingClose"></i>
        </span>
      </div>
       <div class="setting">
        <file-upload class="file-upload">+ 点击上传图片</file-upload>
       </div>
    </div>
   </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';
import imgUpload from 'vue-core-image-upload';

export default {
  name: 'DragImgSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    FileUpload: imgUpload,
  },
  data() {
    return {
      files: [],
      sHeight: 500,
    };
  },
  computed: {

  },
  methods: {
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgSet: false });
    },
    textInputFocus() {
    },
    textInputChange() {
    },
    handleChange() {

    },
  },
};
</script>

<style>
.setting-content {
  position: fixed;
  top: 66px;
  bottom: 400px;
  right: 266px;
  width: 260px;
  z-index: 1000;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  overflow: hidden;
}
.setting-title {
  height: 31px;
  padding-left: 15px;
  padding-right: 5px;
  line-height: 31px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  text-align: left;
}
.setting {
  padding: 5px;
  background-color: #fff;
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

.file-upload {
  width: 220px;
  height: 100px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 15px;
  border: dashed 1px #ddd;
  cursor: pointer;
}

.file-upload:hover {
  color: #409eff;
  border-color: #409eff;
}

.file-upload:active {
  color: #fff;
  background-color: #409eff;
}
</style>
