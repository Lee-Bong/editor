<template>
  <base-setting :setForm="setForm">
    <template slot="form">
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
          @change="fontSizeChange"
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
          <el-color-picker v-model="dragForm.textColor" :show-alpha="true"
          @change="textColorChange"></el-color-picker>
          <el-button type="text" class="bg-reset" @click="textColorReset">重置</el-button>
        </el-form-item>
        <size-location-pro :form="{dragName, dragActive, size: dragForm.size,
        location: dragForm.location, minW: 15, minH: 15, pH:formWrapH}"/>
        <position-pro :dragForm="{dragName, dragActive,position: dragForm.position,
        size: dragForm.size,location: dragForm.location, type: dragForm.type}"/>
      </el-form>
    </template>
  </base-setting>
</template>

<script>
import { dragCom } from '@/util/dragMxi';
import baseSetting from '@/components/editor/dragSetting/baseSetting';
import sizeLocationPro from '@/components/editor/dragSetting/proSetting/sizelocationPro';
import positionPro from '@/components/editor/dragSetting/proSetting/positionPro';

export default {
  mixins: [dragCom()],
  name: 'dragTextSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    baseSetting,
    sizeLocationPro,
    positionPro,
  },
  data() {
    return {
      dragName: 'dragTexts',
      dragActive: 'textActive',
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
  computed: {
    formWrapH() {
      return this.dragForm.position === 'relative' ? this.page.phoneHeight : this.page.screenHeight;
    },
  },

  methods: {
    fontSizeChange(val) {
      this.updatePropSetting('fontSize', val);
    },
    textColorChange(val) {
      this.updatePropSetting('textColor', val);
    },
    remoteMethod() { // 字体输入监听
    },
    updatePropSetting(label, val) {
      this.updatePropsSetting(this.dragName, this.dragActive, [{ label, val }]);
    },
    textColorReset() { // 字体颜色重置
      this.updatePropSetting('textColor', '#000');
    },
    lineNumChange(num) {
      this.lineNum = (num / 3) * 100;
    },
    lineSliderChange(pre) {
      this.updateLineHieght(((pre * 3) / 100).toFixed(1));
    },
    updateLineHieght(num) {
      this.updatePropSetting('lineHeight', num);
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
  margin-top: -10px;
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
