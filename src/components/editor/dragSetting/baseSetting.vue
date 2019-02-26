<template>
  <div :class="['setting-content', $store.state.editor[setForm.isShow] ?
      'setting-show' : '']" :style="{width: setForm.width+'px',
    }">
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
  name: 'baseSetting',
  props: {
    setForm: Object,
  },
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { [this.setForm.isShow]: false });
    },
  },
};
</script>

<style>
</style>
