<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="videoW"
      :h="videoH"
      :sticks="['tl','tr','br','bl']"
      :x="locationX"
      :y="locationY"
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
      :class="{ 'drag-item': isAction }"
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
        width="100%"
        height="100%"
        :poster="dragForm.video.poster" controls>
          <source :src="dragForm.video.url"
           type="video/mp4">
        </video>
        <video v-if="dragForm.sourceType === '2' &&  dragForm.lineVideo.url"
        ref="lineVideoPlay"
        class="video-show"
        width="100%"
        height="100%"
        :poster="dragForm.lineVideo.poster" controls>
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
    locationX: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.location ? curPlay.location.x : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    locationY: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.location ? curPlay.location.y : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    videoW: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.size ? curPlay.size.w : 375;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    videoH: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.video : this.dragForm.lineVideo;
        return curPlay.size ? curPlay.size.h : 300;
      },
      set() {
      },
      immediate: true,
      deep: true,
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
      // this.$emit('dragStop', this.dragName, ev, this.listIndex);
      this.locationChange({
        x: ev.left,
        y: ev.top,
      });
      const evs = ev;
      if (this.dragForm.position !== 'relative') {
        const maxTop = this.$store.state.page.screenHeight - this.dragForm.size.h;
        if (evs.top > maxTop) {
          evs.top = maxTop;
        }
      }
    },
    resizestop(ev) {
      const isAction = this.dragForm.sourceType === '1';
      const curPlay = isAction ? this.dragForm.video : this.dragForm.lineVideo;
      curPlay.size = {
        w: ev.width,
        h: ev.height,
      };
      let playObj = {};
      if (isAction) {
        playObj = { video: curPlay };
      } else {
        playObj = { lineVideo: curPlay };
      }
      this.updateVideo(playObj);
    },
    locationChange(location) { // 位置值发生改变
      const isAction = this.dragForm.sourceType === '1';
      const curPlay = isAction ? this.dragForm.video : this.dragForm.lineVideo;
      curPlay.location = location;

      let playObj = {};
      if (isAction) {
        playObj = { video: curPlay };
      } else {
        playObj = { lineVideo: curPlay };
      }
      this.updateVideo(playObj);
    },
    updateVideo(playObj) {
      const { dragVideos, videoActive } = this.$store.state.editor;
      let drags = dragVideos[videoActive];
      drags = Object.assign({}, drags, playObj);
      dragVideos[videoActive] = drags;
      const lists = Object.assign([], dragVideos);
      this.$store.commit('editor_update', { dragVideos: lists });
    },
    forceUpdate() {
      this.$forceUpdate();
    },
  },
  updated() {
    const ele = this;
    this.$nextTick(() => {
      if (ele.dragForm.sourceType === '1' && ele.dragForm.video.url && ele.$refs.videoPlay) {
        ele.$refs.videoPlay.src = ele.dragForm.video.url;
      }
      if (ele.dragForm.sourceType === '2' && ele.dragForm.lineVideo.url && ele.$refs.lineVideoPlay) {
        ele.$refs.lineVideoPlay.src = ele.dragForm.lineVideo.url;
      }
    });
  },
  mounted() {
  },
};
</script>

<style>
.video-play {
  width: 44px;
  height: 44px;
  background-color: #211e1e61;
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
  font-size: 40px;
  color: #ffffffab;
}
.video-show {
  cursor: move !important;
}
</style>
