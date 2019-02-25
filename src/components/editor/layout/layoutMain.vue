<template>
  <vue-drag-resize class="phone-content" ref="phoneContent" :sticks="['bm']"
    :h="page.phoneHeight" :isActive="true" :isDraggable="false"
    :isResizable="true" :parentLimitation="false" :preventActiveBehavior="true"
    :y="64" axis="y" @resizestop="resizestop"
    :minh='page.screenHeight'
    :style="{
    width: page.phoneWidth+'px',
  }">
    <div class="phone-resize">
      <i class="el-icon-back resize-icon resize-up"></i>
      拖动调节页面高度
      <i class="el-icon-back resize-icon resize-down"></i>
    </div>
    <div class="drag-items" :style="{
      height: page.phoneHeight + 'px',
      background: page.backgroundColor === '#fff' ? 'rgba(0, 0, 0, 0)': page.backgroundColor}">
      <div v-for="(dragList, index) in evtList" :key="index">
        <div v-if="$store.state.editor[dragList] && $store.state.editor[dragList].length">
          <drag-list :drag-list="$store.state.editor[dragList]" />
        </div>
      </div>
    </div>
  </vue-drag-resize>
</template>

<script>
import dragList from '@/components/editor/layout/dragList';
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'layoutMain',
  components: {
    dragList,
  },
  data() {
    return {
      evtList: ['dragTexts', 'dragImages', 'dragLinks',
        'dragImgLists', 'dragVideos', 'dragAudios',
        'dragFormTexts', 'dragFormTextareas', 'dragFormRadios',
        'dragFormCheckboxs', 'dragFormSmscodes', 'dragFormSubmits', 'dragFormUploads'],
    };
  },
  methods: {
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
    dragTextClick(index, type) { // 点击组件
      this.dragClick(index, type);
    },
    resizestop(ev) {
      if (ev.height > this.page.phoneHeight) {
        this.$store.commit('page_update', {
          phoneHeight: ev.height,
        });
        if (ev.height > this.page.clientHeight - 64) {
          this.$store.commit('page_update', {
            clientHeight: ev.height + 64,
          });
        }
        const scrollTime = setTimeout(() => {
          window.scrollTo(0, ((ev.height + 264) - document.body.clientHeight));
          clearTimeout(scrollTime);
        }, 300);
      } else {
        this.$store.commit('page_update', {
          phoneHeight: ev.height,
        });
      }
    },
    getLayerActive(sort, num) {
      let k;
      this.$store.state.editor.layerLists.map((item, key) => {
        if (item.type === sort && item.num === num) {
          k = key;
        }
        return true;
      });
      return k;
    },
    dragType(type) {
      switch (type) {
        case 1:
        {
          return 'dragTextSetting';
        }
        case 2:
        {
          return 'dragImgSetting';
        }
        case 3: {
          return 'dragLinkSetting';
        }
        case 4:
        {
          return 'dragImgListSetting';
        }
        case 5:
        {
          return 'dragVideoSetting';
        }
        case 6: {
          return 'dragAudioSetting';
        }
        case 7:
        {
          return 'fTextSetting';
        }
        case 8:
        {
          return 'fTextareaSetting';
        }
        case 9:
        case 10: {
          return 'fRadioSetting';
        }
        case 11: {
          return 'fSmsSetting';
        }
        case 12: {
          return 'fSubmitSetting';
        }
        case 13: {
          return 'fUploadSetting';
        }
        default: {
          break;
        }
      }
    },
  },
  updated() {
  },
};
</script>

<style >
.drag-item {
  position: absolute;
  cursor: move;
}
.phone-content {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  width: 375px;
  background: #fff url(../../../assets/images/phone-content_bg.png) repeat;
  background-position-x: -3px;
  background-position-y: -9px;
}
.phone-content > .vdr-stick.vdr-stick-bm {
  height: 35px !important;
  width: 375px !important;
  z-index: 2001 !important;
  bottom: -36px !important;
  left: 0;
  margin-left: 0 !important;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  box-shadow: none;
}
.phone-resize {
  height: 35px;
  width: 375px;
  position: absolute;
  bottom: -36px;
  left: -1px;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  font-size: 16px;
  line-height: 35px;
  color: #323232;
  cursor: ns-resize;
  z-index: 1005;
  text-align: center;
}
.resize-icon {
  color: #eb5648;
}
.resize-up {
  transform: rotate(90deg);
}
.resize-down {
  transform: rotate(-90deg);
}
.phone-content.vdr.active:before {
  outline: none;
}
.drag-items {
  overflow: hidden;
}
</style>
