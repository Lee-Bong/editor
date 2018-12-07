<template>
    <div
      class="container"
      :class="{ 'ipx-padding': isFixed }"
      :style="containerStyle()">
        <div
        :id="component.id"
        v-if="component.type === 1"
        :style="component.style"
        v-html="component.content"
        style="white-space: pre-wrap" >
        </div>
        <img
          :id="component.id"
          v-if="component.type === 2"
          :style="component.style"
          v-lazy="transformImgUrl(component.url, component.size.h, component.size.w)"
          class="image"
        />
        <div
          :id="component.id"
          v-if="component.type === 3"
          class="link"
          :style="component.style"
          @click="handleLinkClick(component.key)"
        >
        </div>
        <div
          :id="component.id"
          v-if="component.type === 4"
          :style="component.style">
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
            :id="component.id"
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
            :id="component.id"
            v-if="component.type === 6"
            :style="component.style"
            :play="component.play"
        ></audio-play>
    </div>
</template>

<script>
import generate from 'nanoid/generate';
import AudioPlay from '@/components/editor/dragSetting/upload/audioPlay';
import hotSpot from '@/util/hotSpot.js';
import gaReport from '@/util/gaReport.js';

export default {
  data() {
    const componentId = generate('abcdefghijklmn', 10);
    return {
      componentId,
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
    isFixed() {
      const {
        positionInfo,
      } = this.component;
      return positionInfo.position !== 'relative';
    },
  },

  props: ['component', 'scale'],
  methods: {
    containerStyle() {
      const {
        size, positionInfo, location,
      } = this.component;
      let style = {
        width: `${size.w}px`,
        height: `${size.h}px`,
        'z-index': this.component.style['z-index'] || 0,
      };
      if (this.isFixed) {
        style = { ...style, position: 'fixed' };
        if (positionInfo.position === 'fixedBottom') {
          style = {
            ...style,
            bottom: `${positionInfo.bottom}px`,
          };
        }
        if (positionInfo.position === 'fixedTop') {
          style = { ...style, top: `${positionInfo.top}px` };
        }
      } else {
        style = {
          ...style,
          position: 'absolute',
          top: `${location.y}px`,
          left: `${location.x}px`,
        };
      }
      return style;
    },
    transformImgUrl(url, h, w) {
      let optUrl = url.replace(/^https?:/, '');
      optUrl += `?x-oss-process=image/resize,m_fixed,h_${Math.ceil(h * 2)},w_${Math.ceil(w * 2)}`;
      return optUrl;
    },
    handleLinkClick(index) {
      const {
        sourceType, awakeLink, outLink, appLink,
      } = this.component;
      if (this.$route.query.is_formal) {
        gaReport({
          type: 'click',
          value: `${index}` || '0',
          pageId: `weditor_${this.$route.query.page_id}`,
        });
      }
      hotSpot.handleClick({
        sourceType,
        awakeLink,
        outLink,
        appLink,
        downloadUrls: this.downloadUrls,
      });
    },
    formSubmit() {
      this.$emit('clickEvent');
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

