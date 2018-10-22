<template>
  <drag-resize
    :dragForm="dragForm"
    :infoForm="{dragName: 'dragLinks', type: 3, listIndex, minH: 15, minW: 15}"
    :class="'drag-item drag-link'"
    ref="dragItem"
    >
  </drag-resize>

</template>
<script>
import dragResize from '@/components/editor/dragItem/dragResize';

export default {
  name: 'dragItem',
  components: {
    dragResize,
  },
  props: {
    dragForm: Object,
    listIndex: Number,
  },
  data() {
    return {
      dragName: 'dragLinks',
      beforeZ: 0,
      inputValue: '',
      input: '',
      drag: {
        width: 375,
        height: 30,
        top: 0,
        left: 0,
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
  },
  methods: {
    dragStop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
  },
};
</script>

<style>
.drag-link {
  background-color: rgba(22, 155, 213, 0.5);
}
</style>
