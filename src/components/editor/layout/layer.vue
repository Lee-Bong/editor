
<template>
  <el-card>
    <div slot="header" class="ew-layer-header">
      图层管理
    </div>
    <div class="ew-layer-list">
      <drag />
    </div>
  </el-card>
</template>

<script>
import drag from './layerDrag';

export default {
  name: 'layer',
  components: {
    drag,
  },
};
</script>

<style lang="less" scoped>
.ew-layer-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  .ew-layer-list {
    position: absolute;
    bottom: 20px;
    top: 55px;
    overflow: auto;
  }
}

</style>
