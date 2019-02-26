<template>
    <drag-resize
      :dragForm="dragForm"
      :infoForm="{dragName, type: 1, listIndex, minH: 15, minW: 15}"
      :classList="'drag-item'"
      ref="dragItem"
      :dragStop="dragStop"
      >
    </drag-resize>
</template>
<script>
import dragResize from '@/components/editor/dragItem/dragResize';

export default {
  name: 'dragtext',
  components: {
    dragResize,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragTexts',
    };
  },
  methods: {
    dragTextClick() {
      this.$emit('dragTextClick', this.listIndex, 1);
      if (this.$refs.inputCont) this.$refs.inputCont.focus();
    },
    dragStop(ev) {
      const evs = ev;
      if (this.dragForm.position !== 'relative') {
        const maxTop = this.$store.state.page.screenHeight - this.dragForm.size.h;
        if (evs.top > maxTop) {
          evs.top = maxTop;
        }
      }
      this.$emit('dragStop', this.dragName, evs, this.listIndex);
    },
    forceUpdate() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
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
  padding: 5px;
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
