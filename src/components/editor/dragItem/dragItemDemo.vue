<template>
    <vue-drag-resize
      :isActive="isActive"
      :w="tWidth" :h="tHeight"
      :sticks="['tm','bm','ml','mr']"
      :x="locationX"
      :y="locationY"
      :z="locationZ"
      :index="dragIndex"
      :parentLimitation="true"
      @activated="dragTextClick(dragIndex)"
      @clicked="dragTextClick(dragIndex)"
      @deactivated="dragDeactivated(dragIndex)"
      @resizing="resize"
      @dragging="resize"
      class="drag-item"
      >
      <i class="el-icon-circle-close-outline drag-del"
      v-if="isActive"
      @click="dragDel(dragIndex)">
      </i>
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
    dragIndex: Number,
    isShow: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
    locationX: {
      type: Number,
      default: 0,
    },
    locationY: {
      type: Number,
      default: 0,
    },
    locationZ: {
      type: Number,
      default: 0,
    },
    tWidth: Number,
    tHeight: Number,
  },
  data() {
    return {
      dragName: 'dragLinks',
      beforeZ: 0,
      inputValue: '',
      input: '',
      drag: {
        width: 375,
        height: 30,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },

  methods: {
    dragTextClick(index) {
      if (index !== 1000) this.beforeZ = index;
      this.$store.commit('inactive_drags', { index, arr: this.dragName });
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
    // 删除组件
    dragDel(index) {
      this.$store.commit('del_drag', { index, arr: this.dragName });
    },
    dragDeactivated(index) { // 点击组件外区域
      this.$store.commit('inactive_drags', { index, arr: this.dragName, isAll: this.beforeZ });
    },
  },
};
</script>

<style>

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
}

</style>
