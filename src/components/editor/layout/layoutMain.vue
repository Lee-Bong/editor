<template>
<vue-drag-resize class="phone-content" ref="phoneContent"
  :sticks="['bm']"
  :h="$store.state.editor.phoneHeight"
  :isActive="true"
  :isDraggable="false"
  :isResizable="true"
  :parentLimitation="false"
  :y="64"
  @resizestop="resizestop"
  :style="{
    width: $store.state.editor.phoneWidth+'px',
    backgroundColor:  $store.state.page.backgroundColor,
  }">
     <div class="phone-resize">
              <i class="el-icon-back resize-icon resize-up"></i>
              拖动调节页面高度
              <i class="el-icon-back resize-icon resize-down"></i>
            </div>
  <!-- <div class="phone-content" ref="phoneContent"
    :style="{
      width: $store.state.editor.phoneWidth+'px',
      height: $store.state.editor.phoneHeight+'px',
      backgroundColor:  $store.state.page.backgroundColor,
    }"
  > -->
    <drag-text
      v-for="(drag, index) in $store.state.editor.dragTexts"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :dragForm="drag"
      @inputChange="inputChange"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

    <drag-img
      v-for="(drag, index) in $store.state.editor.dragImages"
      :key="drag.zIndex"
      :list-index="index"
      :is-active="drag.isActive"
      v-if="drag.isShow"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

    <drag-link
      v-for="(drag, index) in $store.state.editor.dragLinks"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

    <drag-image-lists
      v-for="(drag, index) in $store.state.editor.dragImageLists"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :dragForm="drag"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

    <drag-video
      v-for="(drag, index) in $store.state.editor.dragVideos"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

    <drag-audio
      v-for="(drag, index) in $store.state.editor.dragAudios"
      v-if="drag.isShow"
      :key="drag.zIndex"
      :list-index="index"
      :dragForm="drag"
      @dragStop="inputDragStop"
      @dragDel="dragDel"
      @dragTextClick="dragTextClick"
    />

  </vue-drag-resize>
</template>

<script>
import dragText from '@/components/editor/dragItem/dragText';
import dragImg from '@/components/editor/dragItem/dragImg';
import dragLink from '@/components/editor/dragItem/dragLink';
import dragImageLists from '@/components/editor/dragItem/dragImgLists';
import dragVideo from '@/components/editor/dragItem/dragVideo';
import dragAudio from '@/components/editor/dragItem/dragAudio';
import dragMxi from '@/util/dragMxi';

export default {
  mixins: [dragMxi.dragCom()],
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
          y: (this.$store.state.editor.phoneHeight / 2) - (30 / 2),
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
    };
  },
  methods: {
    inputChange() { // 组件-文本值改变

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
    dragTextClick(index, type) { // 点击组件
      this.dragClick(index, type);
    },

    dragDel(s, n, dragIndex) { // 删除当前编辑组件
      const { editor } = this.$store.state;
      const { layerActive, layerLists, typeCat } = editor;
      const lActive = layerActive === -1 ? this.getLayerActive(s, n) : layerActive;
      if (layerLists.length) {
        const sort = s !== undefined ? s : layerLists[lActive].type;
        const num = n !== undefined ? n : layerLists[lActive].num;
        for (const k in typeCat) {
          if (editor[typeCat[k][0]].length) {
            editor[typeCat[k][0]].map((item, i) => {
              if (item.dragIndex > dragIndex) {
                const ke = editor[typeCat[k][0]][i].dragIndex - 1;
                editor[typeCat[k][0]][i].dragIndex = ke;
                editor[typeCat[k][0]][i].zIndex = ke;
              }
              return true;
            });
          }
        }

        const cat = typeCat[sort];
        editor[cat[0]] = editor[cat[0]].filter((item, key) => {
          if (key !== num) {
            // if(key>num){
            //   item.dragIndex= item.dragIndex-1;
            //   item.zIndex = item.zIndex-1;
            // }
            return item;
          }
          return true;
        });

        editor[cat[2]] = false;
        if (!editor[cat[0]].length) {
          editor[cat[1]] = false;
        }
        editor.layerLists = layerLists.filter((item, key) => {
          if (key !== lActive) {
            if (item.type === sort && item.num > num) {
              layerLists[key].num -= 1;
            }
            return item;
          }
          return false;
        });
        editor.layerActive = -1;
        editor.layoutKey -= 1;
        this.$store.commit('editor_update', editor);
      }
    },
    resizestop(ev) {
      this.$store.commit('editor_update', {
        phoneHeight: ev.height,
      });
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
    getWePage() {
      this.$http({
        method: 'get',
        url: 'https://test-bfe.meiyou.com/api/we/page',
      }).then(() => {
        //   alert(JSON.stringify(res));
        // console.log(res);
      }).catch(() => {
        //   alert(JSON.stringify(err));
        // console.log(err);
      });
    },
    saveWePage() {
      this.$http({
        method: 'post',
        url: 'https://test-bfe.meiyou.com/api/we/page',
        data: {
          state: 'ssss',
          draft: '',
          public: '',
        },
      }).then(() => {
        alert(JSON.stringify(res));
        // console.log(res);
      }).catch(() => {
        //   alert(JSON.stringify(err));
        // console.log(err);
      });
    },
  },
  mounted() {
    this.getWePage();
  },
};
</script>

<style >
.drag-item {
  position:absolute;
}
.phone-content {
  position: absolute;
  top: 64px;
  /* padding-top: 1px;  */
  left: 0;
  width: 366px;
  background-color: #fff;

}
 .phone-content>.vdr-stick.vdr-stick-bm{
    height: 35px!important;
    width: 375px!important;
    z-index: 2001!important;
    bottom: -35px!important;
    left: 0;
    margin-left: 0!important;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #e4e4e4;
    box-shadow: none;
  }
  .phone-resize {
  height: 35px;
  width: 375px;
  position: absolute;
  bottom: -35px;
  left: 0;
  background-color: #fff;
  /* border: 1px solid #e4e4e4; */
  font-size: 16px;
  line-height: 35px;
  color: #323232;
      cursor: ns-resize;
      z-index: 2000;
      text-align: center;
}
.resize-icon{
  color: #EB5648;
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
</style>
