<template>
  <div
    :class="['setting-content', editor.isTextSet ?
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
    <div class="setting" :style="{ maxHeight: setForm.maxHeight + 'px'}">
      <el-form ref="form" :rules="formRules" label-width="80px">
        <el-form-item label="" label-width="0">
          <label class="el-form-item__label">文本内容：</label>
          <el-input
          type="textarea"
          resize=false
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
        <el-form-item label="位置：" size="mini" class="number-item">
          <el-input-number v-model="dragForm.location.x" @change="locationChange"
            :min="location.xmin" :max="(page.phoneWidth-dragForm.size.w)"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @change="locationChange"
            :min="location.ymin" :max="yMax"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <el-form-item label="尺寸：" size="mini" class="number-item">
          <el-input-number v-model="dragForm.size.w" @change="sizeChange"
            :min="size.wmin" :max="page.phoneWidth-dragForm.location.x"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.size.h" @change="sizeChange"
            :min="size.hmin" :max="page.phoneHeight-dragForm.location.y"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>宽</label> <label>高</label></div>
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
        </el-form>
      </div>
    </div>
</div>
</template>

<script>
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'dragTextSetting',
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
        wmin: 15,
        hmin: 15,
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
      this.$emit('input-sizeChange', 'dragTexts', this.dragForm.size, 'textActive');
    },
    settingClick() {
      this.$store.commit('editor_update', {
        textSet: true,
      });
    },
    remoteMethod() { // 字体输入监听

    },
    textColorReset() { // 字体颜色重置
      const { dragTexts, textActive } = this.editor;
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
      const { dragTexts, textActive } = this.editor;
      dragTexts[textActive].lineHeight = num;
      this.$store.commit('editor_update', {
        dragTexts,
      });
    },
    positionChange(val) {
      if (val !== 'relative' && this.dragForm.size.h > this.page.screenHeight) {
        this.$message({
          message: '组件高度大于一屏，无法设置固定位置～',
          type: 'error',
          duration: 2000,
        });
        const { textActive } = this.editor;
        let { dragTexts } = this.editor;
        dragTexts[textActive].position = 'relative';
        dragTexts = Object.assign([], dragTexts);
        this.$store.commit('editor_update', {
          dragTexts,
        });
        return false;
      }
      const { textActive } = this.editor;
      let { dragTexts } = this.editor;
      dragTexts[textActive].position = val;
      dragTexts = Object.assign([], dragTexts);
      this.$store.commit('editor_update', {
        dragTexts,
      });
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
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
.posotion-item .el-radio+.el-radio {
  margin-left: 10px;
}
.text-setting .el-form-item__label {
  padding-right: 5px;
}
.number-item .el-input-number--mini:nth-child(2)  {
  margin-left: 30px;
}
.number-item .el-input-number--mini:nth-child(1),
.num-input.el-input-number--mini {
  margin-left: 0;
}
.dec-label {
  padding-left: 80px;
  height: 30px;
  line-height: 30px;
  color: #606266;
  font-size: 13px;
  margin-top: -18px;
}
.dec-label label {
  display: inline-block;
  width: 80px;
  text-align: center;
  margin-top: -20px;
}
.dec-label label:last-child {
  margin-left: 50px;
}
.bg-reset{
  border: 0;
}

</style>
