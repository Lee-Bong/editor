<template>
  <div class="tip-wrap">
  <el-input v-model="tipUrl" class="tip-url" readonly
  size='mini' placeholder="请输入内容"></el-input>
  <el-button type="primary" size="mini" class="copy-btn"
  :data-clipboard-text="tipUrl">复制</el-button>
  <div class="qrcode" ref="qrCode"></div>
  <a class="qrcode-download" download="二维码">下载二维码</a>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';

export default {
  name: 'tableTip',
  props: {
    tipUrl: String,
  },
  data() {
    return {

    };
  },
  methods: {
    createQrCode() {
      const qr = new QRCode(this.$refs.qrCode, {
        text: this.tipUrl,
        width: 120,
        height: 120,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
      this.$nextTick(() => {
        const ele = this;
        setTimeout(() => {
          const url = ele.$refs.qrCode.children[1].getAttribute('src');
          document.getElementsByClassName('qrcode-download')[0].setAttribute('href', url);
        }, 1000);
      });
      return qr;
    },
  },
  mounted() {
    // 初始化二维码
    this.createQrCode();
    // 初始化复制面板
    this.$nextTick(() => {
      const copyBtn = new Clipboard('.copy-btn');
      // 复制成功后执行的回调函数
      copyBtn.on('success', () => {
        this.$message({
          showClose: true,
          message: '复制成功',
          type: 'success',
        });
      });
    });
  },
};
</script>

<style>
.tip-wrap {
    padding: 5px;
    text-align: center;
}
.tip-url {
    width: 150px;
    margin-right: 5px;
}
.tip-wrap .el-input__inner {
    padding: 0 3px;
}
.qrcode {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
}
.qrcode img {
    border: 1px solid #ddd;
}
.qrcode-download {
    cursor: pointer;
    color: #409EFF;
}
</style>
