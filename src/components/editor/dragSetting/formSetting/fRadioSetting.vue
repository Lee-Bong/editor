<template>
<div :class="['setting-content', $store.state.editor[isShow] ?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }">
  <form-setting :setForm="Object.assign(setForm, {place: '单项选择', dragName, dragActive})"
   :dragForm="dragForm">
    <template slot="setting">
      <el-form-item label="选择模式：" size="mini">
        <el-radio-group v-model="dragForm.verify">
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
    };
  },
  computed: {
    isShow() {
      return this.dragForm.dragType === 9 ? 'isFRadioSet' : 'isFCheckboxSet';
    },
    dragName() {
      return this.dragForm.dragType === 9 ? 'dragFormRadios' : 'dragFormCheckboxs';
    },
    dragActive() {
      return this.dragForm.dragType === 9 ? 'fRadioActive' : 'fCheckboxActive';
    },
  },
  methods: {
    typeChange(val) {
      this.updateDrags(this.dragName, val, this.dragActive, 'type');
    },
  },
  updated() {
  },
};
</script>
