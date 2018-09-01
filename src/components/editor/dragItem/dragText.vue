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
          fontSize: dragForm.fontSize, textAlign: dragForm.textAlign,
          color: dragForm.textColor}"
        autofocus placeholder="请输入内容" />
      <div class="input-record"
      ref="inputRecord"
      :style="{width: dragForm.size.w+'px', height: dragForm.size.h+'px'}"
      >{{dragForm.content}}</div>
    </vue-drag-resize>
</template>
<script>
import $ from 'jquery';
import VueDragResize from 'vue-drag-resize';
import _ from '@/util/tools';

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
    },
    onResezing(obj) {
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
    inputChange(text) {
      const textHeight = $('.input-record').outerHeight();
      if (textHeight > $('.drag-text').outerHeight() && textHeight < this.drag.height) {
        $('.drag-text').height($('.input-record').height());
        this.drag.height = $('.input-record').height();
      }
      this.$emit('inputChange', this.dragForm.content);
    },
    inputFocus() {
    },
    // 删除组件
    dragDel(index) {
      this.$emit('dragDel', 1, index, this.dragForm.dragIndex);
      // this.$store.commit('del_drag', {index, arr: this.dragName, active: 'isTextSet'});
    },
    dragDeactivated(index) { // 点击组件外区域
    // console.log('sss');
    //   this.$store.commit('inactive_drags', {index, arr: 'dragTexts', isAll: true});
    //   this.$store.commit('editor_update', {
    //     'isTextSet': false
    //   });
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
  height: 30px;
  width: 360px;
  line-height: 30px;
  min-height: 30px !important;
  border: 0;
  outline: 0;
  text-align: center;
  resize: none;
  box-sizing: border-box;
  font-size: 14px;
  font: 400 11px system-ui;
}
.input-record {
  position: absolute;
  left: 0;
  width: 360px;
  top: 0;
  line-height: 30px;
  min-height: 30px !important;
  font-size: 14px;
  font: 400 11px system-ui;
  padding: 2px;
  z-index: -1;
  visibility: hidden;
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
