
<template>

  <el-card>
    <div slot="header" class="layer-header">
      图层管理
    </div>
    <div class="layer-list">
      <drag />
    </div>
  </el-card>

</template>

<script>
import draggable from 'vuedraggable';
import sortable from 'sortable';
import drag from './layerDrag';

export default {
  name: 'layer',
  props: {
  },
  components: {
    draggable,
    sortable,
    drag,
  },
  data() {
    return {
      layerActive: 0,
      layerLists: [ // 图层管理
        {
          display: true, // 是否显示
          lock: true, // 是否可以编辑
          name: '图层1', // 图层名
        },
        {
          display: true,
          lock: true,
          name: '图层2',
        },
        {
          display: true,
          lock: false,
          name: '图层3',
        },
        {
          display: true,
          lock: false,
          name: '图层4',
        },
      ],
    };
  },
  methods: {
    getdata(evt) {
      console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      console.log(`拖动前的索引：${evt.oldIndex}`);
      console.log(`拖动后的索引：${evt.newIndex}`);
    },
    layerItemClick(index) {
      this.layerActive = index;
    },
  },
};
</script>

<style>
.el-card__body {
  padding: 0 !important;
}

.el-button + .el-button:nth-child(2n + 1) {
  margin-left: 0;
}
.el-card {
  border-top: 0;
}
.el-card.is-always-shadow {
  box-shadow: none;
  border-radius: 0;
  margin-top: 10px;
  border-right: 0;
}

.el-card__body {
  padding: 10px 0;
}

.layer-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 260px;
  height: 36px;
  background: #fff;
  font-size: 12px;
  color: #000;
  border-bottom: 1px solid #ccd5db;
  box-sizing: border-box;
  cursor: pointer;
}
.el-card__header {
  padding: 5px 10px;
  line-height: 34px;
}
.fixed-right .el-card__header {
  padding: 0;
}
.layer-header {
  height: 50px;
  line-height: 50px;
}

.flxed-main {
  background-color: #eee;
  position: absolute;
  top: 56px;
  height: auto;
  padding-bottom: 40px;
  left: 200px;
  right: 260px;
  display: flex;
  align-content: center;
  justify-content: center;
}

</style>
