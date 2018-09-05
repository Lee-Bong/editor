<template>
<div class="audio-upload-item">
  <span class="audio-title" >{{play.title}}</span>
  <div class="paly-control">
    <div class="icons">
        <el-button class="paly-icon paly" v-if="!isPlay" type="primary" icon="el-icon-caret-right" circle
        @click="audioPlay"></el-button>
        </div>
        <el-button class="paly-icon" v-if="isPlay" type="primary" icon="el-icon-message" circle
        @click="audioPause"></el-button>
        <div class="paly-precent">
          <el-slider v-model="playPrecent"></el-slider>
        </div>
        <div class="play-time">{{this.showPre}}</div>
    </div>
        <audio autoplay="autoplay"
          controls="controls"
          ref="aduioObj"
          preload="auto"
          v-show="false"
          :src="play.url"
        >
        </audio>
</div>
</template>

<script>
import oss from '@/util/oss';
export default {
  name: 'HelloWorld',
  props: {
    play: Object,
  },
  data() {
    return {
isPlay: true,
playPrecent: 1
    };
  },
  mounted() {
    this.audioUpdate();
  },
  methods: {
    audioPlay() {
      alert('sss');
      this.isPlay = true;
      this.$refs.aduioObj.play();
    },
    audioPause() {
      this.isPlay = false;
      this.$refs.aduioObj.pause();
    },
    audioUpdate() {
      var _this = this;
      this.$refs.aduioObj.addEventListener('timeupdate',function() {
        if (!_this.isPlay || parseInt(_this.playPrecent) === 100) return false;
        let palyTime = _this.$refs.aduioObj.currentTime;
        let totalTime = _this.play.second;
        let precent = (Math.floor(palyTime) / Math.floor(totalTime)) * 100;
        _this.playPrecent = precent;
        _this.showPre = parseInt(palyTime / 60) + ':' + parseInt(palyTime % 60) + '/'+_this.play.duration
        if (parseInt(_this.playPrecent) === 100) {
          // this.
        }
      },false);
    },
  },
};
</script>

<style>
.audio-upload-item {
  position: relative;
  min-height: 82px;
}
 .audio-title {
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
  position: absolute;
  z-index: 12;
  
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
  .paly-precent .el-slider__bar, .paly-precent .el-slider__runway {
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
</style>
