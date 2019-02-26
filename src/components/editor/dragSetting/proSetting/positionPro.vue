<template>
    <div v-if="!dragForm.notSize">
     <el-form-item label="固定位置：" size="mini" class="posotion-item">
        <el-radio v-model="dragForm.position" label="relative"
        @change="positionChange('relative')">不固定</el-radio>
        <el-radio v-model="dragForm.position" label="fixedTop"
        @change="positionChange('fixedTop')"
        >相对顶部固定</el-radio>
        <el-radio v-model="dragForm.position" label="fixedBottom"
        @change="positionChange('fixedBottom')"
        >相对底部固定</el-radio>
    </el-form-item>
    <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'"
        class="number-item">
        <el-input-number
        :value="fixedTop" @change="fixedTopChange"
        :min="location.ymin" :max="(page.screenHeight-dragForm.size.h)"
        controls-position="right" class="num-input"></el-input-number>
    </el-form-item>
    <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'"
        class="number-item">
        <el-input-number
        :value="fixedBottom" @change="fixedBottomChange"
        :min="location.ymin" :max="(page.screenHeight-dragForm.size.h)"
        controls-position="right" class="num-input"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
import { dragCom } from '@/util/dragMxi';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'locationSetting',
  mixins: [dragCom(), settingCom()],
  props: {
    dragForm: Object,
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
  },
  methods: {
    positionChange(val) {
      if (val !== 'relative' && this.dragForm.size.h > this.page.screenHeight) {
        this.$message({
          message: '组件高度大于一屏，无法设置固定位置～',
          type: 'error',
          duration: 2000,
        });
        this.updatePropSetting([{
          label: 'position', val: 'relative',
        }]);
        return false;
      }
      this.updatePropSetting([{
        label: 'position', val,
      }]);
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        const { location, size } = this.dragForm;
        location.y = maxBottom;
        this.updatePropSetting([{
          label: 'location', val: location,
        },
        { label: 'size', val: size }]);
      }
    },
    updatePropSetting(valsArr) {
      this.updatePropsSetting(this.dragForm.dragName, this.dragForm.dragActive, valsArr);
    },
  },
};
</script>

<style>
</style>
