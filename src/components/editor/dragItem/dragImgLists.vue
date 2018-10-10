<template>
  <div :style="{top: dragForm.location.y + 'px', width: '100%',
  zIndex: dragForm.zIndex, position: 'absolute'}" :index="dragForm.dragIndex"
  @click="dragTextClick(listIndex)">
    <div class="drag-img-list"
      ref="imgListWrap"
      :class="[dragForm.isActive ? 'active': '',
       JSON.stringify(dragForm.imgList) === '[]' ? 'init': '']">
      <div class="drag-img" v-if="!dragForm.imgList || !dragForm.imgList.length">
        <i class="iconfont ed-icon-duotu1" style="font-size: 60px"></i>
      </div>
        <img v-for="(item, index) in dragForm.imgList" :key="item.url+index"
          v-if="!!item.size && item.size.w" :src="item.url" :width="item.size.w"
          class="review-list-item"/>
    </div>
    <i class="el-icon-circle-close-outline drag-del" v-if="dragForm.isActive"
      @click="dragDel(listIndex)" :style="{top: dragForm.location.y-10+ 'px'}">
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
    };
  },
  methods: {
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 4);
    },
    // 删除组件
    dragDel(index) {
      this.$emit('dragDel', 4, index, this.dragForm.dragIndex);
    },
    forceUpdate() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
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
  outline: 1px dashed #59c7f9;
}
.drag-img-list.init {
  height: 300px;
}
.review-list-item {
  display: block;
}
</style>
