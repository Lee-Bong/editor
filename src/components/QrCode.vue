<template>
    <div class="qr-code-container">
      <div class="url">
        <el-input
          :value="url"
          :readonly="true"
          @focus="onUrlFocus"
          size="mini"
        ></el-input>
        <div>
          <el-button
            class="copy-btn"
            ref="copybtn"
            size="mini"
            type="primary"
            :data-clipboard-text="url"
          >复制</el-button>
        </div>
      </div>
      <div class="qrcode" ref="qrCode"></div>
      <div class="tip">
        <span v-if="footer" v-html="footer"></span>
        <a v-else class="qrcode-download" download="二维码">下载二维码</a>
      </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';

export default {
  // footer: 默认为下载链接
  props: ['url', 'qrOption', 'footer'],
  data() {
    return {
      clipboard: null,
    };
  },
  mounted() {
    // 初始化复制面板
    const copyBtn = this.$refs.copybtn.$el;
    this.clipboard = new Clipboard(copyBtn);
    // 复制成功后执行的回调函数
    this.clipboard.on('success', () => {
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success',
      });
    });
    // 初始化二维码
    this.createQrCode();
  },
  destroyed() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  },
  methods: {
    createQrCode() {
      const defaultOption = {
        text: this.url,
        width: 120,
        height: 120,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      };
      const qr = new QRCode(this.$refs.qrCode, {
        ...defaultOption,
        ...this.qrOption,
      });
      if (!this.footer) {
        setTimeout(() => {
          const ele = this;
          const url = ele.$refs.qrCode.children[1].getAttribute('src');
          document
            .getElementsByClassName('qrcode-download')[0]
            .setAttribute('href', url);
        });
      }
      return qr;
    },
    onUrlFocus(e) {
      e.srcElement.select();
    },
  },
};
</script>

<style lang="less" scoped>
.qr-code-container {
  padding: 5px;
  .url {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    .el-input {
      margin-right: 5px;
    }
    .text {
      padding: 2px;
      width: 200px;
      margin-right: 10px;
      overflow: hidden;
      border: 1px solid #000;
      white-space: nowrap;
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
    .qrcode-download {
      color: #409eff;
    }
  }
}
</style>

