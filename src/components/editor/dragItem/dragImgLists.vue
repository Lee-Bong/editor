<template>
<div :style="{marginTop: dragForm.location.y + 'px', zIndex: dragForm.zIndex}">
    <div
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="[]"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="dragForm.zIndex"
      :index="dragForm.dragIndex"
      :parentLimitation="true"
      :listIndex="listIndex"
      :isDraggable="false"
      :isResizable="false"
      :preventActiveBehavior="true"
      @click="dragTextClick(listIndex)"
      class="drag-img-list"
      :class="[dragForm.isActive ? 'active': '',
       JSON.stringify(dragForm.imgList) === '[]' ? 'init': '']"
      >
      <div class="drag-img" v-if="JSON.stringify(dragForm.imgList) === '[]'">
      </div>
      <div>
        <img v-for="(item, index) in dragForm.imgList"
        :key="item.url+index"
        v-if="!!item.size && item.size.w"
        :src="item.url"
        :width="item.size.w"
       />
      </div>
    </div>
    <i class="el-icon-circle-close-outline drag-del"
    v-if="dragForm.isActive"
    @click="dragDel(listIndex)"
    :style="{top: dragForm.location.y-10+ 'px'}">
    </i>
</div>
</template>
<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'dragImgLists',
  components: {
    'vue-drag-resize': VueDragResize,
  },
  props: {
    dragForm: Object,
    listIndex: Number,
  },
  data() {
    return {
      dragName: 'dragImgLists',
      beforeZ: 0,
      inputValue: '',
      input: '',
      drag: {
        width: 375,
        height: 300,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },

  methods: {
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 4);
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
      this.$emit('dragDel', 4, index, this.dragForm.dragIndex);
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
.drag-img-list {
  position: relative;
  width: 100%;
}
.drag-img-list.active::before {
      content: "";
right: 0;
bottom: 0;
    top: 0;
    left: 0;
        position: absolute;
  border: 1px dashed #59c7f9;
}
.drag-img-list.init {
  height: 300px;
}
</style>
