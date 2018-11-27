<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, type: 11, listIndex, minH: 94, minW: 140}"
      :classList="'drag-item drag-sms-item'"
      ref="dragItem"
      :sticks="['ml','mr']"
      :style="{height: dragForm.size.h + 'px'}"
      >
      <template slot="content">
        <form-sms :attr="{label:dragForm.label,verify:dragForm.verify }"/>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formSms from '@/components/element/wsmscode';

export default {
  name: 'dragFormSmscodes',
  components: {
    dragResizeForm,
    formSms,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragFormSmscodes',
    };
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    },
  },
  updated() {
  },
};
</script>

<style>
.drag-sms-item .el-input * {
  cursor: move;
}
</style>
