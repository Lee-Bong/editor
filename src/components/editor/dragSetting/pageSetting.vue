<template>
  <div
    :class="['setting-content', $store.state.page.pageSet ? 'setting-show' : '', 'page-setting']"
    :style="{width: setForm.width+'px'}"
  >
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
        <el-form-item label="页面名称：" size="mini">
          <el-input type="text" v-model="dragForm.title" placeholder="H5标题，最多输入10个字"></el-input>
        </el-form-item>
        <el-form-item label="分享标题：" size="mini">
          <el-input type="text" v-model="dragForm.shareTitle"
            placeholder="微信分享标题，最多输入15个字"></el-input>
        </el-form-item>
        <el-form-item label="分享描述：" size="mini">
          <el-input type="text" v-model="dragForm.shareDec"
            placeholder="微信分享描述，最多输入40个字"></el-input>
        </el-form-item>
        <el-form-item label="分享缩略图：" size="mini">
          <el-input type="text" v-model="dragForm.shareImg"></el-input>
        </el-form-item>
        <el-form-item label="背景颜色：" size="mini">
          <el-color-picker v-model="dragForm.backgroundColor" :show-alpha="true"></el-color-picker>
          <el-button type="text" class="bg-reset"
          @click="pageBgReset">重置</el-button>
        </el-form-item>
      </el-form>
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
      this.$store.commit('page_update', { pageSet: false });
    },
    pageBgReset() {
      this.$store.commit('page_update', { backgroundColor: '#fff' });
    },
  },
};
</script>

<style >
.bg-reset.el-button.el-button--text
{
    position: absolute;
    height: 28px;
    margin-top: 0;
    width: 40px;
    margin-left: 5px;
}
.bg-reset.el-button.el-button--text:hover,
.page-setting .el-button.el-button--text:hover{
  border: 0;
}

.page-setting .el-form-item--mini .el-form-item__content{
  display: inline-block;
  width: 260px;
}
.page-setting .el-form-item__label{
  padding-right: 5px;
}
.page-setting .el-input--mini .el-input__inner {
  padding: 0 8px;
}
</style>
