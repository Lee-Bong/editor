<template>
  <div ref="form">
    <div v-for="(component, index) in form" :key="index" >
      <div class="container" :style="containerStyle(component)">
        <div :is="formType(component.type)" :attr="component.type !== 12 ? component.attr :
        Object.assign(component.attr, {disabled: isStopCollect})"
        :ref="formType(component.type)+'Ref'"
        :fid ="component.id"
        :id="component.id" @valueEvent="valueChange" @clickEvent="formSubmit" :index="index"
        @codeEvent="codeChange" @sendCodeEvent="sendCodeEvent"></div>
      </div>
    </div>
    <w-warn :warn="this.warn" ref="fwarnRef"/>
    <w-toast :text="sendTip" ref="toastRef"/>
  </div>
</template>

<script>
import md5 from 'js-md5';
import AudioPlay from '@/components/editor/dragSetting/upload/audioPlay';
import wText from '@/components/element/wtext';
import wTextarea from '@/components/element/wtextarea';
import wRadio from '@/components/element/wradio';
import wSmscode from '@/components/element/wsmscode';
import wSubmit from '@/components/element/wsubmit';
import wWarn from '@/components/element/wwarn';
import wToast from '@/components/element/wtoast';
import { formSubmit, smsCode, smsVerify } from '@/service/index';
import ScaleStyle from './ScaleStyle';

export default {
  data() {
    return {
      formModel: {},
      formArr: [],
      warn: {},
      phones: [], // 存放手机
      isStop: false, // 是否停止收集
      sendTip: '',
    };
  },
  props: {
    form: Array,
    scale: Number,
    isStopCollect: Boolean,
  },
  components: {
    AudioPlay,
    wText,
    wTextarea,
    wRadio,
    wSmscode,
    wSubmit,
    ScaleStyle,
    wWarn,
    wToast,
  },

  mounted() {
    this.formArr = this.getFormModel();
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
      const ps = [];
      const model = {};
      this.form.map((item) => {
        if (item.type !== 12) {
          model[item.id] = {
            label: item.attr.label,
            value: '',
            isRequired: item.isRequired,
          };
          ps.push({
            id: item.id,
            label: item.attr.label,
            value: '',
            isRequired: item.isRequired,
          });
        }
        return true;
      });
      return ps;
    },
    valueChange(val, index) {
      if (this.formArr[index]) {
        this.formArr[index].value = val;
      }
    },
    codeChange(val, index) { // 验证码
      if (this.formArr[index]) {
        this.formArr[index].codeValue = val;
      }
    },
    async formSubmit() {
      const isOk = await this.inputCheck();
      if (isOk) {
        if (!this.$route.query.is_formal) { // 预览不统计数据
          this.openWarning({ text: '提交成功～' });
          return false;
        }
        try {
          const ele = this;
          const res = await formSubmit({
            page_id: this.$route.query.page_id,
            formDatas: this.formArr,
          });
          if (res && res.status === 'ok') {
            ele.openWarning({ text: '提交成功～' });
          } else {
            ele.commitError(res.message);
          }
        } catch (err) {
          this.commitError();
        }
      }
    },
    async sendCodeEvent() {
      const isOk = await this.phoneVerify(true);
      if (isOk) {
        try {
          const ts = Math.round(Date.parse(new Date()) / 1000);
          const phone = this.getPhoneItem(this.phones[0].id).value;
          const params = `phone=${phone}&ts=${ts}&sign=${this.getSign(`classsmsphone${phone}ts${ts}Ixv&EwN^e#gP%Gl4NhR7m9Z0P#UOH^EU`)}`;
          this.$refs.wSmscodeRef[0].apiSending = true;
          const data = await smsCode(params);
          this.$refs.wSmscodeRef[0].apiSending = false;
          if (data && data.code === 0) {
            // 倒计时
            this.sendToast('验证码发送成功～');
            this.$refs.wSmscodeRef[0].setCodeTip();
          } else {
            this.sendToast('验证码发送失败，请重试～');
          }
        } catch (err) {
          this.sendToast('验证码发送失败，请重试～');
        }
      }
    },
    getSign(params) {
      return md5(params);
    },
    // 表单校验
    async inputCheck() {
      let isOk = true;
      const len = this.formArr.length;
      for (let k = 0; k < len; k++) {
        if (this.formArr[k].isRequired && (!this.formArr[k].value ||
        !(this.formArr[k].value && this.formArr[k].value.trim()))) {
          this.openWarning({});
          isOk = false;
          return false;
        }
      }

      isOk = await this.phoneVerify();
      return isOk;
    },
    async phoneVerify(isCode) {
      let isOk = true;
      this.hasPhone();
      if (this.phones.length) {
        const phone = this.getPhoneItem(this.phones[0].id);
        const { value, codeValue } = phone;
        if (isCode && (!value || !value.trim())) {
          this.openWarning({ text: '发送验证码需要输入手机号～' });
          isOk = false;
          return false;
        }
        if (value && value.trim()) {
          if (!this.phoneCheck(value)) {
            this.openWarning({ text: '手机号输入错误，请重新输入～' });
            isOk = false;
            return false;
          }
          if (this.phones[0].attr.verify === 1 && !isCode) { // 验证码验证
            if (!codeValue || !codeValue.trim()) {
              this.openWarning({ text: '请输入验证码～' });
              isOk = false;
              return false;
            }
            // 验证码校验
            isOk = await this.smsVerify(codeValue);
          }
        }
      }
      return isOk;
    },
    async smsVerify(code) {
      try {
        const ts = Math.round(Date.parse(new Date()) / 1000);
        const phone = this.getPhoneItem(this.phones[0].id).value;
        const params = `phone=${phone}&ts=${ts}&code=${code}&sign=${this.getSign(`classsms_verifycode${code}phone${phone}ts${ts}Ixv&EwN^e#gP%Gl4NhR7m9Z0P#UOH^EU`)}`;
        const data = await smsVerify(params);
        if (data && data.code === 0) {
          return true;
        }
        this.openWarning({ text: '验证码错误，请重新输入～' });
        return false;
      } catch (err) {
        this.openWarning({ text: '验证码错误，请重新输入～' });
        return false;
      }
    },
    commitError(msg) {
      const message = msg || '提交失败，请重试～';
      this.openWarning({ text: message });
    },
    hasPhone() {
      this.phones = this.form.filter(item => item.type === 11);
    },
    getPhoneItem(id) {
      return this.formArr.filter(item => item.id === id)[0];
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
    sendToast(text) {
      this.sendTip = text;
      this.$refs.toastRef.show();
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

