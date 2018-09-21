<template>
  <vue-drag-resize class="phone-content" ref="phoneContent" :sticks="['bm']"
    :h="$store.state.page.phoneHeight" :isActive="true" :isDraggable="false"
    :isResizable="true" :parentLimitation="false" :preventActiveBehavior="true"
    :y="64" axis="y" @resizestop="resizestop" :style="{
    width: $store.state.page.phoneWidth+'px',
    backgroundColor:  $store.state.page.backgroundColor,
  }">
    <div class="phone-resize">
      <i class="el-icon-back resize-icon resize-up"></i>
      拖动调节页面高度
      <i class="el-icon-back resize-icon resize-down"></i>
    </div>
    <div class="drag-items" :style="{
      height: $store.state.page.phoneHeight + 'px',
      backgroundColor:  $store.state.page.backgroundColor}">
      <drag-text v-for="(drag, index) in $store.state.editor.dragTexts" v-if="drag.isShow"
       :key="drag.zIndex" :list-index="index" :dragForm="drag" @inputChange="inputChange"
       @dragStop="inputDragStop" @dragDel="dragDel" @dragTextClick="dragTextClick" />

      <drag-img v-for="(drag, index) in $store.state.editor.dragImages" :key="drag.zIndex"
       :list-index="index" :is-active="drag.isActive" v-if="drag.isShow" :dragForm="drag"
       @dragStop="inputDragStop" @dragDel="dragDel" @dragTextClick="dragTextClick" />

      <drag-link v-for="(drag, index) in $store.state.editor.dragLinks" v-if="drag.isShow"
       :key="drag.zIndex" :list-index="index" :dragForm="drag" @dragStop="inputDragStop"
       @dragDel="dragDel" @dragTextClick="dragTextClick" />

      <drag-img-lists v-for="(drag, index) in $store.state.editor.dragImgLists" v-if="drag.isShow"
       :key="drag.zIndex" :list-index="index" :dragForm="drag" @dragDel="dragDel"
       @dragTextClick="dragTextClick" />

      <drag-video v-for="(drag, index) in $store.state.editor.dragVideos" v-if="drag.isShow"
       :key="drag.zIndex" :list-index="index" :dragForm="drag" @dragStop="inputDragStop"
       @dragDel="dragDel" @dragTextClick="dragTextClick" />

      <drag-audio v-for="(drag, index) in $store.state.editor.dragAudios" v-if="drag.isShow"
       :key="drag.zIndex" :list-index="index" :dragForm="drag" @dragStop="inputDragStop"
       @dragDel="dragDel" @dragTextClick="dragTextClick" />
    </div>
  </vue-drag-resize>
</template>

<script>
import dragText from '@/components/editor/dragItem/dragText';
import dragImg from '@/components/editor/dragItem/dragImg';
import dragLink from '@/components/editor/dragItem/dragLink';
import dragImgLists from '@/components/editor/dragItem/dragImgLists';
import dragVideo from '@/components/editor/dragItem/dragVideo';
import dragAudio from '@/components/editor/dragItem/dragAudio';
import dragCom from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'layoutMain',
  props: {
  },
  components: {
    dragText,
    dragImg,
    dragLink,
    dragImgLists,
    dragVideo,
    dragAudio,
  },
  data() {
    return {
    };
  },
  methods: {
    inputChange() { // 组件-文本值改变
    },

    inputDragStop(form, ev, index) { // 拖动组件同步设置
      const dragItems = this.$store.state.editor[form];
      const dragItem = dragItems[index];
      dragItem.size.w = ev.width;
      dragItem.size.h = ev.height;
      dragItem.location.y = ev.top;
      dragItem.location.x = ev.left;
      dragItems[index] = dragItem;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    dragTextClick(index, type) { // 点击组件
      this.dragClick(index, type);
    },
    resizestop(ev) {
      this.$store.commit('page_update', {
        phoneHeight: ev.height,
      });
    },
    getLayerActive(sort, num) {
      let k;
      this.$store.state.editor.layerLists.map((item, key) => {
        if (item.type === sort && item.num === num) {
          k = key;
        }
        return true;
      });
      return k;
    },
  },
  updated() {


  },
};
</script>

<style >
.drag-item {
  position: absolute;
}
.phone-content {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  width: 375px;
  background-color: #fff;
}
.phone-content > .vdr-stick.vdr-stick-bm {
  height: 35px !important;
  width: 375px !important;
  z-index: 2001 !important;
  bottom: -35px !important;
  left: 0;
  margin-left: 0 !important;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #e4e4e4;
  box-shadow: none;
}
.phone-resize {
  height: 35px;
  width: 375px;
  position: absolute;
  bottom: -35px;
  left: 0;
  background-color: #fff;
  /* border: 1px solid #e4e4e4; */
  font-size: 16px;
  line-height: 35px;
  color: #323232;
  cursor: ns-resize;
  z-index: 2000;
  text-align: center;
}
.resize-icon {
  color: #eb5648;
}
.resize-up {
  transform: rotate(90deg);
}
.resize-down {
  transform: rotate(-90deg);
}
.phone-content.vdr.active:before {
  outline: none;
}
.drag-items {
  overflow: hidden;
}
</style>
