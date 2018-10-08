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
      :preventActiveBehavior="true"
      :parentH="parentH"
      :class="{ 'drag-item': JSON.stringify(dragForm.img) !== '{}' }"
      :minh="minh"
      :minw="minw"

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
        <i class="iconfont ed-icon-image"></i>
      </div>
      <div v-if="JSON.stringify(dragForm.img) !== '{}'" class="img-before"></div>
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
      minh: 0,
      minw: 0,
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
.drag-del-bottom {
  top: 10px !important;
}

.drag-img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-img i {
  font-size: 50px;
  color: #797878;
}
.img-before {
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
