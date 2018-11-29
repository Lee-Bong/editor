<template>
  <div ref="form" :model="formModel">
    <div v-for="(component, index) in form" :key="index" >
    <div>
      <div class="container" :id="getElementId()" :style="containerStyle(component)">
        <div :is="formType(component.type)" :attr="component.attr" :value="formModel.value"
        :id="component.id" @valueEvent="valueChange" @clickEvent="formSubmit"
        @codeEvent="codeChange"></div>
      </div>
      </div>
    </div>
    <f-warn :warn="this.warn" ref="fwarnRef"/>
  </div>
</template>

<script>
import generate from 'nanoid/generate';
import AudioPlay from '../../components/editor/dragSetting/upload/audioPlay';
import wText from '../../components/element/wtext';
import wTextarea from '../../components/element/wtextarea';
import wRadio from '../../components/element/wradio';
import wSmscode from '../../components/element/wsmscode';
import wSubmit from '../../components/element/wsubmit';
import ScaleStyle from './ScaleStyle';
import fWarn from './fWarn';

export default {
  data() {
    return {
      formModel: {},
      warn: {},
      phones: [], // 存放手机
    };
  },
  props: {
    form: Array,
    scale: Number,
  },
  components: {
    AudioPlay,
    wText,
    wTextarea,
    wRadio,
    wSmscode,
    wSubmit,
    ScaleStyle,
    fWarn,
  },

  mounted() {
    this.formModel = this.getFormModel();
  },
  methods: {
    containerStyle(component) {
      const {
        size, positionInfo, location,
      } = component;
      let style = {
        width: `${size.w}px`,
        height: `${size.h}px`,
        'z-index': component.style['z-index'] || 0,
      };
      if (this.isFixed) {
        style = { ...style, position: 'fixed' };
        if (positionInfo.position === 'fixedBottom') {
          style = {
            ...style,
            bottom: `${positionInfo.bottom}px`,
          };
        }
        if (positionInfo.position === 'fixedTop') {
          style = { ...style, top: `${positionInfo.top}px` };
        }
      } else {
        style = {
          ...style,
          position: 'absolute',
          top: `${location.y}px`,
          left: `${location.x}px`,
        };
      }
      return style;
    },
    formType(type) {
      switch (type) {
        case 7:
        {
          return 'wText';
        }
        case 8:
        {
          return 'wTextarea';
        }
        case 9: {
          return 'wRadio';
        }
        case 11: {
          return 'wSmscode';
        }
        case 12: {
          return 'wSubmit';
        }
        default: {
          break;
        }
      }
    },
    getFormModel() {
      const model = {};
      this.form.map((item) => {
        if (item.type !== 12) {
          model[item.id] = {
            label: item.attr.label,
            value: '',
            isRequired: item.isRequired,
          };
        }
        return true;
      });
      return model;
    },
    getElementId() {
      return generate('abcdefghijklmn', 10);
    },
    valueChange(val, id) {
      console.log('valval', val);
      if (this.formModel[id] && this.formModel[id].value !== undefined) {
        this.formModel[id].value = val;
      }
    },
    formSubmit() {
      for (const k in this.formModel) {
        if (this.formModel[k].isRequired && (!this.formModel[k].value ||
        !(this.formModel[k].value && this.formModel[k].value.trim()))) {
          this.openWarning({});
          return false;
        }
      }

      this.hasPhone();
      if (this.phones.length) {
        for (let i = 0; i < this.phones.length; i++) {
          const { value } = this.formModel[this.phones[i].id];
          if (value && value.trim() && !this.phoneCheck(value)) {
            this.openWarning({ text: '手机号输入错误，请重新输入' });
            return false;
          }
          if (this.phones[i].verify === 1) { // 验证码验证
            this.openWarning({ text: '验证码输入错误，请重新输入' });
            return false;
          }
        }
      }
      console.log('sss验证', this.formModel);
    },
    hasPhone() {
      this.phones = this.form.filter(item => item.type === 11);
    },
    openWarning(warn) {
      this.warn = warn;
      this.$refs.fwarnRef.show();
    },
    phoneCheck(val) { // 没有去空格验证
      if (val && val.length === 11 && !Number.isNaN(Number(val))) {
        return true;
      }
      return false;
    },
    codeChange() { // 验证码

    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .link {
    cursor: pointer;
  }
  .image {
    display: block;
  }
  .image[lazy="loading"] {
    background-color: #ddd;
  }
}
</style>

