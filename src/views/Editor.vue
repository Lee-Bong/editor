<template>
  <div class="editor-box" @click="hidePanel">
    <el-container>
      <el-header>
        <el-row class="header-flex">
          <el-col :span="10" type="flex" >
          <el-breadcrumb separator="/" type="flex">
            <el-breadcrumb-item>
              微页面
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              编辑微页面
            </el-breadcrumb-item>
          </el-breadcrumb>
          </el-col>
          <el-col :span="14">
            <el-button
              @click="saveEditor">保存草稿</el-button>
            <el-button
              @click="reviewEditor">预览</el-button>
            <el-button type="primary" class="publish-btn"
              @click="publishEditor">发布</el-button>
            <el-button type="text" icon="el-icon-question" class="help-icon">使用帮助</el-button>
          </el-col>
        </el-row>
      </el-header>
      <layout-left />
      <el-main>
        <div class="flxed-main">
          <div class="phone-wrap"
            :style="{height: wrapHeight+'px'}">
            <div class="phone-container"
              ref="phoneContainer"
              :style="{width: phoneWidth+'px',
                height: ($store.state.editor.phoneHeight+64)+'px'}">
              <div class="top-banner"
                @click="topBannerClick">
                <div class="web-title">{{$store.state.page.title}}</div>
              </div>
              <layout-main />

            </div>
            <div class="phone-hidden"
            :style="{width: phoneWidth+'px',
                top: ($store.state.editor.phoneHeight + 64+ 37)+'px'}"></div>
          </div>
          <layout-setting />
        </div>
        <div class="fixed-right">
        <layer />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import layoutMain from '@/components/editor/layout/layoutMain';
import layer from '@/components/editor/layout/layer';
import layoutLeft from '@/components/editor/layout/layoutLeft';
import layoutSetting from '@/components/editor/layout/layoutSetting';
import dragMxi from '@/util/dragMxi';
import _ from '@/util/tools';

