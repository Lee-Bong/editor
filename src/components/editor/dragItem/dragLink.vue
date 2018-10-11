<template>
    <vue-drag-resize
      :isActive="dragForm.isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tm','bm','ml','mr']"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="dragForm.zIndex"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      :parentLimitation="true"
      :preventActiveBehavior="true"
      :parentH="parentH"
      :minh="20"
      :minw="50"

      @clicked="dragTextClick(listIndex)"
      @dragstop="dragstop"
      @resizestop="resizestop"
      @resizing="resize"
      @dragging="resize"
      class="drag-item drag-link"
      >
      <i class="el-icon-circle-close-outline drag-del"
      v-if="dragForm.isActive"
      @click="dragDel(listIndex)">
      </i>
    </vue-drag-resize>

</template>
<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'dragItem',
  components: {
    'vue-drag-resize': VueDragResize,
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
    dragTextClick(index) {
      this.$emit('dragTextClick', index, 3);
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
      this.$emit('dragDel', 3, index, this.dragForm.dragIndex);
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
.drag-link {
  background-color: rgba(22, 155, 213, 0.5);
}
</style>
