<template>
  <div class="phone-content" ref="phoneContent"
    :style="{width: $store.state.editor.phoneWidth+'px', height: $store.state.editor.phoneHeight+'px'}">
    <drag-text
      v-for="(drag, index) in $store.state.editor.dragTexts"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :location-x="textForm.location.x"
      :location-y="textForm.location.y ? textForm.location.y : drag.y"
      :location-z="drag.zIndex"
      :t-width="dragText.width"
      :t-height="dragText.height"
      :is-active="drag.isActive"
      :dragForm="drag"
      @inputChange="inputChange"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
    />

    <drag-img
      v-for="(drag, index) in $store.state.editor.dragImages"
      :key="drag.zIndex"
      :list-index="index"
      :is-active="drag.isActive"
      v-if="drag.isShow"
      :dragForm="drag"
      @dragDel="dragDel"
    />

    <drag-link
      v-for="(drag, index) in $store.state.editor.dragLinks"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :location-x="0"
      :location-y="drag.y"
      :location-z="drag.zIndex"
      :t-width="dragLink.width"
      :t-height="dragLink.height"
      :is-active="drag.isActive"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
    />

    <drag-image-lists
      v-for="(drag, index) in $store.state.editor.dragImageLists"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :location-x="0"
      :location-y="drag.y"
      :location-z="drag.zIndex"
      :t-width="dragImg.width"
      :t-height="dragImg.height"
      :is-active="drag.isActive"
      @dragDel="dragDel"
    />

    <drag-video
      v-for="(drag, index) in $store.state.editor.dragVideos"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :location-x="0"
      :location-y="drag.y"
      :location-z="drag.zIndex"
      :t-width="dragVideo.width"
      :t-height="dragVideo.height"
      :is-active="drag.isActive"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
    />

    <drag-audio
      v-for="(drag, index) in $store.state.editor.dragAudios"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :location-x="0"
      :location-y="drag.y"
      :location-z="drag.zIndex"
      :t-width="dragAudio.width"
      :t-height="dragAudio.height"
      :is-active="drag.isActive"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
    />

    <!-- setting  -->

    <drag-text-setting
      v-if="$store.state.editor.textSet"
      :dragForm="this.$store.state.editor.dragTexts[this.$store.state.editor.textActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-img-setting
      v-if="$store.state.editor.imgSet"
      :dragForm="this.$store.state.editor.dragImages[this.$store.state.editor.imgActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-video-setting
      v-if="$store.state.editor.videoSet"
      :dragForm="this.$store.state.editor.dragVideos[this.$store.state.editor.videoActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @videoSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-audio-setting
      v-if="$store.state.editor.audioSet"
      :dragForm="this.$store.state.editor.dragAudios[this.$store.state.editor.audioActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @audioSourceChange="sourceChange"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />

    <drag-link-setting
      v-if="$store.state.editor.linkSet"
      :dragForm="this.$store.state.editor.dragLinks[this.$store.state.editor.linkActive]"
      :setForm="settingForm"
      @setting-fixed="settingFixed"
      @input-locationChange="inputLocationChange"
      @input-sizeChange="inputSizeChange"
    />
  </div>
</template>

<script>
import dragText from '@/components/editor/dragItem/dragText';
import dragImg from '@/components/editor/dragItem/dragImg';
import dragLink from '@/components/editor/dragItem/dragLink';
import dragImageLists from '@/components/editor/dragItem/dragImgLists';
import dragVideo from '@/components/editor/dragItem/dragVideo';
import dragAudio from '@/components/editor/dragItem/dragAudio';

import dragTextSetting from '@/components/editor/dragSetting/dragTextSetting';
import dragImgSetting from '@/components/editor/dragSetting/dragImgSetting';
import dragLinkSetting from '@/components/editor/dragSetting/dragLinkSetting';
import dragVideoSetting from '@/components/editor/dragSetting/dragVideoSetting';
import dragAudioSetting from '@/components/editor/dragSetting/dragAudioSetting';

