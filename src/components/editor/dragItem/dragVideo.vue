<template>
<div class="video-wrap">
  <d-video :form="dragForm.video" :dragForm="dragForm" :listIndex="listIndex"
   v-show="dragForm.sourceType === '1'" @dragTextClick="dragTextClick"
   @dragDel="dragDel" ref="videoRef"/>
  <d-video :form="dragForm.lineVideo" :dragForm="dragForm" :listIndex="listIndex"
   v-show="dragForm.sourceType === '2'" @dragTextClick="dragTextClick"
   @dragDel="dragDel" ref="videolineRef"/>
</div>
</template>
<script>
import VueDragResize from 'vue-drag-resize';
import dVideo from './video';

export default {
  name: 'dragVideo',
  components: {
    'vue-drag-resize': VueDragResize,
    dVideo,
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

  methods: {
    forceUpdate() {
      this.$refs.videoRef.forceUpdate();
      this.$refs.videolineRef.forceUpdate();
    },
    dragTextClick() {
      this.$emit('dragTextClick', this.listIndex, 5);
    },
    dragDel() {
      this.$emit('dragDel', 5, this.listIndex, this.dragForm.dragIndex);
    },
  },
};
</script>
