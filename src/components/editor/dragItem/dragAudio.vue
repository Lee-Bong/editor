<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="playW"
      :h="playH"
      :sticks="['tm','bm','ml','mr']"
      :x="locationX"
      :y="locationY"
      :z="dragForm.zIndex"
      :isDraggable="isAction"
      :isResizable="isAction"
      :aspectRatio="false"
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
        <audio-play :isBorder="(this.dragForm.isBorder === '1')"
          :play="this.dragForm.sourceType === '1' ? dragForm.play : dragForm.linePlay"/>
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
    locationX: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        return curPlay.location ? curPlay.location.x : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    locationY: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        return curPlay.location ? curPlay.location.y : 0;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    playW: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        return curPlay.size ? curPlay.size.w : 375;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    playH: {
      get() {
        const curPlay = this.dragForm.sourceType === '1' ? this.dragForm.play : this.dragForm.linePlay;
        return curPlay.size ? curPlay.size.h : 82;
      },
      set() {
      },
      immediate: true,
      deep: true,
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
      const curPlay = isAction ? this.dragForm.play : this.dragForm.linePlay;
      curPlay.size = {
        w: ev.width,
        h: ev.height,
      };
      curPlay.location = {
        x: ev.left,
        y: ev.top,
      };
      let playObj = {};
      if (isAction) {
        playObj = { play: curPlay };
      } else {
        playObj = { linePlay: curPlay };
      }
      this.updateAudio(playObj);
    },
    updateAudio(playObj) {
      const { dragAudios, audioActive } = this.$store.state.editor;
      let drags = dragAudios[audioActive];
      drags = Object.assign({}, drags, playObj);
      dragAudios[audioActive] = drags;
      const lists = Object.assign([], dragAudios);
      this.$store.commit('editor_update', { dragAudios: lists });
    },
    locationChange(location) { // 位置值发生改变
      const isAction = this.dragForm.sourceType === '1';
      const curPlay = isAction ? this.dragForm.play : this.dragForm.linePlay;
      curPlay.location = location;
      let playObj = {};
      if (isAction) {
        playObj = { play: curPlay };
      } else {
        playObj = { linePlay: curPlay };
      }
      const { dragAudios, audioActive } = this.$store.state.editor;
      let drags = dragAudios[audioActive];
      drags = Object.assign({}, drags, playObj);
      dragAudios[audioActive] = drags;
      const lists = Object.assign([], dragAudios);
      this.$store.commit('editor_update', { dragAudios: lists });
    },
  },
  updated() {
  },
  created() {
  },
};
</script>
