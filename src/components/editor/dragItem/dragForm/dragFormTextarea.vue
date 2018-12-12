<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, type: 8, listIndex, minH: 40, minW: 30, resizing: true}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['tl','tr', 'br', 'bl', 'tm','br','mr', 'ml']"
      >
      <template slot="content">
        <form-textarea :attr="{label: dragForm.label, size: dragForm.size,
        classList: ['drag-textarea'],
        isRequired:dragForm.isRequired}"/>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formTextarea from '@/components/element/wtextarea';

export default {
  name: 'dragFormTextareas',
  components: {
    dragResizeForm,
    formTextarea,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragFormTextareas',
      styles: {
        height: `${this.dragForm.size.h}px`,
        width: `${this.dragForm.size.w}px`,
      },
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
.drag-textarea {
  cursor: move !important;
}
</style>
