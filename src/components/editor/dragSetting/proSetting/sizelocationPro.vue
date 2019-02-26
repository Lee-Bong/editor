<template>
  <div>
    <div v-if="!form.notSize">
    <el-form-item label="尺寸：" size="mini" class="number-item">
      <el-input-number :value="form.size.w" @change="sizeWchange"
      :min="form.minW" :max="form.maxW ? form.maxW : maxW"
      controls-position="right" class="num-input"></el-input-number>
      <el-input-number :value="form.size.h" @change="sizeHchange"
      :min="form.minH || 0" :max="form.maxH ? form.maxH : maxH"
      :disabled="form.hDisabled" controls-position="right"
      class="num-input"></el-input-number>
    </el-form-item>
    <div class="dec-label" style="padding-left: 90px">
      <label>宽</label> <label>高</label>
    </div>
    </div>
    <div v-if="!form.notLocation">
      <el-form-item label="位置：" size="mini" class="number-item" style="margin-top: 10px;">
        <el-input-number :value="form.location.x" @change="locationXchange"
          :min="location.xmin" :max="form.maxX ? form.maxX : maxX" controls-position="right"
          :disabled="form.xDisabled ? true : false" class="num-input">
        </el-input-number>
        <el-input-number :value="form.location.y" @change="locationYchange"
          :min="location.ymin" :max="form.maxY ? form.maxY : maxY" controls-position="right"
          :disabled="form.yDisabled ? true : false" class="num-input">
        </el-input-number>
      </el-form-item>
      <div class="dec-label" style="padding-left: 90px"> <label>X</label> <label> Y</label></div>
    </div>
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
        wmin: 0,
        hmin: 0,
      },
    };
  },
  computed: {
    maxW() {
      return this.page.phoneWidth - this.form.location.x;
    },
    maxH() {
      return this.form.pH - this.form.location.y;
    },
    maxX() {
      return this.page.phoneWidth - this.form.size.w;
    },
    maxY() {
      return this.form.pH - this.form.size.h;
    },
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
  },
};
</script>

<style>
</style>
