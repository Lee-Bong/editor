<template>
  <div class="editor-box">
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
            <el-button>预览</el-button>
            <el-button type="primary" class="publish-btn">发布</el-button>
            <el-button type="text" icon="el-icon-question" class="help-icon">使用帮助</el-button>
          </el-col>
        </el-row>
      </el-header>
      <layout-left />
      <el-main>
        <div class="flxed-main" @click="onMainClick">
          <div class="phone-container"
          :style="{width: phoneWidth+'px', height: phoneHeight+'px'}">
           <layoutMain />
          </div>
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
import _ from '@/util/tools';

export default {
  name: 'editor',
  components: {
    layoutMain,
    layer,
    layoutLeft,
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
    };
  },

  methods: {
    onMainClick(e) {
      console.log('e', e);
      console.log('e.offsetX+e.offsetY', e);
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
  mounted() {
    // 读取保存数据
    const ss = '{"phoneWidth":375,"phoneHeight":667,"layoutKey":1,"dragTexts":[{"isShow":true,"zIndex":0,"y":318.5,"isActive":true,"dragIndex":0,"content":"哈哈哈哈","fontSize":"12px","textAlign":"left","textColor":"rgba(19, 206, 102, 0.8)","location":{"x":0,"y":318.5},"size":{"w":375,"h":90}}],"dragImages":[],"dragLinks":[],"dragImageLists":[],"dragAudios":[],"dragVideos":[],"textActive":0,"linkActive":0,"imgActive":0,"imgListActive":0,"audioActive":0,"videoActive":0,"textSet":true,"isTextSet":true,"imgSet":false,"isImgSet":false,"imgListSet":false,"isImgListSet":false,"videoSet":false,"isVideoSet":false,"audioSet":false,"isAudioSet":false,"linkSet":false,"isLinkSet":false,"layerLists":[{"display":true,"lock":true,"name":"图层1","id":0,"sort":1,"num":0,"editing":false}],"layerActive":0,"typeCat":{"1":["dragTexts","textSet","isTextSet","textActive"],"2":["dragImages","imgSet","isImgSet","imgActive"],"3":["dragLinks","linkSet","isLinkSet","linkActive"],"4":["dragImageLists","imgListSet","isImgListSet","imgListActive"],"5":["dragVideos","videoSet","isVideoSet","videoActive"],"6":["dragAudios","audioSet","isAudioSet","audioActive"]}}';
    const saveData = JSON.parse(ss);
    this.$store.commit('editor_update', saveData);
    const editor = this;
    window.onkeydown = (e) => {
      const evt = (e) || window.event;
      if (evt.keyCode && evt.keyCode === 8) {
        editor.dragDel();
      }
    };
  },

};

</script>


<style>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 56px;
  background-color: #fafafa;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #ccd5db;
  z-index: 100;
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

.el-main {
}

.el-breadcrumb {
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
  position: fixed;
  right: 0;
  top: 56px;
  bottom: 0;
  width: 260px;
  z-index: 98;
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
  padding-bottom: 40px;
  left: 200px;
  right: 260px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.phone-container {
  position: relative;
  /* background: url('../../static/images/phone.svg') no-repeat; */
  width: 385px;
  height: 731px;
  height: 631px;
  /* top: 50%; */
  top: 10px;
  /* margin-top: -334px; */
  /* background-size: contain; */
  background-color: #ddd;
  border-radius: 20px;
}

.phone-content {
  position: absolute;
  /* top: 52px; */
  top: 30px;
  left: 5px;
  width: 366px;
  /* height: 667px; */
  height: 567px;
  background-color: #fff;
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

</style>
