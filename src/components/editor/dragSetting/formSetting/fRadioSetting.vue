<template>
  <form-setting :setForm="Object.assign(setForm, {place: '提交'})" :dragForm="dragForm">
    <template slot="setting">
      <el-form-item label="选择模式：" size="mini">
        <el-radio-group>
          <el-radio label="单选"></el-radio>
          <el-radio label="多选"></el-radio>
        </el-radio-group>
      </el-form-item>
      <options-setting></options-setting>
      <color-setting></color-setting>
      <location-setting></location-setting>
    </template>
  </form-setting>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';
import optionsSetting from '@/components/editor/dragSetting/formSetting/optionsSetting';
import colorSetting from '@/components/editor/dragSetting/formSetting/common/colorSetting';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    formSetting,
    locationSetting,
    optionsSetting,
    colorSetting,
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
.label-dec {
  font-size: 10px;
  color: #999;
  display: inline-block;
  margin-left: 5px;
}
</style>
