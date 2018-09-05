<template>
    <vue-drag-resize
      :aspectRatio="true"
      :isActive="isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tl','tr','br','bl']"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="locationZ"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"

      @clicked="dragTextClick(listIndex)"
      @resizing="resize"
      @dragging="resize"
      @dragstop="dragstop"
      @resizestop="resizestop"
      class="drag-item"
    >
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
      <div>
        <audio-play v-if="!!dragForm.play && !!dragForm.play.url" :play="dragForm.play"/>
        
        <!-- <audio autoplay="autoplay"
          controls="controls"
          ref="aduioObj"
          preload="auto"
          :src="!!dragForm.play && !!dragForm.play.url ?  dragForm.play.url : ''"
          :style="{width: dragForm.size.w+'px', height: dragForm.size.h+'px'}"
        >
        </audio> -->
      </div>
    </vue-drag-resize>

</template>
<script>
import VueDragResize from 'vue-drag-resize';
import audioPlay from '@/components/editor/dragItem/image/audioPlay';

export default {
  name: 'dragAudio',
  components: {
    'vue-drag-resize': VueDragResize,
    audioPlay,
  },
  props: {
    dragForm: Object,
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
  created() {
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

</style>
