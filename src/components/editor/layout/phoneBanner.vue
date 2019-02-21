<template>
  <div class="top-banner" @click="topBannerClick">
    <div class="now-show">{{this.now}}</div>
    <div class="web-title">{{title}}</div>
  </div>
</template>

<script>
import { nowTime } from '@/util/tools';

export default {
  props: {
    topBannerClick: {
      type: Function,
      default: () => {},
    },
    title: String,
  },
  data() {
    return {
      now: '00:00 AM',
      nowTimer: null,
    };
  },
  created() {
    this.now = nowTime();
    this.nowTimer = setInterval(() => {
      this.now = nowTime();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.nowTimer);
  },
};
</script>

<style lang="less" scoped>
.top-banner {
  cursor: pointer;
  background: url("../../../assets/images/page_banner.png") no-repeat center
    center;
  background-size: 375px auto;
  z-index: 10;
  position: absolute;
  width: 375px;
  height: 64px;
  .now-show {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    font-family: "Arial";
  }
  .web-title {
    height: 42px;
    color: #fff;
    font-size: 16px;
    margin-top: 23px;
    line-height: 42px;
    padding-left: 60px;
    padding-right: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>

