<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, dragActive, type: 9, listIndex, minH: 40, minW: 50}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['ml','mr']"
      >
      <template slot="content">
        <div>
          <form-radio label="多项选择（可多选）" :classList="['drag-form-item']" :list="lists" :type="'1'" />
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
      dragName: 'dragFormRadios',
      dragActive: 'fRadioActive',
      lists: [{ text: '选项1选项1选项1选项1选项1选选项1选项1选项1选项1选项1选项1项1', label: 1 }],
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
