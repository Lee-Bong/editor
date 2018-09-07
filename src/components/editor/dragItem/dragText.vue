<template>
  <vue-drag-resize :isActive="dragForm.isActive" :w="dragForm.size.w" :h="dragForm.size.h" :sticks="['tm','bm','ml','mr']" :y="dragForm.location.y" :x="dragForm.location.x" :z="dragForm.zIndex" :index="dragForm.dragIndex" :listIndex="listIndex" :parentLimitation="true" @clicked="dragTextClick(listIndex)" @dragstop="dragstop" @resizestop="resizestop" @resizing="resize" @dragging="resize" class="drag-item" ref="dragItem">
    <i class="el-icon-circle-close-outline drag-del"
     v-if="dragForm.isActive" @click="dragDel(listIndex)">
    </i>
    <textarea class="drag-text" @keyup="inputChange(dragForm.dragIndex)" @focus="inputFocus"
      v-model="dragForm.content" ref="inputCont" :style="{width: dragForm.size.w+'px',
      height: dragForm.size.h+'px',
      fontSize: dragForm.fontSize, textAlign: dragForm.textAlign,
      color: dragForm.textColor}" placeholder="双击编辑文本" />
    <!-- todo 产品修改交互，不自动扩展高度 <el-input class="input-record" ref="inputRecord" type="textarea"
      :autosize="{ minRows: 1, maxRow: 3}" v-model="dragForm.content" :style="{width: dragForm.size.w+'px',
      fontSize: dragForm.fontSize, textAlign: dragForm.textAlign,}">
    </el-input> -->
  </vue-drag-resize>
</template>
<script>
import $ from 'jquery';
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
      drag: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },

  methods: {
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
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },

  },

  mounted() {
  },

  updated() {
    // 修复点击删除的时候，
    // if (this.listIndex !== this.$store.state.editor.textActive) {
    //   const lists = this.$store.state.editor.dragTexts;
    //   lists[this.listIndex].isActive = false;
    //   this.$store.commit('editor_update', {
    //     dragTexts: lists,
    //   });
    // }
  },
};
</script>

<style>
.drag-text {
  position: relative;
  height: 30px;
  width: 360px;
  line-height: 1.5;
  min-height: 30px !important;
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
  /* position: absolute;
  left: 0;
  top: 0; */

  min-height: 30px !important;
  padding: 0;
  z-index: -1;
  /* visibility: hidden; */
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
  font-size: 20px;
  color: #888;
  border-radius: 20px;
  right: -10px;
  top: -10px;
  cursor: pointer;
  z-index: 1001;
}
</style>
