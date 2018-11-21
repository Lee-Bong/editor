<template>
    <div>
        <el-form-item label="位置：" size="mini" class="number-item" style="margin-top: 10px;">
            <el-input-number :value="0" @blur="locationChange"
            controls-position="right" class="num-input"></el-input-number>
            <el-input-number :value="0" @blur="locationChange"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label" style="padding-left: 90px"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini" class="number-item">
            <el-input-number :value="200" @blur="sizeChange"
            controls-position="right" class="num-input"></el-input-number>
            <el-input-number :value="40" @blur="sizeChange"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label" style="padding-left: 90px"> <label>宽</label> <label>高</label></div>
    </div>
</template>

<script>

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  data() {
    return {
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      fileModify: false,
    };
  },
  methods: {
    locationChange() {},
    sizeChange() {},
  },
};
</script>

<style >

</style>
