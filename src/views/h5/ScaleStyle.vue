<template>
    <div class="container" :id="component.componentId" :style="containerStyle(component)">
        <slot name="formItem" />
    </div>
</template>

<script>
import generate from 'nanoid/generate';
import hotSpot from '../../util/hotSpot.js';
import AudioPlay from '../../components/editor/dragSetting/upload/audioPlay';
import gaReport from '../../util/gaReport.js';
import wText from '../../components/element/wtext';
import wTextarea from '../../components/element/wtextarea';
import wRadio from '../../components/element/wradio';
import wSmscode from '../../components/element/wsmscode';
import wSubmit from '../../components/element/wsubmit';

export default {
  data() {
    const componentId = generate('abcdefghijklmn', 10);
    return {
      componentId,
    };
  },
  props: {
    component: Object,
    scale: Number,
  },
  components: {
    AudioPlay,
    wText,
    wTextarea,
    wRadio,
    wSmscode,
    wSubmit,
  },

  computed: {
  },
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
      gaReport({
        type: 'click',
        value: `${index}` || '0',
        pageId: `weditor_${this.$route.query.page_id}`,
      });
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
  .image[lazy="loading"] {
    background-color: #ddd;
  }
}
</style>

