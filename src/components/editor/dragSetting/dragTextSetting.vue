<template>
  <div
    :class="['setting-content', $store.state.editor.isTextSet ?
     'setting-show' : '', 'text-setting']"
    :style="{width: setForm.width+'px'}"
    @click="settingClick">
  <div class="setting-box">
    <div class="setting-title">
      <span>组件设置</span>
      <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
      </span>
    </div>
    <div class="setting">
      <el-form ref="form" :rules="formRules">
        <el-form-item label="" label-width="0">
          文本内容：
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          label-width='0'
          value="dragForm.content"
          v-model="dragForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="字体大小：" size="mini" prop="name">
        <el-select v-model="dragForm.fontSize"
          filterable remote :remote-method="remoteMethod" placeholder="请选择">
          <el-option
            v-for="item in sizeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="行高：" size="mini" class="line-item">
          <el-slider :show-tooltip="false" v-model="lineNum" @change="lineSliderChange"></el-slider>
          <el-input-number v-model="dragForm.lineHeight"
            :min="0" :max="3" :step="0.1" @change="lineNumChange"
            controls-position="right" class="line-num-input"></el-input-number>
        </el-form-item>
        <el-form-item label="对齐方式：" size="mini">
          <el-radio v-model="dragForm.textAlign" label="left">左对齐</el-radio>
          <el-radio v-model="dragForm.textAlign" label="center">居中</el-radio>
          <el-radio v-model="dragForm.textAlign" label="right">右对齐</el-radio>
        </el-form-item>
        <el-form-item label="文本颜色：" size="mini">
          <el-color-picker v-model="dragForm.textColor" :show-alpha="true"></el-color-picker>
          <el-button type="text" class="bg-reset" @click="textColorReset">重置</el-button>
        </el-form-item>
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @change="locationChange"
            :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @change="locationChange"
            :min="location.ymin" :max="yMax"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini">
          <el-input-number v-model="dragForm.size.w" @change="sizeChange"
            :min="size.wmin" :max="$store.state.page.phoneWidth-dragForm.location.x"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @change="sizeChange"
            :min="size.hmin" :max="$store.state.page.phoneHeight-dragForm.location.y"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
        <el-form-item label="固定位置：" size="mini">
          <el-radio v-model="dragForm.position" label="relative">不固定</el-radio>
          <el-radio v-model="dragForm.position" label="fixedTop" @change="positionChange"
             >相对顶部固定</el-radio>
          <el-radio v-model="dragForm.position" label="fixedBottom" @change="positionChange"
            >相对底部固定</el-radio>
        </el-form-item>
        <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'">
          <el-input-number
            :value="fixedTop" @change="fixedTopChange"
            :min="location.ymin" :max="($store.state.page.screenHeight-dragForm.size.h)"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'">
          <el-input-number
            :value="fixedBottom" @change="fixedBottomChange"
            :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        </el-form>
      </div>
    </div>
</div>
</template>

<script>
import dragMxi from '@/util/dragMxi';

export default {
  mixins: [dragMxi.dragCom()],
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  data() {
    return {
      sizeList: [],
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      lineNum: 0,
      formRules: {
      },
    };
  },
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isTextSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragTexts', this.dragForm.location, 'textActive');
    },
    sizeChange() { // 大小值发生改变
      this.setFixedBottom(this.dragForm.location.x, this.dragForm.size.h);
      this.$emit('input-sizeChange', 'dragTexts', this.dragForm.size, 'textActive');
    },
    settingClick() {
      this.$store.commit('editor_update', {
        textSet: true,
        isClick: true,
      });
    },
    remoteMethod() { // 字体输入监听

    },
    textColorReset() { // 字体颜色重置
      const { dragTexts, textActive } = this.$store.state.editor;
      dragTexts[textActive].textColor = '#000';
      this.$store.commit('editor_update', {
        dragTexts,
      });
    },
    lineNumChange(num) {
      this.lineNum = (num / 3) * 100;
    },
    lineSliderChange(pre) {
      this.updateLineHieght(((pre * 3) / 100).toFixed(1));
    },
    updateLineHieght(num) {
      const { dragTexts, textActive } = this.$store.state.editor;
      dragTexts[textActive].lineHeight = num;
      this.$store.commit('editor_update', {
        dragTexts,
      });
    },
    positionChange() {
      const maxBottom = this.$store.state.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        const { location } = this.dragForm;
        location.y = maxBottom;
        this.$emit('input-locationChange', 'dragTexts', location, 'textActive');
      }
    },
  },
  mounted() {
    let i = 12;
    const list = [];
    while (i < 75) {
      list.push(`${i}px`);
      i += 2;
    }
    this.sizeList = list;
    this.lineNum = (this.dragForm.lineHeight / 3) * 100;
  },
  destroyed() {
    // console.log('destroyed');
  },
  updated() {
  },
};
</script>

<style>

.el-input-number.is-controls-right .el-input__inner {
      padding-left: 5px!important;
    padding-right: 34px!important;
}
.line-item .el-slider__runway, .ine-item .el-slider__bar {
  height: 4px;
}
.line-item .el-slider__button {
  width: 10px;
  height: 10px;
}
.line-item .el-slider__runway {
  width: 180px;
  margin: 0;
  display: inline-block;
}
.line-item .el-slider {
  float: left;
}
.line-num-input.el-input-number--mini {
  display: inline-block;
  width: 80px;
  margin-left: 15px;
}
.text-setting .el-textarea__inner {
  padding: 5px;
}
</style>
