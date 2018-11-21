<template>
  <form-setting :setForm="setForm" :dragForm="dragForm">
    <template slot="setting">
      <location-setting></location-setting>
    </template>
  </form-setting>
</template>

<script>
import formSetting from '@/components/editor/dragSetting/formSetting/formSetting';
import locationSetting from '@/components/editor/dragSetting/formSetting/common/locationSetting';

export default {
  name: 'DragSetting',
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
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
</style>
