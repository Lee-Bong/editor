<template>
<div :class="['setting-content', $store.state.editor.isFSmsSet?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }">
    <form-setting :setForm="Object.assign(setForm, {place:'手机短信',dragName,dragActive,noReauired:0})"
     :dragForm="dragForm">
      <template slot="setting">
        <el-form-item label="验证手机号：" size="mini">
          <el-radio-group v-model="dragForm.verify">
            <el-radio :label="1" @change="verifyChange">是</el-radio>
            <el-radio :label="2" @change="verifyChange">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <color-setting v-if="dragForm.verify === 1"
        :colorForm="{bgColor: dragForm.bgColor||'#5AC7F9',
        textColor: dragForm.textColor||'#fff', bgDefault: '#5AC7F9', textDefault: '#fff', dragName,
        dragActive,bgText: '按钮颜色', textText: '字体颜色'}"/>
        <location-setting  :locationForm="{location: dragForm.location, size: dragForm.size,
        dragName, dragActive, hDisabled: true, minW: 140}"/>
      </template>
    </form-setting>
  </div>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import colorSetting from '@/components/editor/dragSetting/formSetting/common/colorSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'fSmsSetting',
  mixins: [settingCom()],
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    formSetting,
    locationSetting,
    colorSetting,
  },
  data() {
    return {
      dragName: 'dragFormSmscodes',
      dragActive: 'fSmsActive',
    };
  },
  methods: {
    verifyChange(val) {
      let h = 94;
      if (val === 2) h = 40;
      this.updateSetting(this.dragName, this.dragActive, {
        verify: val,
        size: { w: this.dragForm.size.w, h },
      });
    },
  },
};
</script>
