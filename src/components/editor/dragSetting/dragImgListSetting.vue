<template>
  <div :class="['setting-content', editor.isImgListSet
    ? 'setting-show' : '', 'link-setting']"
    :style="{width: setForm.width+'px'}"
  >
  <div class="setting-box">
    <div class="setting-title">
      <span>组件设置</span>
      <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
      </span>
    </div>
    <div class="setting" ref="contentRef" :style="{ maxHeight: setForm.maxHeight + 'px'}">
      <el-form ref="form">
        <div class="upload-wrap upload-wrap--list">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :multiple="true"
            :file-list="imgList"
            :http-request="onFileChange"
            :on-change="onFileChecked"
            :before-upload="beforeAvatarUpload"
            list-type="picture"
            :auto-upload="true"
            :show-file-list="false"
            accept=".png,.gif,.jpeg, .jpg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>+ 点击上传图片</em> ,或把图片拖到此处</div>
            <div class="el-upload__tip" slot="tip">建议宽度750像素，支持多选</div>
          </el-upload>
          <draggable class="upload-reviews" @update="imgListUpdated">
            <transition-group name="list-complete" >
              <div v-for="(rev, index) in imgList" :key="rev.url + index+new Date()" :index="index">
                <img-review-item :imgObj='rev' @file-change="fileModify" :isDel="true"
                ref="imgReview" :index="index" @file-remove="updateImgList(true, index)" />
              </div>
            </transition-group>
          </draggable>
        </div>
      </el-form>
    </div>
   </div>
   </div>
</template>

<script>
import oss from '@/service/oss';
import imgReviewItem from '@/components/editor/dragSetting/upload/imgReviewItem';
import draggable from 'vuedraggable';
import { dragCom } from '@/util/dragMxi';

export default {
  name: 'dragImgListSetting',
  mixins: [dragCom()],
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgReviewItem,
    draggable,
  },
  data() {
    return {
      isUpload: false,
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      imgList: [],
      fileSuccess: false,
    };
  },
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgListSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('location-change', 'dragImgLists', this.dragForm.location, 'imgListActive');
    },
    onFileChecked(params) {
      const addItem = {
        title: params.raw.name,
        url: '',
        isLoading: true,
      };
      this.imgList.push(addItem);
    },
    onFileSuccess(file, key) {
      const dragImg = new Image();
      const ele = this;
      const updateImg = {
        title: file.oldName,
        url: file.url,
        size: {
          w: 375,
        },
      };
      updateImg.location = {
        x: 0,
        y: 0,
      };
      dragImg.onload = () => {
        ele.$message({
          message: '图片上传成功～',
          type: 'success',
          duration: 2000,
        });
        if (key !== undefined) {
          ele.$refs.imgReview[key].uplaodDone(false, key);
        }
        const newH = (dragImg.height * ele.page.phoneWidth) / dragImg.width;
        if (!ele.fileSuccess) ele.fileSuccess = true;
        updateImg.size = {
          w: 375,
          h: newH,
        };
        ele.fileDone(key, updateImg);
        this.updateHeight();
      };
      dragImg.src = file.url;
      dragImg.onerror = () => {
        this.onFileError(key);
      };
    },
    onFileError(isModify, key) { // 图片上传失败
      this.fileAble = false;
      this.$message({
        message: '图片上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
      this.$refs.imgReview[key].uplaodDone(true);
      if (!isModify) {
        this.imgList.splice(key, 1);
      }
    },
    onFileChange(params, isModify, key) {
      let addFile;
      if (isModify) {
        addFile = params;
      } else {
        addFile = params.file;
      }
      const addItem = {
        title: addFile.name,
        url: '',
        isLoading: true,
      };
      if (isModify) {
        addItem.url = addFile.url;
        this.imgList[key] = addItem;
      }
      this.fileAble = true;
      const curKey = key !== undefined ? key : this.imgList.length - 1;
      this.fileUploading(addFile, curKey, isModify);
    },
    fileModify(file, isModify, key) {
      this.onFileChange(file, isModify, key);
    },
    async fileUploading(item, k, isModify) {
      try {
        const ele = this;
        const up = await oss(item, (progress) => {
          ele.imgList[k].pre = parseInt((progress.loaded / progress.total) * 100, 10);
          if (ele.imgList[k].pre === 100) {
            ele.$refs.imgReview[k].loadingPre(100);
          }
        });
        up.oldName = item.name;
        if (up && up.url) {
          this.imgList[k].url = up.url;
          this.onFileSuccess(up, k);
        } else {
          this.onFileError(isModify, k);
        }
      } catch (err) {
        this.onFileError(isModify, k);
      }
    },
    fileDone(key, updateImg) {
      const { dragImgLists, imgListActive } = this.editor;
      let imgLists = dragImgLists;
      this.imgList[key] = updateImg;
      const drag = imgLists[imgListActive];
      drag.imgList = this.imgList;
      const newDrag = Object.assign({}, drag);
      imgLists[imgListActive] = newDrag;
      imgLists = Object.assign([], imgLists);
      this.$store.commit('editor_update', {
        dragImgLists: imgLists,
      });
    },
    updateHeight() {
      let wrapH = this.dragForm.location.y || 0;
      this.imgList.map((item) => {
        if (item.size && item.size.h) {
          wrapH += item.size.h;
        }
        return true;
      });
      if (wrapH > this.page.phoneHeight) {
        this.$store.commit('page_update', {
          phoneHeight: wrapH,
          clientHeight: wrapH + 64,
        });
      }
      this.$refs.contentRef.scrollTop = this.$refs.contentRef.scrollHeight;
      this.$refs.contentRef.scrollIntoView();
    },
    imgListUpdated(evt) {
      const { oldIndex, newIndex } = evt;
      const newList = Object.assign([], this.imgList);
      const temp = this.imgList[newIndex];
      newList[newIndex] = this.imgList[oldIndex];
      newList[oldIndex] = temp;
      this.imgList = newList;
      this.updateImgList();
    },
    updateImgList(isRemove, index) {
      const { imgListActive } = this.editor;
      let { dragImgLists } = this.editor;
      const drag = dragImgLists[imgListActive];
      if (isRemove) {
        this.imgList = drag.imgList.filter((item, key) => key !== index);
      }
      drag.imgList = this.imgList;
      const newDrag = Object.assign({}, drag);
      dragImgLists[imgListActive] = newDrag;
      dragImgLists = Object.assign([], dragImgLists);
      this.$store.commit('editor_update', {
        dragImgLists,
      });
    },
    beforeAvatarUpload(file) { // 图片上传大小限制
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message({
          message: '上传图片大小不能超过 5MB!',
          type: 'error',
          duration: 2000,
        });
      }
      return isLt5M;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.imgList = this.dragForm.imgList;
    });
  },

};
</script>
<style>
.upload-wrap {
  position: relative;
}
.upload-dec {
  font-size: 12px;
    position: absolute;
    color: #999;
    left: 130px;
    bottom: 10px;
}
.file-upload:active .upload-dec {
  color: #fff;
}
.upload-wrap .el-upload-list__item {
  transition: all 0.1s;
}
.upload-wrap--list .el-upload-list {
  display: none;
}
</style>
