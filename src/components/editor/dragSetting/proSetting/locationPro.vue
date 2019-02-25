<template>
  <div>
    <el-form-item v-if="!form.notLocation"
      label="位置：" size="mini" class="number-item" style="margin-top: 10px;">
      <el-input-number :value="form.location.x" @change="locationXchange"
      :min="location.xmin" :max="(page.phoneWidth-form.size.w)" controls-position="right"
      :disabled="form.xDisabled ? true : false"
      class="num-input"></el-input-number>
      <el-input-number :value="form.location.y" @change="locationYchange"
      :min="location.ymin" :max="(page.phoneHeight-form.size.h)" controls-position="right"
      :disabled="form.yDisabled ? true : false" class="num-input"></el-input-number>
    </el-form-item>
    <div class="dec-label" style="padding-left: 90px"> <label>X</label> <label> Y</label></div>
  </div>
</template>

<script>
import { dragCom } from '@/util/dragMxi';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'locationSetting',
  mixins: [dragCom(), settingCom()],
  props: {
    form: Object,
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
      this.updateSetting(this.form.dragName, this.form.dragActive, { location });
    },
    locationXchange(val) {
      this.locationEvent({
        x: val,
        y: this.form.location.y,
      });
    },
    locationYchange(val) {
      this.locationEvent({
        x: this.form.location.x,
        y: val,
      });
    },
    sizeEvent(size) {
      this.updateSetting(this.form.dragName, this.form.dragActive, { size });
    },
    sizeWchange(val) {
      this.sizeEvent({
        w: val,
        h: this.form.size.h,
      });
    },
    sizeHchange(val) {
      this.sizeEvent({
        w: this.form.size.w,
        h: val,
      });
    },
  },
  updated() {
    // alert(this.locationForm.dragName);
  },
};
</script>

<style>
</style>
