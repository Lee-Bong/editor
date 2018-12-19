<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="form.size.w"
      :h="form.size.h"
      :sticks="['tl','tr','br','bl']"
      :x="form.location.x"
      :y="form.location.y"
      :z="dragForm.zIndex"
      :isDraggable="isAction"
      :isResizable="isAction"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :aspectRatio="dragForm.isUpload ? true: false"
      :preventActiveBehavior="true"
      :parentH="parentH"
      :minw="218"
      :minh="minh"
      @clicked="dragTextClick"
      @resizing="resize"
      @dragging="resize"
      @dragstop="dragstop"
      @resizestop="resizestop"
      :class="{ 'drag-item': isAction }"
      >
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="dragForm.isActive"
      @click="dragDel">
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
        :src="dragForm.video.url"
        controlsList="nodownload"
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
    form: Object,
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
      return !!(this.form && this.form.url);
    },
    minh: {
      get() {
        return this.form.size ? (this.form.size.h * 218) / this.form.size.w : 100;
      },
    },
  },

  methods: {
    dragTextClick() {
      this.$emit('dragTextClick');
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
    dragDel() {
      this.$emit('dragDel');
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
      const curPlay = this.form;
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
      const curPlay = this.form;
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

video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
}
video::-webkit-media-controls {
    overflow: hidden !important;
}
video::-webkit-media-controls-enclosure {
    overflow:hidden !important;
    width: calc(100% + 32px);
    margin-left: auto;
}
video::-internal-media-controls-download-button {
    display: none;
}
</style>
