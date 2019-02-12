<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, type: 13, listIndex, minH: 95, minW: 155}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="[]"
      >
      <template slot="content">
        <formUpload :attr="{disabled: true, label:dragForm.label, bgColor:dragForm.bgColor,
          textColor:dragForm.textColor,classList:['drag-upload'], isRequired:dragForm.isRequired}"/>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formUpload from '@/components/element/wupload';

export default {
  name: 'dragFormUploads',
  components: {
    dragResizeForm,
    formUpload,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragFormUploads',
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
.drag-submit.w-form-submit {
  cursor: move !important;
  outline: none;
}

</style>
