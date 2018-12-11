<template>
  <div class="msg-wrap" v-show="isShow">
    <div class="shadow"></div>
    <div class="msg">
      <div class="tip" v-if="warn.text">{{warn.text}}</div>
      <div class="tip" v-if="!warn.text">带<span class="required">*</span>为必填项，请检查填写后提交</div>
      <el-button type="primary" round size="small" @click="hide">{{'我知道了'}}</el-button>
    </div>
  </div>
</template>
<script>
import wSubmit from '@/components/element/wsubmit';

export default {
  name: 'wwarn',
  props: {
    warn: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    wSubmit,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      document.body.addEventListener('touchmove', this.bodyScroll, false);
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    },
    hide() {
      this.isShow = false;
      document.body.style.position = 'initial';
    },
    bodyScroll(event) {
      event.preventDefault();
    },
  },
};
</script>

<style lang="less" scoped>
.msg-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .msg{
    background-color: #fff;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    z-index: 11;
    position: relative;
    width: 80%;
    height: 130px;
    padding: 30px 0;
    text-align: center;
    box-sizing: border-box;
    .tip {
      font-size: 14px;
      color: #606266;
      margin-bottom: 20px;
    }
  }
  .shadow {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;;
  }
  .required {
    color: #D0021B;
  }
}

</style>
