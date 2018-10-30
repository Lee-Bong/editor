<template>
    <div
        class="container"
        :id="componentId"
        :style="{
            position: component.isFixed ? 'fixed' : 'absolute',
            top: `${component.location.y}px`,
            left: `${component.location.x}px`,
            width: `${component.size.w}px`,
            height: `${component.size.h}px`,
            'z-index': component.style['z-index'] || 0
    }"
    >
        <div
          v-if="component.type === 1"
          :style="component.style"
          v-html="component.content"
          style="white-space: pre-wrap"
        >
        </div>
        <img
            v-if="component.type === 2"
            :style="component.style"
            v-lazy="transformImgUrl(component.url, component.size.h, component.size.w)"
            class="image"
        />
        <div
            v-if="component.type === 3"
            class="link"
            :style="component.style"
            @click="handleLinkClick(component.key)"
        >
        </div>
        <div
            v-if="component.type === 4"
            :style="component.style"
        >
            <img
                v-for="(image, index) in component.imgList"
                :key="index"
                v-lazy="transformImgUrl(image.url, image.size.h * scale, image.size.w * scale)"
                :style="{
                    height: `${image.size.h * scale}px`,
                    width: `${image.size.w * scale}px`,
                }"
                class="image"
                alt=""
            />
        </div>
        <video
            v-if="component.type === 5"
            :style="component.style"
            :src="component.source"
            :poster="component.poster"
            :loop="component.loop"
            controls="controls"
            webkit-playsinline
            playsinline
            x5-playsinline
        />
        <audio-play
            v-if="component.type === 6"
            :style="component.style"
            :play="component.play"
        ></audio-play>
    </div>
</template>

<script>
import jssdk from 'meetyou.jssdk';
import generate from 'nanoid/generate';
import awakeApp from '../../util/awakeApp.js';
import AudioPlay from '../../components/editor/dragSetting/upload/audioPlay';

export default {
  data() {
    const componentId = generate('abcdefghijklmn', 10);
    return {
      componentId,
      sharebar: null,
    };
  },

  components: {
    AudioPlay,
  },

  computed: {
    downloadUrls() {
      const {
        iosLink, andLink, yybLink,
      } = this.component;
      return {
        android: andLink,
        ios: iosLink,
        yyb: yybLink,
      };
    },
  },

  mounted() {
    const {
      type, sourceType, awakeLink,
    } = this.component;
    // 如果是热区且在分享页唤起app
    if (type === 3 && sourceType === '2' && this.$route.query.isShare) {
      this.sharebar = awakeApp.init({
        link: awakeLink,
        container: `#${this.componentId}`,
        downloadUrls: this.downloadUrls,
      });
    }
  },
  props: ['component', 'scale'],
  methods: {
    transformImgUrl(url, h, w) {
      let optUrl = url.replace(/^https?:/, '');
      optUrl += `?x-oss-process=image/resize,m_fixed,h_${Math.ceil(h * 2)},w_${Math.ceil(w * 2)}`;
      return optUrl;
    },
    handleLinkClick(index) {
      // 这里有四种组合：app内跳转，分享页面跳转，app内唤起，分享页面
      const {
        sourceType, awakeLink, outLink, appLink,
      } = this.component;
      if (!this.$route.query.isShare) {
        this.gaReport('click', `${index}` || '0');
      }
      if (sourceType === '1') {
        // 普通跳转
        /* if (this.$route.query.isShare) {
          // 分享出去的页面
          window.location.href = outLink;
        } else {
          // 应用内跳转
          jssdk.callNative('web', {
            url: appLink,
          });
        } */

        window.location.href = this.$route.query.isShare ? outLink : appLink;
      } else if (this.$route.query.isShare) {
        // 分享页面唤起app
        awakeApp.handleOpen(this.sharebar);
      } else {
        // app内唤起app
        jssdk.callNative('open', { url: awakeLink }, (path, data) => {
          if (!data) {
            // 打开失败，跳转下载应用
            const download = awakeApp.getDownLoadUrl(this.downloadUrls);
            if (!download) {
              return awakeApp.showDownLoadTip();
            }
            window.location.href = download;
          }
        });
      }
    },
    gaReport(type, value) {
      jssdk.callNative('ga', {
        path: '/bfe_event',
        params: Object.assign({
          page_id: `weditor_${this.$route.query.page_id}`,
          label: '',
          category: '',
        }, {
          type,
          value,
        }),
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .link {
    cursor: pointer;
  }
  .image {
    display: block;
  }
  .image[lazy=loading] {
    background-color: #ddd
  }
}
</style>

