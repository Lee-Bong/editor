<template>
  <div :class="['setting-content', $store.state.editor.isFUploadSet ?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }" >
    <form-setting :setForm="Object.assign(setForm, {place: '',noReauired:0,
     dragName, dragActive,})"
     :dragForm="dragForm">
      <template slot="setting">
        <!-- <color-setting :colorForm="{bgColor: dragForm.bgColor, textColor: dragForm.textColor,
        bgDefault: '#5AC7F9', textDefault: '#fff', dragName, dragActive,}"/> -->
        <location-setting  :locationForm="{location: dragForm.location, size: dragForm.size,
        dragName, dragActive, hDisabled: true, notSize: true, xDisabled: false,
        minW: 155}"></location-setting>
      </template>
    </form-setting>
  </div>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import colorSetting from '@/components/editor/dragSetting/formSetting/common/colorSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';

export default {
  name: 'fUploadSetting',
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
      dragName: 'dragFormUploads',
      dragActive: 'fUploadActive',
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>
