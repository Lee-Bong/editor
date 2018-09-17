<template>
    <div
        class="container"
        :id="componentId"
        :style="{
            top: `${component.location.y}px`,
            left: `${component.location.x}px`,
            width: `${component.size.w}px`,
            height: `${component.size.h}px`
    }"
    >
        <div
          v-if="component.type === 1"
          :style="component.style"
        >
            {{component.content}}
        </div>
        <img
            v-if="component.type === 2"
            :style="component.style"
            :src="component.url"
        />
        <div
            v-if="component.type === 3"
            :style="component.style"
            :href="component.appLink"
            class="link"
            @click="handleLinkClick()"
        >
        </div>
        <div
            v-if="component.type === 4"
            :style="component.style"
            :src="component.url"
        >
            <img
                v-for="(image, index) in component.imgList"
                :key="index"
                :src="image.url"
                :style="{
                    height: image.size.w * scale,
                    width: image.size.h * scale
                }"
                alt=""
            />
        </div>
        <video
            v-if="component.type === 5"
            :style="component.style"
            :src="component.source"
            controls="controls"
        />
        <audio
            v-if="component.type === 6"
            :style="component.style"
            :src="component.source"
            controls="controls"
        />
    </div>
</template>

<script>
import jssdk from 'meetyou.jssdk';
import nanoid from 'nanoid';
import * as awakeApp from '../../util/awakeApp.js';

export default {
  data() {
    const componentId = nanoid();
    return {
      componentId,
    };
  },
  props: ['component', 'scale'],
  methods: {
    handleLinkClick() {
    // 这里有四种组合：app内跳转，分享页面跳转，app内唤起，分享页面
      const {
        sourceType, awakeLink, outLink, appLink, iosLink, andLink, yybLink,
      } = this.component;
      const downloadUrls = {
        android: andLink,
        ios: iosLink,
        yyb: yybLink,
      };
      if (sourceType === '1') {
        // 普通跳转
        if (this.$route.query.isShare) {
          // 分享出去的页面
          window.location.href = outLink;
        } else {
          // 应用内跳转
          jssdk.callNative('web', {
            url: appLink,
          });
        }
      } else if (this.$route.query.isShare) {
        // 分享页面唤起app
        const sharebar = awakeApp.init({
          link: awakeLink,
          container: `#${this.commentId}`,
          downloadUrls,
        });
        awakeApp.handleOpen(sharebar);
      } else {
        // app内唤起app
        jssdk.callNative('open', { url: awakeLink }, (path, data) => {
          if (!data) {
            // 打开失败，跳转下载应用
            const download = awakeApp.getDownLoadUrl(downloadUrls);
            if (!download) {
              return awakeApp.showDownLoadTip();
            }
            window.location.href = download;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  .link {
    cursor: pointer;
  }
}
</style>

