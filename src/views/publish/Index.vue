<template>
  <div class="wrap">
    <el-container>
      <nav-bar pageName="发布微页面">
        <template slot="btnGroup">
            <el-button type="primary" @click="goList">查看列表</el-button>
        </template>
      </nav-bar>
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
                      width: `${pageJson.page.phoneWidth || 375}px`,
                      height: `${pageJson.page.phoneHeight + HeadHeight || 603}px`
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
import PhoneView from '@/components/PhoneView.vue';
import QrCode from '@/components/QrCode.vue';
import NavBar from '@/components/NavBar';
import { getPageInfo } from '@/service';

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
    NavBar,
  },
  async mounted() {
    try {
      const { data: { public: formal } } = await getPageInfo(this.pageId);
      if (formal) {
        this.pageJson = JSON.parse(formal);
      } else {
        this.pageJson = {
          page: {
            phoneWidth: 375,
            phoneHeight: 603,
          },
        };
      }
    } catch (error) {
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
      const { protocol, host } = window.location;
      return `${protocol}//${host}/we/view?page_id=${this.pageId}&is_formal=1`;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../preview/style.less';

</style>

