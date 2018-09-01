<template>
    <div>
        <div class="header" :style='{ height: `${HeadHeight}px` }'>
            <div class="title">{{pageJson.page.title}}</div>
        </div>
        <div
            class="content-container"
            :style="{ height: `${pageJson.page.phoneHeight}px` }"
        >
            <iframe src="http://localhost:8080/#/real" frameborder="no" class="frame"/>
        </div>
    </div>
</template>

<script>
export default {
  props: ['pageJson', 'HeadHeight'],
};
</script>

<style lang="less" scoped>
.header {
  background: url('../../assets/images/page_banner.png') no-repeat center center;
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
  .frame {
      width: 100%;
      height: 100%;
  }
}
</style>

