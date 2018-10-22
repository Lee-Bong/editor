<template>
    <!-- <vue-drag-resize -->
      <!-- :isActive="dragForm.isActive" -->
      <!-- :y="dragForm.location.y" -->
      <!-- :x="dragForm.location.x" -->
      <!-- :z="dragForm.zIndex" -->
      <!-- :isDraggable="JSON.stringify(dragForm.img) !== '{}' ? true : false" -->
      <!-- :isResizable="JSON.stringify(dragForm.img) !== '{}' ? true : false" -->
      <!-- :w="dragForm.size.w" -->
      <!-- :h="dragForm.size.h" -->
      <!-- :sticks="['tl','tr','br','bl']" -->
      <!-- :parentLimitation="true" -->
      <!-- :index="dragForm.dragIndex" -->
      <!-- :listIndex="listIndex" -->
      <!-- :preventActiveBehavior="true" -->
      <!-- :parentH="parentH" -->
      <!-- :minh="15" -->
      <!-- :minw="15" -->
      <!-- :class="{ 'drag-item': JSON.stringify(dragForm.img) !== '{}' }" -->
      <!-- :aspectRatio="dragForm.isUpload ? true: false" -->
      <!-- @clicked="dragTextClick(listIndex)" -->
      <!-- @dragstop="dragstop" -->
      <!-- @resizestop="resizestop" -->
      <!-- @resizing="resize" -->
      <!-- @dragging="resize"> -->
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
      <div class="drag-img" v-if="JSON.stringify(dragForm.img) === '{}'">
        <i class="iconfont ed-icon-image"></i>
      </div>
      <div v-if="JSON.stringify(dragForm.img) !== '{}'" class="img-preview"
      :style="{background: 'url('+ dragForm.img.url +') center center / contain no-repeat'}"></div>
      <!-- <img v-if="JSON.stringify(dragForm.img) !== '{}', width: "
        :src="dragForm.img.url"
        :width="dragForm.size.w"
        :height="dragForm.size.h"/> -->

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
    onResezing() {
    },
    resize() {
    },
    // 删除组件
    dragDel(index) {
      this.$emit('dragDel', 2, index, this.dragForm.dragIndex);
    },
    forceUpdate() {
      this.$forceUpdate();
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
.img-preview {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
