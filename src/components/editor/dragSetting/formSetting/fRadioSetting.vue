<template>
<div :class="['setting-content', $store.state.editor.isFRadioSet ?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }">
  <form-setting :setForm="Object.assign(setForm, {place: '单项选择', dragName, dragActive,})"
   :dragForm="dragForm">
    <template slot="setting">
      <el-form-item label="选择模式：" size="mini">
        <el-radio-group v-model="dragForm.type">
          <el-radio :label="1" @change="typeChange">单选</el-radio>
          <el-radio :label="2" @change="typeChange">多选</el-radio>
        </el-radio-group>
      </el-form-item>
      <options-setting :list="dragForm.list" :form="{dragName, dragActive, size: dragForm.size}" />
      <color-setting :colorForm="{bgColor: dragForm.bgColor, textColor: dragForm.textColor,
      bgDefault: '#5AC7F9', textDefault: '#fff', dragName, dragActive,}"/>
      <location-setting  :locationForm="{location: dragForm.location, size: dragForm.size,
        dragName: 'dragFormRadios', dragActive: 'fRadioActive', hDisabled: true,
        minW: 50}"/>
    </template>
  </form-setting>
  </div>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';
import optionsSetting from '@/components/editor/dragSetting/formSetting/common/optionsSetting';
import colorSetting from '@/components/editor/dragSetting/formSetting/common/colorSetting';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'dragFormRadios',
  mixins: [settingCom()],
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
      dragName: 'dragFormRadios',
      dragActive: 'fRadioActive',
    };
  },
  methods: {
    typeChange(val) {
      this.updateDrags(this.dragName, val, this.dragActive, 'type');
    },
  },
  updated() {
    // console.log('radioupdated', this.dragForm.size);
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
