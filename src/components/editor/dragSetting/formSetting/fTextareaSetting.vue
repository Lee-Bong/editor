<template>
  <div :class="['setting-content', $store.state.editor.isFTextareaSet ?
   'setting-show' : '', 'page-setting']" :style="{width: setForm.width+'px', }">
    <form-setting :setForm="Object.assign(setForm, {place: '多行文本', dragName,
    dragActive,noReauired:0,})"
    :dragForm="dragForm">
      <template slot="setting">
        <location-setting  :locationForm="{location: dragForm.location, size: dragForm.size,
        dragName, dragActive, hDisabled: false,
        minW: 30, minH: 40}"></location-setting>
      </template>
    </form-setting>
  </div>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';

export default {
  name: 'fTextareaSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    formSetting,
    locationSetting,
  },
  data() {
    return {
      dragName: 'dragFormTextareas',
      dragActive: 'fTextareaActive',
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>
