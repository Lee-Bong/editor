<template>
    <vue-drag-resize
      :isActive="isActive"
      :y="dragForm.location.y"
      :x="dragForm.location.x"
      :z="dragForm.zIndex"
      :isDraggable="JSON.stringify(dragForm.img) !== '{}' ? true : false"
      :isResizable="JSON.stringify(dragForm.img) !== '{}' ? true : false"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tl','tr','br','bl']"
      :parentLimitation="true"
      :aspectRatio="dragForm.isUpload ? true: false"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"

      @clicked="dragTextClick(listIndex)"
      @dragstop="dragstop"
      @resizestop="resizestop"
      @resizing="resize"
      @dragging="resize">
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
      <div class="drag-img" v-if="JSON.stringify(dragForm.img) === '{}'">
      </div>
      <img v-if="JSON.stringify(dragForm.img) !== '{}'"
        :src="dragForm.img.url"
        :width="dragForm.size.w"
        :height="dragForm.size.h"/>

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
    isShow: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
    dragForm: Object,
    listIndex: Number,
  },
  data() {
    return {
      dragName: 'dragImages',
      inputValue: '',
      input: '',
      drag: {
        width: 360,
        height: 300,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },

  updated() {
    console.log(this.$store.state.editor);
    // alert(this.dragForm.size.h);
  },

  methods: {
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 2);
    },
    dragstop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
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
    // 删除组件
    dragDel(index) {
      this.$emit('dragDel', 2, index, this.dragForm.dragIndex);
    },
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
    width:360px;
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
      background-color: #ddd;
      z-index: 1090;
}

.drag-del-bottom {
  top: 10px !important;
}

.drag-img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: #bbb;
}
</style>
