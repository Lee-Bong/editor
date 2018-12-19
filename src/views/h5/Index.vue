<template>
<div>
  <div
    v-if="pageJson && !showError"
    class="wrap"
    :style='{ height: `${scale * parseInt(pageJson.page.phoneHeight)}px`,
    backgroundColor: pageJson.page.backgroundColor || "#fff" }'
  >
      <custom-component
        v-if="customComponentsJson && customComponentsJson.length"
        v-for="(component, index) in customComponentsJson"
        :key="index"
        :component="component"
        :scale="scale"
      >
      </custom-component>
      <form-component
        v-if="formComPonentsJson && formComPonentsJson.length"
        :form="formComPonentsJson"
        :scale="scale"
        :isStopCollect="isStopCollect"
      >
      </form-component>
    </div>
    <error v-if="showError"></error>
  </div>
</template>
<script>
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import jssdk from 'meetyou.jssdk';
import { getPageInfo } from '@/service';
import hotSpot from '@/util/hotSpot';
import gaReport from '@/util/gaReport.js';
import { init } from '@/util/sdkRequest.js';
import CustomComponent from './CustomComponent';
import FormComponent from './FormComponent';
import Error from '../Error';

export default {
  data() {
    return {
      pageJson: null,
      // 经过计算转换过的结构
      customComponentsJson: null,
      formComPonentsJson: null, // 表单组件
      showError: false,
      // 屏幕缩放比例
      scale: 1,
      form: {},
      code: '',
      isStopCollect: false,
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
      const cjson = sortBy(this.pageJson.components, [
        item => item.location.y,
      ]);
      // 屏幕缩放比例
      this.scale = window.innerWidth / this.pageJson.page.phoneWidth;
      const formComPonentsJson = [];
      const customComponentsJson = [];
      map(cjson, (componentJson) => {
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
        if (componentJsonTemp.isForm) {
          formComPonentsJson.push(componentJsonTemp);
        } else {
          customComponentsJson.push(componentJsonTemp);
        }
        return formComPonentsJson;
      });
      return { formComPonentsJson, customComponentsJson };
    },
    initShare() {
      const fromURL = `${window.location.protocol}//${window.location.host}/we/view?page_id=${
        this.pageId
      }&is_formal=${this.isFormal}`;
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
          }, () => {
            gaReport({
              type: 'share',
              pageId: `weditor_${this.$route.query.page_id}`,
            });
          });
        },
      );
    },
  },
  components: {
    CustomComponent,
    FormComponent,
    Error,
  },
  async mounted() {
    try {
      const {
        data: {
          draft, public: formal, visible, forms, draft: intend,
        },
      } = await getPageInfo(this.pageId);
      if ((this.$route.query.is_formal && (!visible || !formal)) ||
       (!this.$route.query.is_formal && !intend)) {
        this.showError = true;
      }
      this.pageJson = JSON.parse(this.isFormal === '1' ? formal : draft);
      if (forms && forms.length) {
        this.isStopCollect = forms[0].stop_collect;
      }
      const cjson = this.getFinalComponentsJson();
      this.customComponentsJson = cjson.customComponentsJson;
      this.formComPonentsJson = cjson.formComPonentsJson;
      const {
        shareDec, shareImg, shareTitle, title, code,
      } = this.pageJson.page;
      this.code = code;
      document.title = title;
      jssdk.callNative('topbar/title', { title });


      // 初始化app内分享
      this.$nextTick(() => {
        this.initShare();
        hotSpot.wxShare({
          title: shareTitle || title,
          desc: shareDec,
          imgUrl: shareImg,
        });
        // 执行自定义代码
        if (this.code) {
          const { query } = this.$route;
          this.scale = window.innerWidth / this.pageJson.page.phoneWidth;
          init(this.code, query, this.scale);
        }
      });
    } catch (error) {
      this.showError = true;
    }
    if (this.$route.query.is_formal) {
      gaReport({
        type: 'pv',
        pageId: `weditor_${this.$route.query.page_id}`,
      });
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

