<template>
  <div>
    <el-input :class="[attr.isRequired? 'from-required': '']"
    :placeholder="attr.label" @change="valueChange">
    </el-input>
    <div style="margin-top: 14px" class="code-cont" v-if="attr.verify === 1">
      <el-input class="code-left" placeholder="验证码"
      @change="codeChange">
      </el-input>
      <el-button type="primary" class="code-right" :disabled="this.isSending"
      @click="sendCode">{{codeTip}}</el-button>
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
    id: String,
  },
  data() {
    return {
      codeTip: '发送验证码',
      isSending: false,
    };
  },
  methods: {
    valueChange(val) {
      this.$emit('valueEvent', val, this.id);
    },
    codeChange(val) {
      this.$emit('codeEvent', val, this.id);
    },
    sendCode() {
      // todo 接口
      // 倒计时
      this.setCodeTip();
    },
    setCodeTip() {
      this.isSending = true;
      this.codeTip = `${60}S`;
      let i = 60;
      const timer = setInterval(() => {
        if (i === 1) {
          this.isSending = false;
          this.codeTip = '发送验证码';
          clearInterval(timer);
          return false;
        }
        i -= 1;
        this.codeTip = `${i}S`;
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

</style>
