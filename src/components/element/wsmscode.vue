<template>
  <div>
    <el-input :class="[attr.isRequired? 'from-required': '', 'iphone-input']"
    :placeholder="attr.label" @change="valueChange">
    </el-input>
    <div style="margin-top: 14px" class="code-cont" v-if="attr.verify === 1">
      <el-input class="code-left" placeholder="验证码"
      @change="codeChange">
      </el-input>
      <el-button type="primary" class="code-right w-form-sms" :disabled="this.isSending"
      :style="[!this.isSending && {backgroundColor: attr.bgColor, color: attr.textColor}]"
      @click="sendCode">{{!apiSending ? codeTip : '发送中...'}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'wsmscode',
  props: {
    attr: {
      type: Object,
      default: () => {},
    },
    index: Number,
  },
  data() {
    return {
      codeTip: '发送验证码',
      isSending: false,
      apiSending: false, // 发送验证码接口已经发送，等待接口返回
    };
  },
  methods: {
    valueChange(val) {
      this.$emit('valueEvent', val, this.index);
    },
    codeChange(val) {
      this.$emit('codeEvent', val, this.index);
    },
    async sendCode() {
      this.$emit('sendCodeEvent');
    },
    sendToast(text) {
      this.sendTip = text;
      this.$refs.toastRef.show();
    },
    setCodeTip() {
      this.isSending = true;
      this.codeTip = `${60}s`;
      let i = 60;
      const timer = setInterval(() => {
        if (i === 1) {
          this.isSending = false;
          this.codeTip = '发送验证码';
          clearInterval(timer);
          return false;
        }
        i -= 1;
        this.codeTip = `${i}s`;
      }, 1000);
    },
  },
};
</script>

<style>
.code-cont {
  display: flex;
}
.code-left {
  display: inline-block;
}
.code-right {
  min-width: 95px;
  width: 95px;
  flex-basis: 95px;
  height: 40px;
  padding: 0;
  line-height: 40px;
  background-color: #5AC7F9;
  text-align: center;
  border: 0;
  margin-left: 12px;
}
.code-right.el-button--primary.is-disabled,
.code-right.el-button--primary.is-disabled:hover,
.w-form-submit,
.w-form-submit:hover{
  background-color: #9B9B9B;
}
.iphone-input .el-input__inner,
.code-left .el-input__inner{
  line-height: 18px;
}
.sending-code {
  background-color: #66b1ff;
}
.w-form-sms:hover, .w-form-sms:active {
  opacity: 0.85;
}
</style>
