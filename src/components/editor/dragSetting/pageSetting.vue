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
      <div class="setting">
        <el-form ref="form" label-width="90px">
          <el-form-item label="页面名称：" size="mini" class="is-require" >
            <el-input type="text" v-model="dragForm.title" placeholder="H5标题，最多输入10个字"></el-input>
          </el-form-item>
          <el-form-item label="分享标题：" size="mini">
            <el-input type="text" v-model="dragForm.shareTitle" maxlength=15
             placeholder="微信分享标题，最多输入15个字"></el-input>
          </el-form-item>
          <el-form-item label="分享描述：" size="mini">
            <el-input :rows="2" maxlength=40 v-model="dragForm.shareDec" type="textarea"
             placeholder="微信分享描述，最多输入40个字"></el-input>
          </el-form-item>
          <el-form-item label="分享缩略图：" size="mini" class="share-img">
            <img-uplaod :imgObj="dragForm.img" @upload-done="uploadDone"
             @file-remove="fileRemove" />
          </el-form-item>
          <el-form-item label="背景颜色：" size="mini">
            <el-color-picker v-model="dragForm.backgroundColor"
             :show-alpha="true" class="color-item"></el-color-picker>
            <el-button type="text" class="bg-reset" @click="pageBgReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import imgUplaod from '@/components/editor/dragSetting/upload/imgUpload';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgUplaod,
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
    pageBgReset() {
      this.$store.commit('page_update', { backgroundColor: '#fff' });
    },
    uploadDone(img) {
      this.$store.commit('page_update', {
        img: {
          url: img.url,
        },
      });
    },
    fileRemove() {
      this.$store.commit('page_update', {
        img: {},
      });
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
</style>
