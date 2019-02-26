<template>
  <div class="ew-header" @click="topBannerClick">
    <div class="ew-header_time">{{this.now}}</div>
    <div class="ew-header_title">{{title}}</div>
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
.ew-header {
  position: absolute;
  width: 375px;
  height: 64px;
  cursor: pointer;
  background: url("../../../assets/images/page_banner.png") no-repeat center
    center;
  background-size: 375px auto;
  z-index: 10;
  .ew-header_time {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    font-family: "Arial";
  }
  .ew-header_title {
    height: 42px;
    padding-left: 60px;
    padding-right: 40px;
    margin-top: 23px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

