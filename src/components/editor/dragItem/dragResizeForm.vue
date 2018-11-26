<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="sticks"
      :axis="axis"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="dragForm.zIndex"
      :index="dragForm.dragIndex"
      :listIndex="infoForm.listIndex"
      :parentLimitation="true"
      :preventActiveBehavior="true"
      :parentH="parentH"
      contenteditable="true"
      :minh="infoForm.minH || 15"
      :minw="infoForm.minW || 15"
      :isResizable="isResizable"
      :isDraggable="isResizable"
      :aspectRatio="aspectRatio"
      :class="classList"

      @activated="activateEv"
      @clicked="dragTextClick(infoForm.listIndex, infoForm.type)"
      @dragstop="dragEvent"
      @resizestop="resizeEvent"
      @resizing="resize"
      @dragging="resize"
      ref="dragItem"
      >
      <i class="el-icon-circle-close-outline drag-del"
      v-if="dragForm.isActive"
      @click="dragDel(infoForm.type, infoForm.listIndex, dragForm.dragIndex)">
      </i>
      <slot name="content" />
    </vue-drag-resize>
</template>
<script>
import VueDragResize from 'vue-drag-resize';
import { dragCom } from '@/util/dragMxi';

export default {
  name: 'dragItem',
  mixins: [dragCom()],
  components: {
    'vue-drag-resize': VueDragResize,
  },
  props: {
    dragForm: Object,
    infoForm: Object,
    sticks: {
      type: Array,
      default: () => ['tm', 'bm', 'ml', 'mr'],
    },
    axis: {
      type: String,
      default: () => 'both',
    },
    activated: Function,
    dragStop: {
      type: Function,
      default(ev) {
        this.dragResize(ev);
      },
    },
    resizeStop: {
      type: Function,
      default(ev) {
        this.dragResize(ev);
      },
    },
    classList: { // 接收string、object
      validator(value) {
        return typeof (value) === 'string' || value instanceof Object;
      },
    },
  },
  beforeUpdate() {
  },
  computed: {
    parentH() {
      if (this.dragForm.position === 'relative') {
        return this.$store.state.page.phoneHeight;
      }
      return this.$store.state.page.screenHeight;
    },
    isResizable() {
      let isResize = true;
      if (this.infoForm.type === 2) {
        isResize = JSON.stringify(this.dragForm.img) !== '{}' ? Boolean(true) : false;
      }
      return isResize;
    },
    aspectRatio() {
      let isRatio = false;
      if (this.infoForm.type === 2) {
        isRatio = this.dragForm.isUpload ? Boolean(true) : false;
      }
      return isRatio;
    },
  },
  methods: {
    activateEv() {
      if (this.$refs.inputCont) this.$refs.inputCont.blur();
    },
    resize(ev) { // resizing 需要在拖拽时候监听
      if (this.infoForm.resizing) this.resizeEvent(ev);
    },
    dragTextClick(index, type) { // 点击组件
      this.dragClick(index, type);
    },
    resizeEvent(ev) {
      this.resizeStop.call(this, ev);
    },
    dragEvent(ev) {
      this.dragStop.call(this, ev);
    },
    dragResize(ev) {
      const form = this.infoForm.dragName;
      const index = this.infoForm.listIndex;
      const dragItems = this.$store.state.editor[form];
      let dragItem = dragItems[index];
      dragItem = Object.assign({}, dragItem, {
        size: { w: ev.width, h: ev.height },
        location: { x: ev.left, y: ev.top },
      });
      dragItems[index] = dragItem;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
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
