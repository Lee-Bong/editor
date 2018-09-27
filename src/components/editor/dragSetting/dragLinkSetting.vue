<template>
  <div :class="['setting-content', editor.isLinkSet
    ? 'setting-show' : '', 'link-setting']"
    :style="{width: setForm.width+'px'}"
  >
  <div class="setting-box">
    <div class="setting-title">
      <span>组件设置</span>
      <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
      </span>
    </div>
    <div class="setting">
      <el-form ref="form" label-width="90px">
        <el-form-item label="位置：" size="mini" class="number-item" style="margin-top: 10px;">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :min="location.ymin" :max="yMax"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini" class="number-item">
          <el-input-number v-model="dragForm.size.w" @blur="sizeChange"
            :min="size.wmin" :max="$store.state.page.phoneWidth-dragForm.location.x"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @blur="sizeChange"
            :min="size.hmin" :max="$store.state.page.phoneHeight-dragForm.location.y"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
        <el-form-item size="mini" class="link-setting-item">
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('1')" label="1">设置跳转链接</el-radio>
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('2')" label="2">设置App唤起 /下载链接</el-radio>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='1'" label="App内跳转：" size="mini">
          <el-input type="text" v-model="dragForm.appLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='1'" label="App内跳转：" size="mini">
          <el-input type="text" v-model="dragForm.outLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="唤起链接：" size="mini">
          <el-input  type="text" v-model="dragForm.awakeLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="iOS 渠道：" size="mini">
          <el-input type="text" v-model="dragForm.iosLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="安卓渠道：" size="mini">
          <el-input :span="16" type="text" v-model="dragForm.andLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="应用宝渠道：" size="mini">
          <el-input type="text" v-model="dragForm.yybLink"></el-input>
        </el-form-item>
        <div>
            <el-form-item label="固定位置：" size="mini" class="posotion-item">
            <el-radio v-model="dragForm.position" label="relative">不固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedTop" @change="positionChange"
              >相对顶部固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedBottom" @change="positionChange"
              >相对底部固定</el-radio>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'"
              class="number-item">
              <el-input-number
                v-model="fixedTop" @change="fixedTopChange"
                :min="location.ymin" :max="($store.state.page.screenHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'"
              class="number-item">
              <el-input-number
                v-model="fixedBottom" @change="fixedBottomChange"
                :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
          </div>
      </el-form>
    </div>
   </div>
   </div>
</template>

<script>
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  data() {
    return {
      sHeight: 800,

      sizeList: ['12px', '14px'],

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
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isLinkSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragLinks', this.dragForm.location, 'linkActive');
    },
    sizeChange() { // 大小值发生改变
      this.$emit('input-sizeChange', 'dragLinks', this.dragForm.size, 'linkActive');
    },
    sourceChange(type) {
      this.$emit('linkSourceChange', type, 'dragLinks', 'linkActive');
    },
    positionChange() {
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        const { location } = this.dragForm;
        location.y = maxBottom;
        this.$emit('input-locationChange', 'dragLinks', location, 'linkActive');
      }
    },
  },
  mounted() {
  },
};
</script>
<style>
.link-el.el-form-item--mini .el-form-item__content {
  display: inline-block;
  width: 255px;
}
.link-setting .el-form-item__label {
  padding-right: 5px;
}
.link-setting .el-input--mini .el-input__inner {
  padding: 0 8px;
}
.link-setting .el-form-item__content {
  margin-left: 0 !important;
}
.link-setting-item {
  margin-left: 25px !important;
}
</style>
