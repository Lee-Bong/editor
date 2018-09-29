<template>
  <div class="editor-box">
    <el-container>
      <nav-bar pageName="编辑微页面">
        <template slot="btnGroup">
            <el-button @click="saveEditor">保存草稿</el-button>
            <el-button @click="reviewEditor">预览</el-button>
            <el-button type="primary" class="publish-btn" @click="publishEditor">发布</el-button>
        </template>
      </nav-bar>
      <layout-left />
      <el-main>
        <div class="flxed-main">
          <div class="phone-wrap" :style="{height: ($store.state.page.clientHeight)+'px'}">
            <div class="phone-container" ref="phoneContainer" :style="{width: phoneWidth+'px',
                height: ($store.state.page.clientHeight)+'px'}">
              <div class="top-banner" @click="topBannerClick">
                <div class="now-show">{{this.now}}</div>
                <div class="web-title">{{$store.state.page.title}}</div>
              </div>
              <div class="screen-line" v-show="$store.state.page.phoneHeight > 667"></div>
              <layout-main />
            </div>
            <div class="phone-hidden" :style="{width: phoneWidth+'px',
                top: ($store.state.page.phoneHeight + 64+ 37)+'px'}"></div>
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
import VueDragResize from 'vue-drag-resize';
import layoutMain from '@/components/editor/layout/layoutMain';
import layer from '@/components/editor/layout/layer';
import layoutLeft from '@/components/editor/layout/layoutLeft';
import layoutSetting from '@/components/editor/layout/layoutSetting';
import { dragCom } from '@/util/dragMxi';
import { nowTime } from '@/util/tools';
import merge from 'webpack-merge';
import * as service from '../service';
import NavBar from '../components/NavBar';

