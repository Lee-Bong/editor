<template>
<div>
  <div
    v-if="pageJson && !showError"
    class="wrap"
    :style='{ height: `${scale * parseInt(pageJson.page.phoneHeight)}px`,
    backgroundColor: pageJson.page.backgroundColor || "#fff" }'
  >
      <custom-component
        v-if="finalComponentsJson"
        v-for="(component, index) in finalComponentsJson"
        :key="index"
        :component="component"
        :scale="scale"
      >
      </custom-component>
    </div>
    <error v-if="showError"></error>
  </div>
</template>
<script>
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import jssdk from 'meetyou.jssdk';
import awakeApp from '../../util/awakeApp';
import * as service from '../../service';
import CustomComponent from './CustomComponent.vue';
import Error from '../Error.vue';

export default {
  data() {
    return {
      pageJson: null,
      // 经过计算转换过的结构
      finalComponentsJson: null,
      showError: false,
      // 屏幕缩放比例
      scale: 1,
    };
  },
  computed: {
    isFormal() {
      return this.$route.query.is_formal === '1' ? '1' : '0';
    },
    pageId() {
      return this.$route.query.page_id;
    },
  },
  methods: {
    // 对页面数据进行加工转换
    getFinalComponentsJson() {
      // 按照 y 进行排序
      let finalComponentsJson = sortBy(this.pageJson.components, [
        item => item.location.y,
      ]);

      // 屏幕缩放比例
      this.scale = window.innerWidth / this.pageJson.page.phoneWidth;
      finalComponentsJson = map(finalComponentsJson, (componentJson) => {
        const componentJsonTemp = {
          ...componentJson,
          location: {
            x: componentJson.location.x * this.scale,
            y: componentJson.location.y * this.scale,
          },
          size: {
            w: componentJson.size.w * this.scale,
            h: componentJson.size.h * this.scale,
          },
          style: {
            width: '100%',
            height: '100%',
            'font-size': componentJson.fontSize
              ? `${componentJson.fontSize * this.scale}px`
              : '',
            ...componentJson.style,
          },
        };
        return componentJsonTemp;
      });
      return finalComponentsJson;
    },
    initShare() {
      const fromURL = `${window.location.protocol}//${window.location.host}/we/view?page_id=${
        this.pageId
      }&is_formal=${this.isFormal}&isShare=1`;
      const {
        shareDec, shareImg, shareTitle, title,
      } = this.pageJson.page;
      jssdk.registerTopbarRightButton(
        {
          image:
            'http://static.seeyouyima.com/news-node.seeyouyima.com/right_bar_and-de8fcdd4a49b2f45b3fdfa238bf8b143.png',
        },
        () => {
          jssdk.share({
            title: shareTitle || title,
            content: shareDec,
            imageURL: shareImg,
            fromURL,
          });
        },
      );
    },
  },
  components: {
    CustomComponent,
    Error,
  },
  async mounted() {
    try {
      const {
        data: { draft, public: formal },
      } = await service.getPageInfo(this.pageId);
      this.pageJson = JSON.parse(this.isFormal === '1' ? formal : draft);
      if (!this.pageJson) {
        this.showError = true;
      }

      this.finalComponentsJson = this.getFinalComponentsJson();

      const {
        shareDec, shareImg, shareTitle, title,
      } = this.pageJson.page;

      document.title = title;
      jssdk.callNative('topbar/title', { title });

      const { _czc: czc } = window;
      if (this.isFormal && czc) {
        czc.push(['_trackEvent', '页面浏览量', title]);
      }

      // 初始化app内分享
      this.$nextTick(() => {
        this.initShare();
        awakeApp.wxShare({
          title: shareTitle || title,
          desc: shareDec,
          imgUrl: shareImg,
        });
      });
    } catch (error) {
      this.showError = true;
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  overflow: hidden;
  position: relative;
  .bottom-download {
    bottom: 0;
    position: fixed;
    width: 100%;
    border-top: 1px solid #ddd;
  }
}
</style>

