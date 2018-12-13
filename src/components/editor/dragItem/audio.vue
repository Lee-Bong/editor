<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="form.size.w"
      :h="form.size.h"
      :sticks="['tm','bm','ml','mr']"
      :x="form.location.x"
      :y="form.location.y"
      :z="dragForm.zIndex"
      :isDraggable="isAction"
      :isResizable="isAction"
      :aspectRatio="false"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :preventActiveBehavior="true"
      :parentH="parentH"
      :minh="80"
      :minw="186"

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
      <div>
        <audio-play :isBorder="this.dragForm.isBorder"
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
    form: Object,
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
      return Boolean(this.form && this.form.url);
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
      const curPlay = this.form;
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
      const curPlay = this.form;
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
    forceUpdate() {
      this.$forceUpdate();
    },
  },
};
</script>
