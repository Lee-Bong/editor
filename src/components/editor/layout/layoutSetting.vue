<template>
<div class="setting-wrap">
    <drag-text-setting
      v-if="editor.dragTexts.length && editor.isTextSet"
      :dragForm="editor.dragTexts[editor.textActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-img-setting
      v-if="editor.isImgSet"
      :dragForm="editor.dragImages[editor.imgActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-video-setting
      v-if="editor.videoSet"
      :dragForm="editor.dragVideos[editor.videoActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @videoSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-audio-setting
      v-if="editor.audioSet"
      :dragForm="editor.dragAudios[editor.audioActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @audioSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-link-setting
      v-if="editor.linkSet"
      :dragForm="editor.dragLinks[editor.linkActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
      @linkSourceChange="sourceChange"
    />
    <drag-img-list-setting
      v-if="editor.isImgListSet"
      :dragForm="editor.dragImgLists[editor.imgListActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
      @linkSourceChange="sourceChange"
    />
    <page-setting
      v-if="page.pageSet"
      :dragForm="page"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
    />
</div>
</template>

<script>
import dragTextSetting from '@/components/editor/dragSetting/dragTextSetting';
import dragImgSetting from '@/components/editor/dragSetting/dragImgSetting';
import dragLinkSetting from '@/components/editor/dragSetting/dragLinkSetting';
import dragImgListSetting from '@/components/editor/dragSetting/dragImgListSetting';
import dragVideoSetting from '@/components/editor/dragSetting/dragVideoSetting';
import dragAudioSetting from '@/components/editor/dragSetting/dragAudioSetting';
import pageSetting from '@/components/editor/dragSetting/pageSetting';
import { dragCom } from '@/util/dragMxi';

export default {
  name: 'layoutSetting',
  mixins: [dragCom()],
  props: {
  },
  components: {
    dragTextSetting,
    dragImgSetting,
    dragLinkSetting,
    dragVideoSetting,
    dragAudioSetting,
    pageSetting,
    dragImgListSetting,
  },
  data() {
    return {
      settingForm: {
        width: 380,
        location: {
          x: 700,
          y: 65,
        },
      },
    };
  },
  methods: {
    sourceChange(type, form, active) {
      this.$store.state.editor[form][this.$store.state.editor[active]].sourceType = type;
    },
    settingFixed() { // 锁定设置
      this.settingForm.location.x = 600;
      this.settingForm.location.y = 66;
    },
    inputLocationChange(form, val, active) { // 设置-文本组件位置变化
      let dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].location = val;
      dragItems = Object.assign([], dragItems);
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    inputSizeChange(form, val, active) {
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].size = val;
      if (form === 'dragVideos') {
        dragItems[this.$store.state.editor[active]].isUpload = false;
      }
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-wrap {
  position: relative;
  width: 380px;
  margin-top: 20px;
  margin-left: 25px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 80;
}
.setting-content {
  width: 260px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  visibility: hidden;
}
.setting-show{
  visibility: visible;
  position: absolute;
  top: 0;
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
  background-color: #fff;
  text-align: left;
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
  .el-input-number--mini,
  .num-input.el-input-number--mini {
    width: 180px!important;
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
  .el-button.el-button--text.bg-reset {
    height: 28px;
    margin-top: 0;
    vertical-align: top;
  }
  .el-button.el-button--text.bg-reset:hover{
    border: 0;
    color: #1593ff;
  }
  .el-button.el-button--text.bg-reset:active{
    background: none;
    color: #3a8ee6;
  }
  .el-input-number--mini {
    width: 100px;
  }
}
.setting-content .el-input--mini .el-input__inner {
  padding: 0 8px;
}
</style>
