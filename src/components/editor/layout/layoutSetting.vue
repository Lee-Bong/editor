<template>
<div class="setting-wrap">
    <drag-text-setting
      v-if="$store.state.editor.textSet"
      :dragForm="this.$store.state.editor.dragTexts[this.$store.state.editor.textActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-img-setting
      v-if="$store.state.editor.imgSet"
      :dragForm="this.$store.state.editor.dragImages[this.$store.state.editor.imgActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-video-setting
      v-if="$store.state.editor.videoSet"
      :dragForm="this.$store.state.editor.dragVideos[this.$store.state.editor.videoActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @videoSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-audio-setting
      v-if="$store.state.editor.audioSet"
      :dragForm="this.$store.state.editor.dragAudios[this.$store.state.editor.audioActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @audioSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-link-setting
      v-if="$store.state.editor.linkSet"
      :dragForm="this.$store.state.editor.dragLinks[this.$store.state.editor.linkActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
      @linkSourceChange="sourceChange"
    />
    <drag-img-list-setting
      v-if="$store.state.editor.imgListSet"
      :dragForm="this.$store.state.editor.dragImgLists[this.$store.state.editor.imgListActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
      @linkSourceChange="sourceChange"
    />
    <page-setting
      v-if="$store.state.page.pageSet"
      :dragForm="$store.state.page"
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

export default {
  name: 'layoutSetting',
  props: {
  },
  data() {
    return {
      settingForm: {
        width: 360,
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
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].location = val;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    inputSizeChange(form, val, active) {
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].size = val;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
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
};
</script>

<style lang="scss" scoped>
.setting-wrap {
  position: relative;
  width: 360px;
  // height: 800px;
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
  .el-radio__label {
    padding-left: 2px;
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
    padding-left: 2px;
    width: auto;
  }
  .dec-label label:last-child {
    margin-left: 80px;
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
