<template>
  <div class="wrap">
    <el-container>
      <el-header>
        <el-row class="" type="flex" align="middle">
          <el-col :span="10" >
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                微页面
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                发布微页面
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="14" class="button-group">
            <el-button type="primary" @click="goList">查看列表</el-button>
            <el-button type="text" icon="el-icon-question" class="help-icon">使用帮助</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="content">
          <div class="main-container">
            <el-row>
              <el-col :span="14">
                <div class="phone">
                  <div
                    v-if="pageJson"
                    class="phone-view-container"
                    :style="{
                      width: `${pageJson.page.phoneWidth}px`,
                      height: `${pageJson.page.phoneHeight + HeadHeight}px`
                  }"
                  >
                    <phone-view
                      :url="realUrl"
                      :pageJson="pageJson"
                      :HeadHeight="HeadHeight"
                    ></phone-view>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="qrcode">
                  <div class="text">发布成功：</div>
                  <qr-code :url="realUrl" footer="扫码预览" class="qr-code-content"></qr-code>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import * as service from '../../service';
import PhoneView from '../../components/PhoneView.vue';
import QrCode from '../../components/QrCode.vue';

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
  async mounted() {
    try {
      const { data: { public: formal } } = await service.getPageInfo(this.pageId);
      this.pageJson = JSON.parse(formal);
      if (!this.pageJson) {
        this.$router.replace('/error');
      }
    } catch (error) {
      console.error(error.message);
      this.$router.replace('/error');
    }
  },
  methods: {
    goList() {
      this.$router.push('/manage');
    },
  },
  computed: {
    pageId() {
      return this.$route.query.page_id;
    },
    realUrl() {
      return `http://${window.location.host}/we/view?page_id=${this.pageId}&is_formal=1`;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../preview/style.less';

</style>

