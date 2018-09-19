<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tl','tr','br','bl']"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="dragForm.zIndex"
      :isDraggable="isAction"
      :isResizable="isAction"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :aspectRatio="dragForm.isUpload ? true: false"
      :preventActiveBehavior="true"
      :parentH="parentH"

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
      <div class="drag-img" v-if="!isAction">
        <div class="video-play">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
      <video v-if="dragForm.sourceType === '1' &&  dragForm.video.url"
        ref="videoPlay"
        class="video-show"
        :width="dragForm.size.w"
        :height="dragForm.size.h"
        :poster="dragForm.poster" controls>
          <source :src="dragForm.video.url"
           type="video/mp4">
        </video>
        <video v-if="dragForm.sourceType === '2' &&  dragForm.lineVideo.url"
        ref="lineVideoPlay"
        class="video-show"
        :width="dragForm.size.w"
        :height="dragForm.size.h"
        :poster="dragForm.poster" controls>
          <source :src="dragForm.lineVideo.url">
        </video>

    </vue-drag-resize>

</template>
<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'dragVideo',
  components: {
    'vue-drag-resize': VueDragResize,
  },
  props: {
    listIndex: Number,
    dragForm: Object,
  },
  data() {
    return {
      dragName: 'dragVideos',
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
      return Boolean(this.dragForm.sourceType === '1' && this.dragForm.video && this.dragForm.video.url)
       || Boolean(this.dragForm.sourceType === '2' && this.dragForm.lineVideo && this.dragForm.lineVideo.url);
    },
  },

  methods: {
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 5);
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
      this.$emit('dragDel', 5, index, this.dragForm.dragIndex);
    },
    dragDeactivated() { // 点击组件外区域
    },
    dragstop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
  },
  updated() {
    if (this.dragForm.sourceType === '1' && this.dragForm.video.url) {
      this.$refs.videoPlay.src = this.dragForm.video.url;
    }
    if (this.dragForm.sourceType === '2' && this.dragForm.lineVideo.url) {
      this.$refs.lineVideoPlay.src = this.dragForm.lineVideo.url;
    }
  },
  mounted() {
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
.video-play {
  width: 44px;
  height: 44px;
  background-color: #211e1e82;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -22px;
  margin-top: -22px;
}
.video-play i {
  font-size: 30px;
  color: #ffffffab;
}
</style>
