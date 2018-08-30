<template>
    <vue-drag-resize
      :isActive="isActive"
      :w="$store.state.editor.phoneWidth" :h="drag.height"
      :sticks="['tl','tr','br','bl']"
      :parentLimitation="true"
      :aspectRatio="true"
      :index="dragForm.dragIndex"
      :listIndex="listIndex"
      @activated="dragTextClick"
      @resizing="resize"
      @dragging="resize">
      <i class="el-icon-circle-close-outline drag-del drag-del-bottom"
      v-if="isActive"
      @click="dragDel(listIndex)">
      </i>
      <div class="drag-img">
      </div>
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
    isShow: Boolean,
    isActive: {
      type: Boolean,
      default: true,
    },
    dragForm: Object,
    listIndex: Number,
  },
  data() {
    return {
      dragName: 'dragTexts',
      inputValue: '',
      input: '',
      drag: {
        width: 360,
        height: 300,
        top: 0,
        left: 0,
        layerActive: 0,
      },
    };
  },

  mounted() {
    console.log(this.$store.state.editor);
  },

  methods: {
    dragTextClick() {
      const newEditor = this.deActiveArr(index);
      const layerActive = this.updateLayer(index, 2);
      this.$store.commit('editor_update', Object.assign(newEditor, {
        imgActive: index,
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
      this.$emit('getDelLayer', 2, index);
    },
    // tools
    deActiveArr(index) {
      const updateEditor = {};
      for (const item in this.$store.state.editor.typeCat) {
        const from = this.$store.state.editor.typeCat[item][0];
        const lists = this.$store.state.editor[this.$store.state.editor.typeCat[item][0]];

        if (lists.length) {
          if (this.dragName === from) {
            updateEditor[item[0]] = _.textActiveOff(lists, { index });
            updateEditor[item[2]] = true;
          } else {
            updateEditor[item[0]] = _.textActiveOff(lists, { index: 0, isAll: true });
            updateEditor[item[2]] = false;
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
.drag-text {
    height: 30px;
    width: 360px;
    line-height: 30px;
    min-height: 30px !important;
    border: 0;
    outline: 0;
    text-align: center;
    resize: none;
    box-sizing: border-box;
    font-size: 14px;
    font: 400 11px system-ui;
}
.input-record {
  position: absolute;
    left: 0;
    width:360px;
    top: 0;
    line-height: 30px;
    min-height: 30px !important;
    font-size: 14px;
    font: 400 11px system-ui;
    padding: 2px;
    z-index: -1;
    visibility: hidden;
}

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
      background-color: #ddd;
      z-index: 99;
}

.drag-del-bottom {
  top: 10px !important;
}

.drag-img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: #bbb;
}
</style>
