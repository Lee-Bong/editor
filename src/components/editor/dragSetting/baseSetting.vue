<template>
  <div :class="['setting-content', $store.state.page.pageSet ?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px'}">
    <div class="setting-box">
      <div class="setting-title">
        <span>组件设置</span>
        <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
        </span>
      </div>
      <div class="setting" :style="{ maxHeight: setForm.maxHeight + 'px'}">
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  data() {
    return {
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      fileModify: false,
    };
  },
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('page_update', { pageSet: false });
    },
  },
};
</script>

<style >
.bg-reset.el-button.el-button--text {
  position: absolute;
  height: 28px;
  margin-top: 0;
  width: 40px;
  margin-left: 5px;
}
.bg-reset.el-button.el-button--text:hover,
.page-setting .el-button.el-button--text:hover {
  border: 0;
}

.page-setting .el-form-item--mini .el-form-item__content {
  display: inline-block;
  width: 260px;
  margin-left: 0 !important;
}
.page-setting .el-form-item__label {
  padding-right: 5px;
}
.page-setting .el-input--mini .el-input__inner{
  padding: 0 8px;
}
.page-setting .share-img.el-form-item--mini .el-form-item__content {
  width: 200px;
}
.page-setting .el-textarea__inner {
  padding: 3px 8px;
}
.label-dec {
  font-size: 10px;
  color: #999;
  display: inline-block;
  margin-left: 5px;
}
</style>
