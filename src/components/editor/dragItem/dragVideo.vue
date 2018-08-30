<template>
    <vue-drag-resize
      :isActive="isActive"
      :w="dragForm.size.w"
      :h="dragForm.size.h"
      :sticks="['tl','tr','br','bl']"
      :x="dragForm.location.x"
      :y="dragForm.location.y"
      :z="locationZ"
      :index="dragForm.dragIndex"
      listIndex="listIndex"
      :parentLimitation="true"

      @clicked="dragTextClick(listIndex)"
      @resizing="resize"
      @dragging="resize"
      @dragstop="dragstop"
      @resizestop="resizestop"
      class="drag-item"
      >
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="isActive"
      @click="dragDel(listIndex)">
      </i>
      <div class="drag-img">
        <div class="video-play">
          <i class="el-icon-caret-right" ></i>
        </div>
        <!-- <video width="320" height="240" controls>
          <source src="movie.mp4" type="video/mp4">
      </video> -->
      </div>

    </vue-drag-resize>

</template>
<script>
import $ from 'jquery';
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'dragVideo',
  components: {
    'vue-drag-resize': VueDragResize,
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
    listIndex: Number,
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
    dragTextClick(index) {
      const newEditor = this.deActiveArr(index);
      const layerActive = this.updateLayer(index, 5);
      this.$store.commit('editor_update', Object.assign(newEditor, {
        layerActive,
      }));
    },
    onResezing(obj) {
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
      this.$emit('getDelLayer', 5, index);
    },
    dragDeactivated(index) { // 点击组件外区域
    },
    dragstop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    resizestop(ev) {
      this.$emit('dragStop', this.dragName, ev, this.listIndex);
    },
    // tools
    deActiveArr(index) {
      const updateEditor = {};
      for (const item in this.$store.state.editor.typeCat) {
        const form = this.$store.state.editor.typeCat[item];
        const lists = this.$store.state.editor[form[0]];

        if (lists.length) {
          if (this.dragName === form[0]) {
            updateEditor[form[0]] = _.textActiveOff(lists, { index });
            updateEditor[form[2]] = true;
            updateEditor[form[3]] = index;
          } else {
            updateEditor[form[0]] = _.textActiveOff(lists, { index: 0, isAll: true });
            updateEditor[form[2]] = false;
          }
        }
      }
      return updateEditor;
    },
    updateLayer(index) {
      const layers = this.$store.state.editor.layerLists;
      let i;
      layers.map((item, key) => {
        if (item.sort === 1 && item.num === index) {
          i = key;
        }
      });
      return i;
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
}
.drag-del-bottom {
  top: 10px !important;
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
