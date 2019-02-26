<template>
<draggable class="ew-layer-drag"
  :list="$store.state.editor.layerLists"
  @update="updateLayerList"
  :options="{animation: 300,handle:'.dargDiv'}">
    <transition-group name="list-complete" >
      <div
        v-for="(layer, index) in $store.state.editor.layerLists"
        :key="index"
        :index="layer.zIndex"
        :id="layer.id"
        :class="['dargDiv', {active: $store.state.editor.layerActive==index},'layer-item']"
        @dblclick="layerDbclick(index)"
        @click="layerclick(layer, index)">
        <i :class="['iconfont', layer.icon]"></i>
        <span v-show="!layer.editing" class="ew-layout_name" >{{layer.name}}</span>
        <input v-show="layer.editing" v-model="layer.name"
        ref='nameEditor'
        :key="index"
        :autofocus="layer.editing"
        class="ew-layout_name ew-layout_name--editing"
        @blur="layoutNameBlur(index)"/>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
import sortable from 'sortable';
import VueDraggable from 'vuedraggable';
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'layerDrag',
  props: {},
  components: {
    draggable: VueDraggable,
    sortable,
  },
  data() {
    return {
      editing: false,
      sHeight: 800,
      fontSize: '12px',
      sizeList: ['12px', '14px'],
      myArray: [],
      layerActive: 0,
      form: '',
      textInput: '',
      textAlign: 1,
      textColor: 'rgba(19, 206, 102, 0.8)',
    };
  },
  methods: {
    textInputFocus() {
    },
    textInputClick() {
    },
    handleChange() {

    },
    updateLayerList(evt) {
      const { newIndex } = evt;
      const { layerLists, typeCat } = this.$store.state.editor;
      let { componentIds } = this.$store.state.page;
      const { type, num } = layerLists[newIndex];
      const newList = [];
      let newRditor = {};
      componentIds = [];
      layerLists.map((item, i) => {
        const zin = layerLists.length - i;
        newList[i] = Object.assign(item, { zIndex: zin });
        const drags = this.$store.state.editor[typeCat[item.type][0]];
        drags[item.num] = Object.assign(drags[item.num], { dragIndex: zin });
        newRditor = Object.assign(newRditor, { [typeCat[item.type][0]]: drags });
        componentIds.push({
          name: item.name,
          id: item.id,
        });
        return true;
      });
      this.$store.commit('editor_update', {
        ...newRditor,
        layerLists: newList,
        layerActive: newIndex,
      });
      this.dragClick(num, type);
      this.$store.commit('page_update', { componentIds });
      // this.$store.dispatch('layerMove', { layerLists, newIndex });
    },
    dataMoving(evt) {
      const { draggedContext } = evt;
      const { futureIndex, index } = draggedContext;
      this.updateLayerList({
        newIndex: futureIndex,
        oldIndex: index,
      });
    },
    layerclick(drag) { // 单击图层
      const { type, num } = drag;
      this.dragClick(num, type);
    },
    layerDbclick(index) { // 双击图层
      const layouts = this.$store.state.editor.layerLists;
      layouts[index].editing = true;
      this.$store.commit('editor_update', {
        layerLists: layouts,
      });

      this.$nextTick(() => {
        this.$refs.nameEditor[0].focus();
      });
    },
    layoutNameBlur(index) {
      const layouts = this.$store.state.editor.layerLists;
      layouts[index].editing = false;

      this.$store.commit('editor_update', {
        layerLists: layouts,
      });
      const { componentIds } = this.$store.state.page;
      componentIds[index].name = layouts[index].name;
      this.$store.commit('page_update', {
        componentIds,
      });
    },
  },
  updated() {
  },

};
</script>

<style>
.ew-layer-drag {
  z-index: 99999;
}
.setting-title {
  height: 31px;
  padding-left: 15px;
  padding-right: 15px;
  line-height: 31px;
  background-color: #f6f7f8;
  border-bottom: 1px solid #d9d9d9;
  text-align: left;
  color: #8d9ea7;
}
.header-btn {
  float: right;
}
.header-btn i {
  margin-left: 5px;
  cursor: pointer;
}
.header-btn i:hover {
  color: #323232;
}
.setting {
  padding: 5px;
  padding-bottom: 15px;
  background-color: #fff;
  text-align: left;
  overflow-y: auto;
  box-sizing: border-box;
}
.el-form-item__label {
  padding-right: 0;
}
.el-form-item {
  margin-bottom: 8px;
}
.el-radio__label {
  padding-left: 2px;
}
.el-input-number--mini {
  width: 100px;
  margin-left: 5px;
}
.el-input-number--mini .el-input__inner {
  padding-left: 5px;
  padding-right: 26px;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  width: 20px;
}
.el-select.el-select--mini {
  width: 100px;
}
.dargDiv {
  background: #fff;
}
.layer-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 260px;
  height: 40px;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 12px;
  color: #323232;
  line-height: 40px;
  border-bottom: 1px solid #ccd5db;
  background: #fff;
  cursor: move;
}
.layer-item:active,
.layer-item.active {
  background: #1593ffc9;
  color: #fff !important;
}
.layer-item:hover
{
  color: #1593ff;
}

.layer-item > i,
.layer-item .fa-icon {
  margin-right: 10px;
}
.ew-layout_name{
  height: 24px;
  width: 220px;
  padding: 5px;
  line-height: 24px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ew-layout_name--editing{
  width: 230px;
  border-radius: 3px;
  border: 1px solid #1593ff;
  transition: border .2s linear,box-shadow .2s linear;
  color: #1593ff;
}

</style>
