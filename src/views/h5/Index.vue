<template>
<div>
  <div
    v-if="pageJson && !showError"
    class="wrap"
    :style='{ height: `${pageJson.page.phoneHeight}px` }'
  >
      <custom-component
        v-if="finalComponentsJson"
        v-for="(component, index) in finalComponentsJson"
        :key="index"
        :component="component"
      >
      </custom-component>
      <div class="bottom-download"></div>
    </div>
    <error v-else></error>
  </div>
</template>
<script>
import share from '@/assets/javascript/share';
import { sortBy, map } from 'lodash';
import jssdk from 'meetyou.jssdk';
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
      const scale = window.innerWidth / this.pageJson.page.phoneWidth;
      finalComponentsJson = map(finalComponentsJson, (componentJson) => {
        const componentJsonTemp = {
          ...componentJson,
          location: {
            x: componentJson.location.x * scale,
            y: componentJson.location.y * scale,
          },
          size: {
            w: componentJson.size.w * scale,
            h: componentJson.size.h * scale,
          },
          style: {
            width: '100%',
            height: '100%',
            'font-size': componentJson.fontSize
              ? `${componentJson.fontSize * scale}px`
              : '',
            ...componentJson.style,
          },
        };
        return componentJsonTemp;
      });
      return finalComponentsJson;
    },
    initShare() {
      const fromURL = `${window.location.host}/we/view?page_id=${
        this.pageId
      }&is_formal=${this.isFormal}&isShare=1`;
      const { shareDec, shareImg, shareTitle } = this.pageJson.page;
      jssdk.registerTopbarRightButton(
        {
          image:
            'http://static.seeyouyima.com/news-node.seeyouyima.com/right_bar_and-de8fcdd4a49b2f45b3fdfa238bf8b143.png',
        },
        () => {
          jssdk.share({
            title: shareTitle,
            content: shareDec,
            imageURL: shareImg,
            fromURL,
          });
        },
      );

      if (this.$route.query && this.$route.query.isShare) {
        share(
          'https://news-node.seeyouyima.com/article?news_id=26760893&news_type=2&appid=1&v=6.7.0',
          {
            android: 'http://yangmao-download.seeyouyima.com/ymsq31.apk',
            ios: 'https://itunes.apple.com/cn/app/id1412667195?mt=8',
            weixin: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meiyou.sheep',
          },
        );
      }
    },
  },
  components: {
    CustomComponent,
    Error,
  },
  async mounted() {
    try {
      const { data: { draft, public: formal } } = await service.getPageInfo(this.pageId);
      this.pageJson = JSON.parse(this.isFormal === '1' ? formal : draft);
      if (!this.pageJson) {
        this.showError = true;
      }
      this.finalComponentsJson = this.getFinalComponentsJson();
      document.title = this.pageJson.page.title;
      this.$nextTick(this.initShare);
    } catch (error) {
      console.error(error);
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

