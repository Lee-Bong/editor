<template>
  <div class="wrap">
    <el-container>
      <nav-bar pageName="预览微页面">
        <template slot="btnGroup">
            <el-button @click="goEditor">继续编辑</el-button>
            <el-button @click="publish" type="primary" class="ew-publish-btn">发布</el-button>
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
                      width: `${pageJson.page.phoneWidth}px`,
                      height: `${pageJson.page.phoneHeight + HeadHeight}px`
                  }"
                  >
                    <phone-view
                      :pageJson="pageJson"
                      :HeadHeight="HeadHeight"
                      :url="realUrl"
                    >
                    </phone-view>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="qrcode">
                  <div class="text">预览页面：</div>
                  <qr-code :url="realUrl" footer="扫码预览"  class="qr-code-content"></qr-code>
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
import NavBar from '@/components/NavBar';
import PhoneView from '@/components/PhoneView.vue';
import QrCode from '@/components/QrCode.vue';
import { getPageInfo, patchPageInfo } from '@/service';

export default {
  data() {
    return {
      pageJson: null,
      // 预览手机头部的高度
      HeadHeight: 64,
      pageData: null,
    };
  },
  components: {
    PhoneView,
    QrCode,
    NavBar,
  },
  async mounted() {
    try {
      const { data } = await getPageInfo(this.pageId);
      this.pageData = data;
      this.pageJson = JSON.parse(data.draft);
      if (!this.pageJson) {
        this.$router.replace('/error');
      }
    } catch (error) {
      this.$router.replace('/error');
    }
  },
  methods: {
    goEditor() {
      this.$router.push(`/editor?page_id=${this.pageId}`);
    },
    async publish() {
      const draft = JSON.parse(this.pageData.state);
      const state = {
        draft: draft.draft,
        publish: draft.draft,
      };
      try {
        const data = await patchPageInfo(this.pageId, {
          state: JSON.stringify(state),
          draft: '',
          public: this.pageData.draft,
          public_title: this.pageData.draft_title,
          public_name: this.pageData.draft_name,
          visible: true,
        });
        if (data && data.status === 'ok') {
          this.$message({
            message: '发布成功~',
            type: 'success',
          });
          setTimeout(() => {
            this.$router.push(`publish?page_id=${this.pageId}`);
          }, 3000);
        }
      } catch (error) {
        this.$message.error(error.message);
      }
    },
  },
  computed: {
    pageId() {
      return this.$route.query.page_id;
    },
    realUrl() {
      const { protocol, host } = window.location;
      return `${protocol}//${host}/we/view?page_id=${this.pageId}`;
    },
  },
};
</script>

<style lang="less" scoped>
  @import './style.less';
</style>

