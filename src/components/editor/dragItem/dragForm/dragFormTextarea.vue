<template>
    <drag-resize-form
      :dragForm="dragForm"
      :infoForm="{dragName, type: 8, listIndex, minH: 40, minW: 30, resizing: true}"
      :classList="'drag-item'"
      ref="dragItem"
      :sticks="['tl','tr', 'br', 'bl', 'tm','br','mr', 'ml']"
      >
      <template slot="content">
        <div>
          <form-textarea place="多行文本" :classList="['drag-form-item']"
          :size="this.dragForm.size"
          :styles="styles" />
        </div>
      </template>
    </drag-resize-form>
</template>
<script>
import dragResizeForm from '@/components/editor/dragItem/dragResizeForm';
import formTextarea from '@/components/element/wtextarea';

export default {
  name: 'dragtext',
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
    // console.log('this.dragForm.size', this.dragForm.size);
  },
};
</script>

<style>
.drag-item textarea {
  background-color: rgba(0, 0, 0, 0);
}
.drag-text {
  cursor: move;
  position: absolute;
  top: 0;
  height: 30px;
  width: 360px;
  line-height: 30px;
  border: 0;
  outline: 0;
  text-align: center;
  resize: none;
  box-sizing: border-box;
  background: red;
  padding: 5px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.input-record {
  font-size: 14px;
  font: 400 11px system-ui;
  padding: 2px;
  z-index: -1;
  visibility: hidden;
}
.input-record textarea {
  padding: 5px;
  height: 33px;
  background: none;
  padding: 5px;
  border: 0;
  outline: none;
  line-height: 1.5;
  min-height: 30px !important;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.vdr-stick {
  background-color: #fff;
  border: 1px solid #59c7f9;
}

.vdr.active:before {
  outline: 1px dashed #59c7f9;
}

.drag-del {
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 18px;
  color: #888;
  border-radius: 20px;
  right: -10px;
  top: -10px;
  cursor: pointer;
  z-index: 1001;
  background-color: #ddd;
  text-align: center;
}
.drag-del.el-icon-close:before {
  font-size: 18px;
}
</style>
