<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, dragActive, type: 7, listIndex, minH: 40, minW: 30}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['ml','mr']"
      >
      <template slot="content">
        <div>
          <form-text place="单行文本" :classList="['drag-form-item']" />
        </div>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formText from '@/components/element/wtext';

export default {
  name: 'dragFormTexts',
  components: {
    dragResizeForm,
    formText,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
      dragActive: 'fTextActive',
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
</style>
