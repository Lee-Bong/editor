<template>
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
</template>

<script>

export default {
  name: 'baseSetting',
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

<style>
</style>