export default {
  mixins: [dragMxi.dragCom()],
  name: 'editor',
  components: {
    layoutMain,
    layer,
    layoutLeft,
    layoutSetting,
  },
  data() {
    return {
      phoneWidth: 375, // 可视区宽高
      phoneHeight: 667 + 65,
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
      drag: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      wrapHeight: 667,
    };
  },

  methods: {
    hidePanel(event) { // todo 跟添加图层选中冲突
      const dragItems = document.getElementsByClassName('drag-item');
      const layerItems = document.getElementsByClassName('layer-item');
      const layerAdd = document.getElementsByClassName('ed-com');
      const dragDel = document.getElementsByClassName('drag-del');
      const settingWrap = document.getElementsByClassName('setting-wrap');
      const topBanner = document.getElementsByClassName('top-banner');
      let isEnd = false;
      if (topBanner[0].contains(event.target)) {
        isEnd = true;
        return false;
      }
      if (!isEnd && settingWrap.length) {
        if (settingWrap[0].contains(event.target)) {
          isEnd = true;
          return false;
        }
      }
      if (!isEnd && dragItems.length) {
        const len = dragItems.length;
        for (let i = 0; i < len; i++) {
          if (dragItems[i].contains(event.target)) {
            isEnd = true;
            break;
          }
        }
      }
      if (!isEnd && layerItems.length) {
        const len1 = layerItems.length;
        for (let i = 0; i < len1; i++) {
          if (layerItems[i].contains(event.target)) {
            isEnd = true;
            break;
          }
        }
      }
      if (!isEnd && dragDel.length) {
        const len3 = dragDel.length;
        for (let i = 0; i < len3; i++) {
          if (dragDel[i].contains(event.target)) {
            isEnd = true;
            break;
          }
        }
      }
      if (!isEnd && layerAdd.length) {
        const len2 = layerAdd.length;
        for (let i = 0; i < len2; i++) {
          if (layerAdd[i].contains(event.target)) {
            isEnd = true;
            break;
          }
        }
      }
      // alert(isEnd);
      if (!isEnd) { // 点击区域外，组件激活状态消失
        const layerCur = document.getElementsByClassName('layer-item active');
        if (layerCur.length) {
          layerCur[0].classList.remove('active');
        }
        // 移除组件的激活状态
        const { editor, page } = this.$store.state;
        const { layerActive } = editor;
        if (page.pageSet) {
          this.$store.commit('page_update', { pageSet: false });
        }

        if (layerActive !== -1) {
          this.dragClick(-1);
        }
      }
    },
    saveEditor() { // 保存草稿
      // const editor = this.$store.state.editor;
      // const data = JSON.stringify(editor);
      // const saveData = JSON.parse(data);
    },
    dragDel(s, n) { // 删除当前编辑组件
      const { editor } = this.$store.state;
      const { typeCat, layerActive } = editor;
      let { layerLists } = editor;
      if (layerLists.length) {
        const sort = s || layerLists[layerActive].type;
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
    topBannerClick() { // 点击页面顶部，显示页面设置
      const { pageSet } = this.$store.state.page;
      if (!pageSet) {
        this.$store.dispatch('setting_tap', { pageSet: true });
      }
      if (this.$store.state.editor.layerActive !== -1) {
        this.dragClick(-2);
      }
    },
    resize(newRect) {
      this.drag.width = newRect.width;
      this.drag.height = newRect.height;
      this.drag.top = newRect.top;
      this.drag.left = newRect.left;
    },
    reviewEditor() { // 预览
      this.getEditorJson();
    },
    publishEditor() { // 发布
      this.getEditorJson();
    },
    getEditorJson() { // 生成预览与发布的json
      const eJson = { editor: {} };
      const { editor, page } = this.$store.state;
      eJson.editor.page = {
        title: page.title,
        phoneWidth: page.phoneWidth,
        phoneHeight: page.phoneHeight, // 可视区高度
        shareTitle: page.shareTitle,
        shareDec: page.shareDec,
        shareImg: page.shareImg,
        'background-color': page.backgroundColor,
      };
      const dragArr = [];
      // todo 多图组件未添加
      const {
        dragTexts, dragImages, dragLinks, dragVideos, dragAudios,
      } = editor;
      if (dragTexts.length) {
        dragTexts.map((item) => {
          dragArr.push({
            type: 1,
            content: item.content,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'font-size': parseInt(item.fontSize, 10),
              'text-align': item.textAlign,
              'text-color': item.textColor,
              'z-index': item.zIndex,
            },
          });
          return true;
        });
      }
      if (dragImages.length) {
        dragImages.map((item) => {
          dragArr.push({
            type: 2,
            url: item.img,
            location: {
              x: item.loaction.x,
              y: item.loaction.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.zIndex,
            },
          });
          return true;
        });
      }
      if (dragLinks.length) {
        dragLinks.map((item) => {
          dragArr.push({
            type: 3,
            appLink: item.appLink,
            outLink: item.outLink,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.zIndex,
            },
            sourceType: item.sourceType, // 1.普通跳转 2. 唤起下载app
            awakeLink: item.awakeLink,
            iosLink: item.iosLink,
            andLink: item.andLink,
            yybLink: item.yybLink,
          });
          return true;
        });
      }
      if (dragVideos.length) {
        dragVideos.map((item) => {
          dragArr.push({
            type: 5,
            source: item.source,
            title: item.videoTitle,
            loop: item.loop,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.zIndex,
            },
          });
          return true;
        });
      }
      if (dragAudios.length) {
        dragAudios.map((item) => {
          dragArr.push({
            type: 6,
            source: item.source,
            title: item.audioTitle,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.zIndex,
            },
          });
          return true;
        });
      }
      eJson.editor.components = dragArr;

      return eJson;
    },
  },
  mounted() {
    // 读取保存数据
    const editorData = '{"phoneWidth":375,"phoneHeight":667,"layoutKey":1,"dragTexts":[{"isShow":true,"zIndex":0,"y":100,"isActive":true,"dragIndex":0,"content":"哈哈哈哈","fontSize":"12px","textAlign":"left","textColor":"rgba(19, 206, 102, 0.8)","location":{"x":0,"y":100},"size":{"w":375,"h":90}}],"dragImages":[],"dragLinks":[],"dragImageLists":[],"dragAudios":[],"dragVideos":[],"textActive":0,"linkActive":0,"imgActive":0,"imgListActive":0,"audioActive":0,"videoActive":0,"textSet":true,"isTextSet":false,"imgSet":false,"isImgSet":false,"imgListSet":false,"isImgListSet":false,"videoSet":false,"isVideoSet":false,"audioSet":false,"isAudioSet":false,"linkSet":false,"isLinkSet":false,"layerLists":[{"display":true,"lock":true,"name":"文本","id":0,"type":1,"num":0,"editing":false}],"layerActive":0,"typeCat":{"1":["dragTexts","textSet","isTextSet","textActive"],"2":["dragImages","imgSet","isImgSet","imgActive"],"3":["dragLinks","linkSet","isLinkSet","linkActive"],"4":["dragImageLists","imgListSet","isImgListSet","imgListActive"],"5":["dragVideos","videoSet","isVideoSet","videoActive"],"6":["dragAudios","audioSet","isAudioSet","audioActive"]}}';
    this.$store.commit('editor_update', JSON.parse(editorData));
    // const pageData = '';
    this.$store.commit('page_update', JSON.parse(editorData));
    this.wrapHeight = this.$store.state.editor.phoneHeight + 64 + 37;
    setInterval(() => {
      // _.now_time();
    }, 1000);
  },
  updated() {
    if (this.$store.state.editor.phoneHeight > this.wrapHeight) {
      this.wrapHeight = this.$store.state.editor.phoneHeight + 64 + 37;
    }
  },

};

