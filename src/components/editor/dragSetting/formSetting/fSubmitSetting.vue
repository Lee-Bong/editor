<template>
  <div :class="['setting-content', $store.state.editor.isFSubmitSet?
    'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }">
    <form-setting :setForm="Object.assign(setForm, {place: '提交', dragName, dragActive})"
    :dragForm="dragForm">
      <template slot="setting">
        <color-setting :colorForm="{bgColor: dragForm.bgColor, textColor: dragForm.textColor,
        bgDefault: '#5AC7F9', textDefault: '#fff', dragName, dragActive,}"/>
        <location-setting  :locationForm="{location: dragForm.location, size: dragForm.size,
          dragName, dragActive, hDisabled: true,
          minW: 30}"/>
      </template>
    </form-setting>
  </div>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import colorSetting from '@/components/editor/dragSetting/formSetting/common/colorSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    formSetting,
    colorSetting,
    locationSetting,
  },
  data() {
    return {
      dragName: 'dragFormSubmits',
      dragActive: 'fSubmitActive',
    };
  },
  methods: {
  },
};
</script>
