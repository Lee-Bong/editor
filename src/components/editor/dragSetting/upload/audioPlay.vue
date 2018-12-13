<template>
  <div class="audio-upload-item" :class="[isBorder === '1' ?  'isBorder' : '']">
    <span class="audio-title">{{play.title}}</span>
    <div class="paly-control">
      <div class="icons">
        <el-button class="paly-icon paly" v-if="!isPlay || !play.isUplaod"
          :type="!play.isUplaod ? 'info' : 'primary'" icon="iconfont ed-icon-paly"
          circle :disabled="!play.isUplaod" plain @click="audioPlay"></el-button>
          <el-button class="paly-icon" v-if="isPlay && play.isUplaod && isLoad" type="primary"
        icon="iconfont ed-icon-zanting" circle @click="audioPause"></el-button>
        <el-button class="paly-icon" v-if="isPlay && play.isUplaod && !isLoad" type="primary"
        icon="el-icon-loading" circle @click="audioPause"></el-button>
      </div>
      <div class="paly-precent">
        <el-slider v-model="playPrecent" :format-tooltip="formatTooltip"
         :disabled="!play.isUplaod" @change="precentChange"></el-slider>
      </div>
      <div class="play-time">{{showPre + '/'+play.duration}}</div>
    </div>
    <audio controls="controls" ref="aduioObj" preload="auto" v-show="false"
     :src="play.url" :loop="play.loop">
    </audio>
  </div>
</template>

<script>
import { formatSecond } from '@/util/tools';

export default {
  name: 'audioPlay',
  props: {
    play: Object,
    isBorder: String,
  },
  data() {
    return {
      isPlay: false,
      playPrecent: 1,
      showPre: '00:00',
      isEnd: false,
      isLoad: false, // 默认提示音频加载中
    };
  },
  mounted() {
    this.audioUpdate();
  },
  methods: {
    audioPlay() {
      this.isPlay = true;
      this.$refs.aduioObj.play();
    },
    audioPause() {
      this.isPlay = false;
      this.$refs.aduioObj.pause();
    },
    audioUpdate() {
      const ele = this;
      this.$refs.aduioObj.addEventListener('timeupdate', () => {
        if (ele.isEnd || !ele.isPlay || parseInt(ele.playPrecent, 10) === 100) return false;
        const palyTime = ele.$refs.aduioObj.currentTime;
        const totalTime = ele.play.second;
        const precent = (Math.floor(palyTime) / Math.floor(totalTime)) * 100;
        ele.playPrecent = precent;
        ele.showPre = formatSecond(palyTime);
        if (parseInt(ele.playPrecent, 10) === 100 && ele.play.loop) {
          ele.$refs.aduioObj.currentTime = 0;
          ele.playPrecent = 0;
        }
      }, false);
      this.$refs.aduioObj.addEventListener('ended', () => {
        ele.$refs.aduioObj.currentTime = 0;
        ele.playPrecent = 0;
        if (!ele.play.loop) {
          ele.isEnd = true;
          ele.isPlay = false;
          ele.showPre = '00:00';
        }
      }, false);

      this.$refs.aduioObj.addEventListener('waiting', () => {
        if (this.isLoad) this.isLoad = false;
      });
      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        this.$refs.aduioObj.addEventListener('playing', () => {
          if (!this.isLoad) this.isLoad = true;
        });
        this.$refs.aduioObj.addEventListener('canplay', () => {
          this.isLoad = true;
        });
      } else {
        this.$refs.aduioObj.addEventListener('canplaythrough', () => {
          this.isLoad = true;
        });
      }
    },
    formatTooltip(val) {
      return formatSecond((this.play.second * val) / 100);
    },
    precentChange(val) { // 拖动滑块改变播放进度
      this.isChange = true;
      this.playPrecent = val;
      this.showPre = formatSecond((this.play.second * val) / 100);
      this.$refs.aduioObj.currentTime = (this.play.second * val) / 100;
    },

  },
};
</script>

<style>
.audio-upload-item {
  position: relative;
  min-height: 80px;
}
.isBorder {
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.audio-title {
  height: 16px;
  font-size: 12px;
  margin-left: 50px;
  display: block;
  margin-top: 10px;
  padding-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
}
.paly-icon {
  width: 42px;
  height: 42px;
  overflow: hidden;
  position: absolute;
  z-index: 12;
}
.paly-icon .el-icon-loading {
  font-size: 16px
}
.icons {
  height: 40px;
  width: 40px;
}
.paly-control {
  /* height: 50px; */
  display: flex;
  padding: 5px 15px;
  align-items: center;
  justify-content: space-between;
}
.paly-precent {
  flex: 1;
  margin-left: 10px;
}
.icons {
  flex-basis: 40px;
}
.paly-precent .el-slider__bar,
.paly-precent .el-slider__runway {
  height: 4px;
}
.paly-precent .el-slider__button {
  height: 10px;
  width: 10px;
  border-width: 1px;
}
.play-time {
  font-size: 13px;
  margin-left: 15px;
}
.iconfont.ed-icon-paly {
  margin-left: 2px;
}
</style>