export default {
  name: 'layoutMain',
  props: {
  },
  components: {
    dragText,
    dragImg,
    dragLink,
    dragImageLists,
    dragVideo,
    dragAudio,
    dragTextSetting,
    dragImgSetting,
    dragLinkSetting,
    dragVideoSetting,
    dragAudioSetting,
  },
  data() {
    return {
      phoneWidth: 385, // 可视区宽高
      phoneHeight: 750,
      dragText: {
        width: 375,
        height: 90,
      },
      dragImg: {
        width: 375,
        height: 300,
      },
      dragLink: {
        width: 100,
        height: 30,
      },
      dragVideo: {
        width: 375,
        height: 300,
      },
      dragAudio: {
        width: 375,
        height: 64,
      },
      layerActive: 0,
      textForm: {
        content: '哈哈哈哈',
        fontSize: '12px',
        textAlign: 'left',
        textColor: 'rgba(19, 206, 102, 0.8)',
        location: {
          x: 0,
          y: this.$store.state.editor.phoneHeight / 2 - 30 / 2,
        },
        size: {
          w: 375,
          h: 90,
        },
      },
      imgForm: {
        img: '',
      },
      linkForm: {
        appLink: 'http://',
        outLink: 'http://',
        location: {
          x: 0,
          y: 0,
        },
        size: {
          w: 100,
          h: 30,
        },
      },
      videoForm: {
        sourceType: '1', // 1.本地视频 2.在线视频
        source: 'http://',
        audioTitle: '',
        loop: true,
        location: {
          x: 0,
          y: 0,
        },
        size: {
          w: 375,
          h: 300,
        },
      },
      audioForm: {
        sourceType: '1', // 1.本地音频 2.在线音频
        source: 'http://',
        audioTitle: '',
        loop: true,
        location: {
          x: 0,
          y: 0,
        },
        size: {
          w: 375,
          h: 65,
        },
      },
      settingForm: {
        location: {
          x: 700,
          y: 65,
        },
      },
    };
  },
  methods: {
    sourceChange(type, form, active) {
      this.$store.state.editor[form][this.$store.state.editor[active]].sourceType = type;
    },
    inputChange(text) { // 组件-文本值改变
      this.textForm.content = text;
    },
    inputLocationChange(form, val, active) { // 设置-文本组件位置变化
      // if (type === 1) {
      //   this[from].location.x = val;
      // } else {
      //   this[from].location.y = val;
      // }
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].location = val;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    inputSizeChange(form, val, active) {
      const dragItems = this.$store.state.editor[form];
      dragItems[this.$store.state.editor[active]].size = val;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    inputDragStop(form, ev, index) { // 拖动组件同步设置
      const dragItems = this.$store.state.editor[form];
      const dragItem = dragItems[index];
      dragItem.size.w = ev.width;
      dragItem.size.h = ev.height;
      dragItem.location.y = ev.top;
      dragItem.location.x = ev.left;
      dragItems[index] = dragItem;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    settingFixed() { // 锁定设置
      this.settingForm.location.x = 600;
      this.settingForm.location.y = 66;
    },
    dragDel(s, n) { // 删除当前编辑组件
      const { editor } = this.$store.state;
      let { layerActive, layerLists, typeCat } = editor;
      if (layerLists.length) {
        const sort = s || layerLists[layerActive].sort;
        const num = n || layerLists[layerActive].num;
        const cat = typeCat[sort];
        editor[cat[0]] = editor[cat[0]].filter((item, key) => key !== num);
        editor[cat[2]] = false;
        if (!editor[cat[0]].length) {
          editor[cat[1]] = false;
        }
        layerLists = editor[cat[0]].filter((item, key) => key !== layerActive);
        editor.layerLists = layerLists;
        this.$store.commit('editor_update', editor);
      }
    },
  },
  created() {
  },
};
</script>

<style>
.setting-content {
  position: fixed;
  top: 66px;
  bottom: 10px;
  right: 266px;
  width: 260px;
  z-index: 1001;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 -2px 20px 0 rgba(39, 54, 78, 0.11);
  visibility: hidden;
}
.setting-show{
  visibility: visible;
}
.drag-item {
  position:absolute;
}
</style>
