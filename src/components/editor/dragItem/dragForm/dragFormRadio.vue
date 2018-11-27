<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, dragActive, type: dragForm.dragType, listIndex, minH: 40, minW: 50}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['ml','mr']"
      >
      <template slot="content">
        <div>
          <div :style="{width: dragForm.size.w+'px',height: dragForm.size.h+'px',}"
           class="radio-shadow"></div>
          <div style="z-index: 3">
            <form-radio :attr="{label:dragForm.label,classList:['drag-form-item'],
            list:dragForm.list,type:dragForm.type,bgColor:dragForm.bgColor,
            textColor:dragForm.textColor,isRequired:dragForm.isRequired}" />
          </div>
        </div>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formRadio from '@/components/element/wradio';

export default {
  name: 'dragFormRadios',
  components: {
    dragResizeForm,
    formRadio,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
    };
  },
  computed: {
    dragName() {
      return this.dragForm.dragType === 9 ? 'dragFormRadios' : 'dragFormCheckboxs';
    },
    dragActive() {
      return this.dragForm.dragType === 9 ? 'fRadioActive' : 'fCheckboxActive';
    },
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

<style >
.drag-form-item * {
  cursor: move;
}
.drag-form-item .el-input__inner {
  height: 40px;
  padding: 0 14px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  text-align: left;
}
.radio-shadow {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  cursor: move;
  z-index: 5;
}
</style>
