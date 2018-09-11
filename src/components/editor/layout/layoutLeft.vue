<template>
<el-aside width="200px" class="left-btns">
 <el-card v-for="(com, index) in edComponets" :key="index">
    <div slot="header">
    {{com.kind}}
    </div>
    <el-button v-for="(list, i) in com.list" :key="i" type="text" class="ed-com"
      @click="dragItemClick(list.type)">
      <icon :name="list.icon"></icon>
      <span class="el-com-text">{{list.text}}</span>
    </el-button>
</el-card>
</el-aside>
</template>

<script>
import { textActiveOff } from '@/util/tools';

export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {
      edComponets: [
        {
          kind: '基础组件',
          list: [
            { text: '文本', icon: 'text-width', type: 1 },
            { text: '图片', icon: 'image', type: 2 },
            { text: '热区', icon: 'link', type: 3 },
            { text: '多图拼接', icon: 'th-list', type: 4 },
          ],
        },
        {
          kind: '媒体组件',
          list: [
            { text: '视频', icon: 'film', type: 5 },
            { text: '音频', icon: 'music', type: 6 },
          ],
        },
      ],
    };
  },
  methods: {
    dragItemClick(type) { // 添加组件
      const zIndex = this.$store.state.editor.layoutKey;
      let layerName;
      let num = 0; // 组件类型索引
      const updateEditor = {
        isTextSet: false,
        isImgSet: false,
        isLinkSet: false,
        isImgListSet: false,
        isVideoSet: false,
        isAudioSet: false,
      };
      for (const item in this.$store.state.editor.typeCat) {
        const lists = this.$store.state.editor[this.$store.state.editor.typeCat[item][0]];
        if (lists.length) {
          updateEditor[item[0]] = textActiveOff(lists, { index: 0, isAll: true });
        }
      }
      let newEditor = {};
      switch (type) {
        case 1:
        {
          const textTop = (this.$store.state.editor.phoneHeight / 2) - (30 / 2);
          let drag = this.$store.state.editor.dragTexts;
          num = this.$store.state.editor.dragTexts.length;
          layerName = `文本${!num ? '' : num + 1}`;
          drag = textActiveOff(drag, { index: 0, isAll: true });
          drag.push({
            isShow: true,
            zIndex: 1000,
            y: textTop,
            isActive: true,
            dragIndex: zIndex,
            content: '哈哈哈哈',
            fontSize: '12px',
            lineHeight: 1.5,
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
          });
          newEditor = {
            textSet: true,
            isTextSet: true,
            dragTexts: drag,
            textActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
        case 2:
        {
          const textTop2 = 0;
          const drag2 = this.$store.state.editor.dragImages;
          num = drag2.length;
          layerName = `图片${!num ? '' : num + 1}`;
          drag2.push({
            isShow: true,
            zIndex: 1000,
            y: textTop2,
            isActive: true,
            dragIndex: zIndex,
            img: {},
            location: {
              x: 0,
              y: 0,
            },
            size: {
              w: 375,
              h: 300,
            },
            isUpload: false,
          });
          newEditor = {
            imgSet: true,
            isImgSet: true,
            dragImages: drag2,
            imgActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
        case 3:
        {
          const textTop3 = 0;
          let drag3 = this.$store.state.editor.dragLinks;
          num = drag3.length;
          layerName = `热区${!num ? '' : num + 1}`;
          drag3 = textActiveOff(drag3, { index: 0, isAll: true });
          drag3.push({
            isShow: true,
            zIndex: 1000,
            y: textTop3,
            isActive: true,
            dragIndex: zIndex,
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
            sourceType: '1', // 1.跳转 2.唤起
            awakeLink: '',
            iosLink: '',
            andLink: '',
            yybLink: '',

          });
          newEditor = {
            linkSet: true,
            isLinkSet: true,
            dragLinks: drag3,
            linkActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
        case 4:
        {
          const textTop4 = 0;
          // const zIndex4 = this.$store.state.editor.dragImgLists.length;
          const drag4 = this.$store.state.editor.dragImgLists;
          num = drag4.length;
          layerName = `多图拼接${!num ? '' : num + 1}`;
          drag4.push({
            isUplaod: false,
            isShow: true,
            zIndex: 1000,
            y: textTop4,
            isActive: true,
            dragIndex: zIndex,
            location: {
              x: 0,
              y: 0,
            },
            size: {
              w: 375,
              h: 300,
            },
            imgList: [],
          });
          newEditor = {
            imgListSet: true,
            isImgListSet: true,
            dragImgLists: drag4,
            imgListActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
        case 5:
        {
          const textTop5 = 0;
          // const zIndex5 = this.$store.state.editor.dragVideos.length;
          let drag5 = this.$store.state.editor.dragVideos;
          num = drag5.length;
          layerName = `视频${!num ? '' : num + 1}`;
          drag5 = textActiveOff(drag5, { index: 0, isAll: true });
          drag5.push({
            isShow: true,
            zIndex: 1000,
            y: textTop5,
            isActive: true,
            dragIndex: zIndex,
            sourceType: '1', // 1.本地视频 2.在线视频
            source: 'http://',
            videoTitle: '',
            loop: true,
            location: {
              x: 0,
              y: 0,
            },
            size: {
              w: 375,
              h: 300,
            },
            video: {},
            isUpload: false,
          });
          newEditor = {
            videoSet: true,
            isVideoSet: true,
            dragVideos: drag5,
            videoActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
        default:
        {
          const textTop6 = 0;
          // const zIndex6 = this.$store.state.editor.dragAudios.length;
          let drag6 = this.$store.state.editor.dragAudios;
          num = drag6.length;
          layerName = `音频${!num ? '' : num + 1}`;
          drag6 = textActiveOff(drag6, { index: 0, isAll: true });
          drag6.push({
            isShow: true,
            zIndex: 1000,
            y: textTop6,
            isActive: true,
            dragIndex: zIndex + 1,
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
              h: 82,
            },
            play: {
              title: '',
              isUplaod: false,
              duration: '00:00',
              url: '',
            },
          });
          newEditor = {
            audioSet: true,
            isAudioSet: true,
            dragAudios: drag6,
            audioActive: num,
            layoutKey: zIndex + 1,
          };
          break;
        }
      }

      const { layerLists } = this.$store.state.editor;
      layerLists.unshift({
        display: true, // 是否显示
        lock: true, // 是否可以编辑
        name: `${layerName}`, // 图层名
        id: num,
        type,
        num,
        zIndex,
        editing: false,
      });
      this.$store.commit('editor_update', Object.assign({}, updateEditor, newEditor, {
        layerLists,
        layerActive: 0,
      }));
      if (this.$store.state.page.pageSet) {
        this.$store.commit('page_update', { pageSet: false });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.ed-com.el-button.el-button--text {
  margin-left: 10px;
}
</style>
