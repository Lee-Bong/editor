<template>
    <div v-if="pageJson" class="wrap" :style='{ height: `${pageJson.page.phoneHeight}px` }'>
        <custom-component
            v-for="(component, index) in finalComponentsJson"
            :key="index"
            :component="component"
        ></custom-component>
    </div>
</template>
<script>
import { sortBy, map } from 'lodash';
import CustomComponent from './CustomComponent.vue';
import mock from '../../mock.json';

export default {
  data() {
    return {
      pageJson: null,
      // 经过计算转换过的结构
      finalComponentsJson: null,
    };
  },
  components: {
    CustomComponent,
  },
  mounted() {
    this.pageJson = mock.editor;
    // 按照 y 进行排序
    let finalComponentsJson = sortBy(mock.editor.components, [
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

    this.finalComponentsJson = finalComponentsJson;

    document.title = this.pageJson.page.title;
  },
};
</script>

<style lang="less" scoped>
.wrap {
  overflow: hidden;
  position: relative;
}
</style>

