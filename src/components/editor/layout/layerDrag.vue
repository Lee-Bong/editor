<template>
<draggable class="layer-drag"
  :list="$store.state.editor.layerLists"
  :move="getdata"
  @update="datadragEnd"
  :options="{animation: 300,handle:'.dargDiv'}">
    <transition-group name="list-complete" >
        <div
        v-for="(layer, index) in $store.state.editor.layerLists"
        :key="index"
        :index="layer.zIndex"
        :class="['dargDiv', {active: $store.state.editor.layerActive==index},'layer-item']"
        @dblclick="layerDbclick(index)"
        @click="layerclick(layer, index)">
        <span v-show="!layer.editing" class="layout-name" >{{layer.name}}</span>
        <input v-show="layer.editing" v-model="layer.name"
        ref='nameEditor'
        :key="index"
        :autofocus="layer.editing"
        class="layout-name name-editor"
        @blur="layoutNameBlur(index)"/>
        </div>
    </transition-group>
  </draggable>
</template>

<script>
import VueDraggable from 'vuedraggable';
import { dragCom } from '@/util/dragMxi';
import { mapState } from 'vuex';

export default {
  mixins: [dragCom()],
  name: 'DragSetting',
  props: {},
  components: {
    draggable: VueDraggable,
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
  computed: {
    ...mapState({
      editor: state => state.editor,
      page: state => state.page,
    }),
  },
  methods: {
    textInputFocus() {
    },
    textInputClick() {
    },
    handleChange() {

    },
    getdata() {
      // console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      const { oldIndex, newIndex } = evt;
      const { layerLists, typeCat } = this.$store.state.editor;
      const { type, num } = layerLists[newIndex];
      const nDrags = this.$store.state.editor[typeCat[type][0]];
      const oDrags = this.$store.state.editor[typeCat[layerLists[oldIndex].type][0]];
      const nIndex = oDrags[layerLists[oldIndex].num].dragIndex;
      const oIndex = nDrags[num].dragIndex;
      nDrags[num].dragIndex = nIndex;
      oDrags[num].dragIndex = oIndex;
      this.$store.commit('editor_update', {
        [typeCat[type][0]]: oDrags,
        [typeCat[layerLists[newIndex].type][0]]: nDrags,
      });
      this.dragClick(num, type);
      this.$store.dispatch('layerMove', { layerLists, newIndex });
    },
    layerclick(drag, index) { // 单击图层
      if (this.$store.state.editor.layerActive === index) return false;
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
    },
  },
  updated() {
  },

};
</script>

<style>
.layer-drag {
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
  cursor: pointer;
  margin-left: 5px;
}
.header-btn i:hover {
  color: #323232;
}
.setting {
  padding: 5px;
  background-color: #fff;
  text-align: left;
}
.el-form-item__label {
  padding-right: 0;
}
.el-form-item {
  margin-bottom: 8px;
}
.el-radio + .el-radio,
.el-form-item--mini.el-form-item {
  margin-left: 5px;
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

.dec-label {
  padding-left: 80px;
  height: 30px;
  line-height: 30px;
  color: #323232;
  font-size: 14px;
  margin-top: -18px;
}

.dec-label label {
  display: inline-block;
  width: 80px;
  text-align: center;
  margin-top: -20px;
}

.dec-label label:first-child {
  padding-right: 10px;
  padding-left: 10px;
  width: auto;
}
.dec-label label:last-child {
  margin-left: 50px;
}
.dargDiv {
  background: #fff;
}

.layer-item {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  color: #323232;
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
.layout-name{
    height: 24px;
    padding: 5px;
    line-height: 24px
}
.name-editor{
  width: 230px;
  transition: border .2s linear,box-shadow .2s linear;
  border-radius: 3px;
  color: #1593ff;
  border: 1px solid #1593ff;
}

</style>