export default {
  mixins: [dragCom()],
  name: 'editor',
  components: {
    VueDragResize,
    layoutMain,
    layer,
    layoutLeft,
    layoutSetting,
    NavBar,
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
      wrapHeight: 667, // 包括头部的高度x
      clientHeight: 667, // 编辑内容高度
      isFirst: true, // 空白编辑页
      now: '00:00 AM',
      nowTimer: null,
      dataInit: '{"editor":{"layoutKey":1,"dragTexts":[],"dragImages":[],"dragLinks":[],"dragImgLists":[],"dragAudios":[],"dragVideos":[],"textActive":0,"linkActive":0,"imgActive":0,"imgListActive":0,"audioActive":0,"videoActive":0,"textSet":false,"isTextSet":false,"imgSet":false,"isImgSet":false,"imgListSet":false,"isImgListSet":false,"videoSet":false,"isVideoSet":false,"audioSet":false,"isAudioSet":false,"linkSet":false,"isLinkSet":false,"layerLists":[],"layerActive":-1,"typeCat":{"1":["dragTexts","textSet","isTextSet","textActive"],"2":["dragImages","imgSet","isImgSet","imgActive"],"3":["dragLinks","linkSet","isLinkSet","linkActive"],"4":["dragImgLists","imgListSet","isImgListSet","imgListActive"],"5":["dragVideos","videoSet","isVideoSet","videoActive"],"6":["dragAudios","audioSet","isAudioSet","audioActive"]},"pageSet":true,"mediaHeight":300,"audioHeight":82},"page":{"pageSet":true,"title":"","phoneWidth":375,"phoneHeight":667,"screenHeight":667,"clientHeight":731,"shareTitle":"","shareDec":"","shareImg":"","backgroundColor":"#fff","img":{}}}',
      beforeState: null,
    };
  },

  methods: {
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
    async saveEditor(isTrigger) { // 保存草稿
      const { isOk, msg } = this.checkSources();
      const ele = this;
      if (!isOk) {
        ele.$message({
          message: msg,
          type: 'error',
          duration: 2000,
        });
        return false;
      }
      let { state, draft } = ele.getEditorJson();
      state = JSON.stringify(state);
      draft = JSON.stringify(draft);
      const params = {
        state,
        draft,
        // piblic: '',
      };
      let data;
      if (this.isFirst) {
        data = await service.postPageInfo(params);
      } else {
        data = await service.patchPageInfo(ele.$route.query.page_id, params);
      }
      this.beforeState = JSON.stringify(this.$store.state);
      if (data && data.status === 'ok' && data.data) {
        if (isTrigger) {
          ele.optSucsess('保存草稿');
        }
        if (this.isFirst) {
          ele.$router.push({
            query: merge(ele.$route.query, { page_id: data.data.id }),
          });
          this.isFirst = false;
        }
        return true;
      } else if (isTrigger)ele.optError('保存草稿');
      return false;
    },
    optError(msg) {
      this.$message({
        message: `${msg}失败，请重试～`,
        type: 'error',
        duration: 2000,
      });
    },
    optSucsess(msg) {
      this.$message({
        message: `${msg}成功～`,
        type: 'success',
        duration: 2000,
      });
    },
    async reviewEditor() { // 预览
      const ele = this;
      const isOk = await this.saveEditor(false);
      if (isOk) {
        ele.$router.push({
          path: '/preview',
          query: merge(ele.$route.query, { page_id: this.$route.query.page_id }),
        });
      }
    },
    async publishEditor() { // 发布
      try {
        const ele = this;
        const isOk = await this.saveEditor(false);
        if (isOk) {
          const { data } = await service.publishPage(this.$route.query.page_id);
          if (data) {
            ele.optSucsess('发布页面');
            ele.$router.push({
              path: '/publish',
              query: merge(ele.$route.query, { page_id: this.$route.query.page_id }),
            });
          } else {
            ele.optError('发布页面');
          }
        }
      } catch (err) {
        this.optError('发布页面');
      }
    },
    getEditorJson() { // 生成预览与发布的json
      const eJson = { editor: {} };
      const { editor, page } = this.$store.state;
      eJson.editor.page = {
        title: page.title,
        phoneWidth: page.phoneWidth,
        phoneHeight: page.phoneHeight, // 可视区高度
        clientHeight: page.clientHeight, // 总体内容高度
        shareTitle: page.shareTitle,
        shareDec: page.shareDec,
        shareImg: page.img.url || 'http://static.seeyouyima.com/nodejs-common/meiyou-bf23e296a9058a8dd5581eda3ea59674.png',
        'background-color': page.backgroundColor,
      };
      const dragArr = [];
      // todo 多图组件未添加
      const {
        dragTexts, dragImages, dragLinks, dragVideos, dragAudios,
        dragImgLists,
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
              'font-size': item.fontSize,
              'text-align': item.textAlign,
              'text-color': item.textColor,
              'line-height': item.lineHeight,
              'z-index': item.dragIndex,
            },
            isFixed: item.position !== 'relative',
          });
          return true;
        });
      }
      if (dragImages.length) {
        dragImages.map((item) => {
          dragArr.push({
            type: 2,
            url: item.img.url,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.dragIndex,
            },
            isFixed: item.position !== 'relative',
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
              'z-index': item.dragIndex,
            },
            sourceType: item.sourceType, // 1.普通跳转 2. 唤起下载app
            awakeLink: item.awakeLink,
            iosLink: item.iosLink,
            andLink: item.andLink,
            yybLink: item.yybLink,
            isFixed: item.position !== 'relative',
          });
          return true;
        });
      }
      if (dragImgLists.length) {
        dragImgLists.map((item) => {
          dragArr.push({
            type: 4,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.dragIndex,
            },
            imgList: item.imgList,
            isFixed: false,
          });
          return true;
        });
      }
      if (dragVideos.length) {
        dragVideos.map((item) => {
          dragArr.push({
            type: 5,
            source: item.video.url,
            title: item.video.title,
            loop: item.loop,
            poster: item.video.poster,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.dragIndex,
            },
            isFixed: item.position !== 'relative',
          });
          return true;
        });
      }
      if (dragAudios.length) {
        dragAudios.map((item) => {
          dragArr.push({
            type: 6,
            source: item.play.url,
            title: item.play.title,
            second: item.play.second,
            isFixed: item.sourceType === 1 ? item.play.position !== 'relative' : item.linePlay.position !== 'relative',
            play: item.sourceType === 1 ? item.play : item.linePlay,
            location: {
              x: item.location.x,
              y: item.location.y,
            },
            size: {
              w: item.size.w,
              h: item.size.h,
            },
            style: {
              'z-index': item.dragIndex,
            },
          });
          return true;
        });
      }
      this.topBannerClick();
      eJson.editor.components = dragArr;
      const saveState = this.$store.state;
      saveState.page.pageSet = true;
      saveState.editor.layerActive = -1;

      return { state: saveState, draft: eJson.editor };
    },
    checkSources() { // 检测是否所有资源都上传
      const { page, editor } = this.$store.state;
      const { typeCat } = editor;
      let isOk = true;
      let msg = '请添加页面名称～';
      if (!page.title) {
        msg = '请添加页面名称～';
        this.topBannerClick();
        isOk = false;
      } else {
        const {
          layerLists,
        } = editor;
        if (layerLists.length) {
          for (let i = 0; i < layerLists.length; i++) {
            const item = layerLists[i];
            const drag = editor[typeCat[item.type][0]][item.num];
            if (item.type === 2) {
              if (JSON.stringify(drag.img) === '{}' || !drag.img.url) {
                msg = '请添加图片～';
                isOk = false;
                break;
              }
            }
            if (item.type === 6) {
              if (!drag.play || !drag.play.url) {
                msg = '请添加音频～';
                isOk = false;
                break;
              }
            }
            if (item.type === 5) {
              if (!drag.video || !drag.video.url) {
                msg = '请添加视频～';
                isOk = false;
                break;
              } else if (drag.video && drag.video.url && !drag.video.isPoster) {
                msg = '请添加视频封面';
                isOk = false;
                break;
              }
            }
            if (item.type === 4) {
              if (!drag.imgList) {
                msg = '请添加多图组件的图片资源～';
                isOk = false;
                break;
              }
              if (JSON.stringify(drag.imgList) === '[]' || !this.imgListFilter(drag.imgList)) {
                msg = '请添加多图组件的图片资源～';
                isOk = false;
                break;
              }
            }
          }
        }
      }
      return { isOk, msg };
    },
    imgListFilter(list) {
      let isOk = true;
      list.map((el) => {
        if (!el.url) {
          isOk = false;
        }
        return true;
      });
      return isOk;
    },
    editorInit(data) {
      let init = data;
      init = data ? init : this.dataInit;
      const state = JSON.parse(init);
      this.beforeState = init;
      this.$store.commit('editor_update', state.editor);
      this.$store.commit('page_update', state.page);
    },
    delCheck() {
      const { className } = document.activeElement;
      const classList = ['drag-text', 'el-textarea__inner', 'el-input__inner', 'name-editor'];
      let isContain = false;
      if (className.indexOf(' ') >= 0) {
        const list = className.split(' ');
        const fList = list.filter(item => classList.includes(item));
        isContain = !!fList.length;
      } else if (classList.includes(className)) {
        isContain = true;
      }
      return isContain;
    },
    goCheck() {
      const curState = JSON.stringify(this.$store.state);
      let isOk = true;
      if (curState !== this.beforeState) isOk = false;
      return isOk;
    },
  },
  async mounted() {
    if (this.$route.query.page_id) {
      try {
        this.isFirst = false;
        const { data } = await service.getPageInfo(this.$route.query.page_id);
        if (data) {
          this.editorInit(data.state);
        } else {
          this.optError('获取编辑器数据, 请重试～');
          this.editorInit();
        }
      } catch (err) {
        this.optError('获取编辑器数据, 请重试～');
      }
      this.wrapHeight = this.$store.state.page.phoneHeight + 64 + 37;
    } else {
      this.editorInit();
    }
    const ele = this;
    this.$nextTick(() => {
      window.onbeforeunload = function cb(e) {
        const event = window.event || e;
        if (!ele.goCheck()) {
          event.returnValue = ('确定离开当前页面吗？');
        }
      };
    });
  },
  updated() {
  },
  created() {
    const ele = this;
    document.onkeydown = (e) => {
      if (e.keyCode && parseInt(e.keyCode, 10) === 8) {
        if (!this.delCheck()) {
          const { layerActive, layerLists } = ele.$store.state.editor;
          if (layerLists.length && layerActive !== -1) {
            this.dragDel();
          }
        }
      }
    };
    this.now = nowTime();
    this.nowTimer = setInterval(() => {
      this.now = nowTime();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.nowTimer);
  },
  beforeRouteLeave(to, from, next) {
    if (!this.goCheck()) {
      this.$confirm('检测到有未保存的内容，如果离开将丢失内容，是否继续？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '狠心离开',
        cancelButtonText: '取消',
        callback: (action) => {
          if (action === 'confirm') {
            next(true);
          } else {
            next(false);
          }
        },
      });
    } else {
      next(true);
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
.el-card__header {
  padding: 5px 10px;
  line-height: 34px;
  margin-top: 3px;
}
.fixed-right .el-card__header {
  padding: 0;
}
.layer-header {
  height: 50px;
  line-height: 50px;
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
  padding: 5px;
}

.publish-btn {
  margin-left: 10px !important;
}
body {
  font-family: "微软雅黑";
}
[v-cloak] {
  display: none;
}
#example {
  width: 1000px;
  margin: 0 auto;
}
.list-complete-item {
  transition: all 1s;
  height: 50px;
  line-height: 50px;
  background: #000;
  color: #fff;
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
}
.styleclass {
  width: 100px;
  float: left;
}
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
  height: 0px;
  margin-top: 0px;
  padding: 0px;
  border: solid 0px;
}
.list-complete-sortable-chosen,
.list-complete-sortable-ghost {
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
  background: url("../assets/images/page_banner1.png") no-repeat center center;
  background-size: 375px auto;
  z-index: 10;
  position: absolute;
  width: 375px;
  height: 64px;
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

.phone-wrap {
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
}

.phone-hidden {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: -1px;
  left: 1px;
  z-index: 1050;
}
.screen-line {
  position: absolute;
  width: 110%;
  left:-5%;
  top: 731px;
  border: 0.5px dashed #eb5648;
  z-index: 1001;
}
.now-show {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    font-family: 'Arial';
}
.is-require .el-form-item__label:before {
  content: '*';
  color: #eb5648;
}
.el-breadcrumb__inner.is-link {
  color: #409EFFf9;
}
.el-color-picker__panel .el-color-dropdown__link-btn {
  display: none
}
</style>
