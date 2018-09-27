<template>
    <vue-drag-resize
      :aspectRatio="true"
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tl','tr','br','bl']"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="dragForm.zIndex"
      :isDraggable="isAction"
      :isResizable="false"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :preventActiveBehavior="true"
      :parentH="parentH"

      @clicked="dragTextClick(listIndex)"
      @resizing="resize"
      @dragging="resize"
      @dragstop="dragstop"
      @resizestop="resizestop"
      :class="{ 'drag-item': isAction }"
    >
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
      <div>
        <audio-play :play="this.dragForm.sourceType === '1' ? dragForm.play : dragForm.linePlay"/>
      </div>
    </vue-drag-resize>

</template>
<script>
import VueDragResize from 'vue-drag-resize';
import audioPlay from '@/components/editor/dragSetting/upload/audioPlay';

export default {
  name: 'dragAudio',
  components: {
    'vue-drag-resize': VueDragResize,
    audioPlay,
  },
  props: {
    dragForm: Object,
    listIndex: Number,
  },
  data() {
    return {
      isPlay: false,
      dragName: 'dragAudios',
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
  computed: {
    parentH() {
      if (this.dragForm.position === 'relative') {
        return this.$store.state.page.phoneHeight;
      }
      return this.$store.state.page.screenHeight;
    },
    isAction() {
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.play && this.dragForm.play.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.linePlay && this.dragForm.linePlay.url);
    },
  },

  methods: {
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 6);
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
      this.$emit('dragDel', 6, index, this.dragForm.dragIndex);
    },
    dragDeactivated(index) { // 点击组件外区域
      this.$store.commit('inactive_drags', { index, arr: this.dragName, isAll: this.beforeZ });
    },
    dragstop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
  },
  updated() {
  },
};
</script>
