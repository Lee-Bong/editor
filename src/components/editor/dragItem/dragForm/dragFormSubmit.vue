<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, type: 12, listIndex, minH: 15, minW: 15}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['ml','mr']"
      >
      <template slot="content">
        <div>
          <form-submit :attr="{label:dragForm.label,bgColor:dragForm.bgColor,
          textColor:dragForm.textColor}" />
        </div>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formSubmit from '@/components/element/wsubmit';

export default {
  name: 'dragFormSubmits',
  components: {
    dragResizeForm,
    formSubmit,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragFormSubmits',
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
</style>
