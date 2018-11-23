<template>
  <div>
    <el-form-item label="位置：" size="mini" class="number-item" style="margin-top: 10px;">
      <el-input-number :value="locationForm.location.x" @change="locationXchange"
      :min="location.xmin" :max="(page.phoneWidth-locationForm.size.w)" controls-position="right"
      class="num-input"></el-input-number>
      <el-input-number :value="locationForm.location.y" @change="locationYchange"
      :min="location.ymin" :max="(page.phoneHeight-locationForm.size.h)" controls-position="right"
      class="num-input"></el-input-number>
    </el-form-item>
    <div class="dec-label" style="padding-left: 90px"> <label>X</label> <label> Y</label></div>
    <el-form-item label="尺寸：" size="mini" class="number-item">
      <el-input-number :value="locationForm.size.w" @change="sizeWchange"
      :min="locationForm.minW" :max="(page.phoneWidth-locationForm.location.x)"
      controls-position="right" class="num-input"></el-input-number>
      <el-input-number :value="locationForm.size.h" @change="sizeHchange"
      :min="locationForm.minH || 0" :max="(page.phoneHeight-locationForm.location.y)"
      :disabled="locationForm.hDisabled" controls-position="right"
      class="num-input"></el-input-number>
    </el-form-item>
    <div class="dec-label" style="padding-left: 90px"> <label>宽</label> <label>高</label></div>
  </div>
</template>

<script>
import { dragCom } from '@/util/dragMxi';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'DragSetting',
  mixins: [dragCom(), settingCom()],
  props: {
    locationForm: Object,
  },
  data() {
    return {
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 30,
        hmin: 40,
      },
      fileModify: false,
    };
  },
  methods: {
    locationEvent(location) {
      this.locationChange(this.locationForm.dragName, location, this.locationForm.dragActive);
    },
    locationXchange(val) {
      this.locationEvent({
        x: val,
        y: this.locationForm.location.y,
      });
    },
    locationYchange(val) {
      this.locationEvent({
        x: this.locationForm.location.x,
        y: val,
      });
    },
    sizeEvent(size) {
      this.sizeChange(this.locationForm.dragName, size, this.locationForm.dragActive);
    },
    sizeWchange(val) {
      this.sizeEvent({
        w: val,
        h: this.locationForm.size.h,
      });
    },
    sizeHchange(val) {
      this.sizeEvent({
        w: this.locationForm.size.w,
        h: val,
      });
    },
  },
  updated() {
    // console.log('ssss', this.locationForm);
  },
};
</script>

<style >
</style>
