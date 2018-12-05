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
      v-if="editor.dragVideos.length && editor.isVideoSet"
      :dragForm="editor.dragVideos[editor.videoActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @videoSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-audio-setting
      v-if="editor.dragAudios.length && editor.isAudioSet"
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

    <f-text-setting
      v-if="editor.isFTextSet"
      :dragForm="editor.dragFormTexts[editor.fTextActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
    />

    <f-textarea-setting
      v-if="editor.isFTextareaSet"
      :dragForm="editor.dragFormTextareas[editor.fTextareaActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
    />
    <f-radio-setting
      v-if="editor.isFRadioSet"
      :dragForm="editor.dragFormRadios[editor.fRadioActive]"
      :setForm="settingForm"
    />
    <f-radio-setting
      v-if="editor.isFCheckboxSet"
      :dragForm="editor.dragFormCheckboxs[editor.fCheckboxActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
    />
    <f-sms-setting
      v-if="editor.isFSmsSet"
      :dragForm="editor.dragFormSmscodes[editor.fSmsActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
    />
    <f-submit-setting
      v-if="editor.isFSubmitSet"
      :dragForm="editor.dragFormSubmits[editor.fSubmitActive]"
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
import fTextSetting from '@/components/editor/dragSetting/formSetting/fTextSetting';
import fTextareaSetting from '@/components/editor/dragSetting/formSetting/fTextareaSetting';
import fRadioSetting from '@/components/editor/dragSetting/formSetting/fRadioSetting';
import fSmsSetting from '@/components/editor/dragSetting/formSetting/fSmsSetting';
import fSubmitSetting from '@/components/editor/dragSetting/formSetting/fSubmitSetting';
import { dragCom } from '@/util/dragMxi';

export default {
  name: 'layoutSetting',
  mixins: [dragCom()],
  components: {
    dragTextSetting,
    dragImgSetting,
    dragLinkSetting,
    dragVideoSetting,
    dragAudioSetting,
    pageSetting,
    dragImgListSetting,
    fTextSetting,
    fTextareaSetting,
    fSmsSetting,
    fRadioSetting,
    fSubmitSetting,
  },
  data() {
    return {
      settingForm: {
        width: 380,
        maxHeight: document.documentElement.clientHeight - 150,
        location: {
          x: 700,
          y: 65,
        },
      },
    };
  },
  methods: {
    sourceChange(type, form, active) {
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].sourceType = type;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    settingFixed() { // 锁定设置
      this.settingForm.location.x = 600;
      this.settingForm.location.y = 66;
    },
    inputLocationChange(form, val, active) { // 设置-文本组件位置变化
      let dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].location = val;
      dragItems[this.$store.state.editor[active]].size =
      dragItems[this.$store.state.editor[active]].size;
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
  updated() {
    // console.log('editor.isFTextSet', this.editor.dragFormTexts[this.editor.fTextActive]);
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
  z-index: 80;
}
.setting-content {
  width: 260px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  visibility: hidden;
  position: fixed;
  top: 75px;
}
.setting-show{
  visibility: visible;
  // max-height: maxHeight;
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
  overflow-y: auto;
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
