<template>
  <div>
    <d-audio :form="dragForm.play" :dragForm="dragForm" :listIndex="listIndex"
    v-show="dragForm.sourceType === '1'" @dragTextClick="dragTextClick"
    @dragDel="dragDel" ref="audioRef"/>
    <d-audio :form="dragForm.linePlay" :dragForm="dragForm" :listIndex="listIndex"
    v-show="dragForm.sourceType === '2'" @dragTextClick="dragTextClick"
    @dragDel="dragDel" ref="audioLineRef"/>
  </div>
</template>
<script>
import dAudio from './audio';

export default {
  name: 'dragAudio',
  components: {
    dAudio,
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
  methods: {
    forceUpdate() {
      this.$refs.audioRef.forceUpdate();
      this.$refs.audioLineRef.forceUpdate();
    },
    dragTextClick() {
      this.$emit('dragTextClick', this.listIndex, 6);
    },
    dragDel() {
      this.$emit('dragDel', 6, this.listIndex, this.dragForm.dragIndex);
    },
  },
};
</script>