</script>


<style>
html,
body {
  height: 100%;
  width: 100%;
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 56px;
  background-color: #fafafa;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #ccd5db;
  z-index: 1020;
}

.el-aside {
  position: fixed;
  top: 57px;
  left: 0;
  bottom: 0;
  width: 100px;
  background-color: #fff;
  border-right: 1px solid #ccd5db;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 98;
}

.help-icon {
  color: #323232;
}

.header-flex {
  height: 100%;
  align-content: center;
  justify-content: space-between;
}

.header-flex .el-breadcrumb__inner {
  line-height: 56px;
}

.header-flex .el-col-14 {
  margin-top: -10px;
}
.el-button.el-button--text {
  color: #333;
  width: 80px;
  height: 60px;
  padding: 0;
  margin-top: 10px;
}
.el-button.el-button--text:hover {
  border: 1px solid #409eff;
}
.el-button.el-button--text:active {
  background-color: #1593ff;
  color: #fff;
}

.ed-com i,
.ed-com span {
  display: block;

  font-size: 16px;
}

.ed-com i {
  font-size: 22px;
}

.el-com-text {
  margin-top: 8px;
}
.el-card__body {
  padding: 0 !important;
}

.el-button + .el-button:nth-child(2n + 1) {
  margin-left: 0;
}
.el-card {
  border-top: 0;
}
.el-card.is-always-shadow {
  box-shadow: none;
  border-radius: 0;
  margin-top: 10px;
  border-right: 0;
}

.el-card__body {
  padding: 10px 0;
}

.fixed-right {
  position: relative;
  float: right;
  /* right: 0; */
  /* top: 56px; */
  /* bottom: 0; */
  width: 260px;
  z-index: 98;
      margin-top: 40px;
    margin-right: -19px;
  background-color: #fafafa;
  border-left: 1px solid #ccd5db;
  box-sizing: content-box;
}

.layer-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 260px;
  height: 36px;
  background: #fff;
  font-size: 12px;
  color: #000;
  border-bottom: 1px solid #ccd5db;
  box-sizing: border-box;
  cursor: pointer;
}
.el-card__header {
  padding: 5px 10px;
  line-height: 34px;
}
.fixed-right .el-card__header {
  padding: 0;
}
.layer-header {
  height: 50px;
  line-height: 50px;
}
.layer-item {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  color: #323232;
}

.layer-item:hover,
.layer-item:active,
.layer-item.active {
  color: #1593ff;
}

.layer-item > i,
.layer-item .fa-icon {
  margin-right: 10px;
}
.flxed-main {
  background-color: #eee;
  position: absolute;
  top: 56px;
  height: auto;
  padding-bottom: 60px;
  left: 200px;
  right: 260px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.phone-container {
  position: relative;
  width: 375px;
  height: 731px;
  height: 631px;
  top: 0;
  background-color: #fff;
  border: 1px solid #e5e5d5;
}
.phone-container.active {
  border: 1px solid #59c7f9;
}


.el-button.el-button--text {
  color: #606266;
}

.publish-btn {
  margin-left: 10px !important;
}
body{
    font-family:'微软雅黑'
}
[v-cloak]{
    display:none;
}
#example{
    width:1000px;
    margin:0 auto;
}
.list-complete-item {
  transition: all 1s;
    height:50px;
    line-height: 50px;
    background: #000;
    color:#fff;
    text-align: center;
    font-size:24px;
    margin-top:10px;
}
.styleclass{
    width:100px;
    float:left;
}
.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
  height: 0px;
  margin-top: 0px;
  padding: 0px;
  border: solid 0px;
}
.list-complete-sortable-chosen,.list-complete-sortable-ghost{
 opacity: 0;
  height: 0px;
  margin-top: 0px;
  padding: 0px;
  border: solid 0px;
}

.el-card.is-always-shadow {
  margin-top: 0;
}

.top-banner {
  cursor: pointer;
  background: url('../assets/images/page_banner.png') no-repeat center center;
  background-size: 375px auto;
  z-index: 10;
  position: absolute;
  width: 375px;
  height: 64px;
}

.web-title{
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

.phone-wrap {
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
}

.phone-hidden {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom:0;
  z-index: 1050;
}


</style>
