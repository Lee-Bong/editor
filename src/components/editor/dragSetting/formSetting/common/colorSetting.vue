<template>
<div>
  <el-form-item label="主题颜色：" size="mini">
        <el-color-picker :value="colorForm.bgColor"
          :show-alpha="true" class="color-item" @change="bgcolorChange"></el-color-picker>
        <el-button type="text" class="bg-reset" @click="bgcolorReset">重置</el-button>
      </el-form-item>
    <el-form-item label="标题颜色：" size="mini">
    <el-color-picker :value="colorForm.textColor"
        :show-alpha="true" class="color-item" @change="textcolorChange"></el-color-picker>
    <el-button type="text" class="bg-reset" @click="textcolorReset">重置</el-button>
    </el-form-item>
    </div>
</template>

<script>
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'colorSetting',
  mixins: [settingCom()],
  props: {
    colorForm: Object,
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
    bgcolorChange(val) {
      this.updateDrags(this.colorForm.dragName, val, this.colorForm.dragActive, 'bgColor');
    },
    textcolorChange(val) {
      this.updateDrags(this.colorForm.dragName, val, this.colorForm.dragActive, 'textColor');
    },
    bgcolorReset() {
      this.bgcolorChange(this.colorForm.bgDefault);
    },
    textcolorReset() {
      this.textcolorChange(this.colorForm.textDefault);
    },
  },
};
</script>

<style>
</style>
