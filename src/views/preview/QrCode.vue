<template>
    <div>
        预览页面：
        <div class="qr-code-container">
          <div class="url">
            <div class="text">
              {{url}}
            </div>
            <div>
              <el-button
                class="copy-btn"
                size="mini"
                type="primary"
                :data-clipboard-text="url"
              >复制</el-button>
            </div>
          </div>
          <div class="qrcode" ref="qrCode"></div>
          <div class="tip">扫码预览</div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      url: 'http://192.168.45.37:8080/#/real',
    };
  },
  mounted() {
    // 初始化二维码
    this.createQrCode();
    // 初始化复制面板
    const copyBtn = new Clipboard('.copy-btn');
    // 复制成功后执行的回调函数
    copyBtn.on('success', () => {
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success',
      });
    });
  },
  methods: {
    createQrCode() {
      const qr = new QRCode(this.$refs.qrCode, {
        text: this.url,
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
      return qr;
    },
  },
};
</script>

<style lang="less" scoped>
.qr-code-container {
  width: 250px;
  padding: 20px 10px;
  border: 1px solid #eee;
  border-radius: 2px;
  .url {
    display: flex;
    margin-bottom: 40px;
    .text {
      padding: 2px;
      width: 200px;
      margin-right: 10px;
      overflow: hidden;
      border: 1px solid #000;
    }
  }
  .qrcode {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .tip {
    text-align: center;
    color: #409eff;
  }
}
</style>

