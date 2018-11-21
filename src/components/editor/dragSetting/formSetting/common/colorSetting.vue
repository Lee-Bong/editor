<template>
<div>
  <el-form-item label="主题颜色：" size="mini">
        <el-color-picker :value="'#409eff'"
          :show-alpha="true" class="color-item"></el-color-picker>
        <el-button type="text" class="bg-reset" @click="pageBgReset">重置</el-button>
      </el-form-item>
    <el-form-item label="标题颜色：" size="mini">
    <el-color-picker :value="'#fff'"
        :show-alpha="true" class="color-item"></el-color-picker>
    <el-button type="text" class="bg-reset" @click="pageBgReset">重置</el-button>
    </el-form-item>
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
  },
};
</script>

<style >

</style>
