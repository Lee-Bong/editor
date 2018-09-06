<template>
  <div class="wrap">
    <el-container>
      <el-header>
        <el-row class="header-flex">
          <el-col :span="10" type="flex" >
          <el-breadcrumb separator="/" type="flex">
            <el-breadcrumb-item>
              微页面
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              预览微页面
            </el-breadcrumb-item>
          </el-breadcrumb>
          </el-col>
          <el-col :span="14">
            <el-button @click="goEditor">继续编辑</el-button>
            <el-button type="primary" class="publish-btn">发布</el-button>
            <el-button type="text" icon="el-icon-question" class="help-icon">使用帮助</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="main-container">
          <el-row>
            <el-col :span="12">
              <div class="phone">
                <div
                  v-if="pageJson"
                  class="phone-view-container"
                  :style="{
                    width: `${pageJson.page.phoneWidth}px`,
                    height: `${pageJson.page.phoneHeight + HeadHeight}px`
                }"
                >
                  <phone-view :pageJson="pageJson" :HeadHeight="HeadHeight"></phone-view>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <qr-code></qr-code>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import mock from '../../mock.json';
import PhoneView from './PhoneView.vue';
import QrCode from './QrCode.vue';

export default {
  data() {
    return {
      pageJson: null,
      // 预览手机头部的高度
      HeadHeight: 64,
    };
  },
  components: {
    PhoneView,
    QrCode,
  },
  mounted() {
    this.pageJson = mock.editor;
  },
  methods: {
    goEditor() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  .el-main{
    padding: 20px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 60px;
    background-color: #eee;
    .main-container {
      padding: 20px;
      background-color: #ffffff;
      .phone {
        display: flex;
        justify-content: center;
        .phone-view-container {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          border: 1px solid #eee;
        }
      }
    }
  }
}
</style>

