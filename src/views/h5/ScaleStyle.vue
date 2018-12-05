<template>
    <div class="container" :id="component.componentId" :style="containerStyle(component)">
      <slot name="formItem" />
    </div>
</template>

<script>
import generate from 'nanoid/generate';

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

