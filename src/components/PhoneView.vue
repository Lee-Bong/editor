<template>
    <div>
        <!-- <div class="header" :style='{ height: `${HeadHeight}px` }'>
            <div class="title">{{pageJson.page.title}}</div>
        </div> -->
        <phone-banner :title="pageJson.page.title"/>

        <div
            class="content-container"
            :style="{ height: `${pageJson.page.phoneHeight}px` }"
        >
            <iframe :src="url" frameborder="no" class="frame"/>
        </div>
    </div>
</template>

<script>
import phoneBanner from '@/components/editor/layout/phoneBanner';


export default {
  components: { phoneBanner },
  props: ['pageJson', 'HeadHeight', 'url'],
};
</script>

<style lang="less" scoped>
.header {
  background: url('../assets/images/page_banner.png') no-repeat center center;
  background-size: 375px auto;
  .title {
      position: relative;
      left: 162px;
      top: 30px;
      color: #ffffff;
  }
}
.content-container {
  position: relative;
  overflow: hidden;
  padding-top: 64px;
  .frame {
      width: 100%;
      height: 100%;
  }
}
</style>

