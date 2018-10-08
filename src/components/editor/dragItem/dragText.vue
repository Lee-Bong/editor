<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tm','bm','ml','mr']"
      :y="dragForm.location.y"
      :x="dragForm.location.x"
      :z="dragForm.zIndex"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :preventActiveBehavior="true"
      :parentH="parentH"
      contenteditable="true"

      @activated="activateEv"
      @clicked="dragTextClick(listIndex)"
      @dragstop="dragstop"
      @resizestop="resizestop"
      @resizing="resize"
      @dragging="resize"
      class="drag-item"
      ref="dragItem"
      >

      <i class="el-icon-circle-close-outline drag-del"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
      <textarea class="drag-text"
        @keyup="inputChange"
        @focus="inputFocus"
        v-model="dragForm.content"
        ref="inputCont"
        :style="{width: dragForm.size.w+'px', height: dragForm.size.h+'px',
          fontSize: dragForm.fontSize, lineHeight:dragForm.lineHeight,
          textAlign: dragForm.textAlign,
          color: dragForm.textColor}"
          placeholder="请输入内容" />
      <div class="input-record"
      ref="inputRecord"
      :style="{width: dragForm.size.w+'px', height: dragForm.size.h+'px'}"
      >{{dragForm.content}}</div>
    </vue-drag-resize>
</template>
<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'dragItem',
  components: {
    'vue-drag-resize': VueDragResize,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragTexts',
      beforeZ: 0,
      inputValue: '',
      input: '',
      minw: 0,
      minh: 0,
      drag: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },
  computed: {
    parentH() {
      if (this.dragForm.position === 'relative') {
        return this.$store.state.page.phoneHeight;
      }
      return this.$store.state.page.screenHeight;
    },
  },
  methods: {
    activateEv() {
      // this.$refs.inputCont.focus();
    },
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 1);
      this.$refs.inputCont.focus();
    },
    onResezing(newRect) {
      this.drag.width = newRect.width;
      this.drag.height = newRect.height;
      this.drag.top = newRect.top;
      this.drag.left = newRect.left;
    },
    resize(newRect) {
      this.drag.width = newRect.width;
      this.drag.height = newRect.height;
      this.drag.top = newRect.top;
      this.drag.left = newRect.left;
    },
    inputChange() {
      // const textHeight = this.$refs.inputRecord.$el.offsetHeight;
      // if (textHeight > this.$refs.inputCont.offsetHeight && textHeight > this.dragForm.size.h) {
      //   const { dragTexts } = this.$store.state.editor;
      //   dragTexts[listIndex].size.h = textHeight;
      //   this.$store.commit('editor_update', {
      //     dragTexts,
      //   });
      // }
    },
    inputFocus() {
    },
    // 删除组件
    dragDel(index) {
      this.$emit('dragDel', 1, index, this.dragForm.dragIndex);
      // this.$store.commit('del_drag', {index, arr: this.dragName, active: 'isTextSet'});
    },
    dragstop(ev) {
      const evs = ev;
      if (this.dragForm.position !== 'relative') {
        const maxTop = this.$store.state.page.screenHeight - this.dragForm.size.h;
        if (evs.top > maxTop) {
          evs.top = maxTop;
        }
      }
      this.$emit('dragStop', this.dragName, evs, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },

  },
  created() {
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
