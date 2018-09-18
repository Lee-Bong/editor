<template>
  <div :class="['setting-content', $store.state.editor.isImgListSet
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
    <div class="setting">
      <el-form ref="form">
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @change="locationChange"
            :disabled="!fileSuccess"
            :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
            controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @change="locationChange"
            :disabled="!fileSuccess"
            :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
            controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <div class="upload-wrap upload-wrap--list">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :multiple="true"
            :file-list="dragForm.imgList"
            :http-request="onFileChange"
            list-type="picture"
            :auto-upload="true"
            :show-file-list="false"
            accept=".png,.gif,.jpeg, .jpg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>+ 点击上传图片</em> ,或把图片拖到此处</div>
            <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
          </el-upload>
          <draggable class="upload-reviews">
            <transition-group name="list-complete" >
              <div v-for="(rev, index) in imgList" :key="index">
                <img-review-item :imgObj='rev' @file-change="fileModify"
                ref="imgReview" :index="index" />
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
import oss from '@/util/oss';
import imgReviewItem from '@/components/editor/dragSetting/upload/imgReviewItem';
import draggable from 'vuedraggable';

export default {
  name: 'DragSetting',
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
      this.$emit('input-locationChange', 'dragImgLists', this.dragForm.location, 'imgListActive');
    },
    onFileSuccess(file, key) {
      const dragImg = new Image();
      dragImg.src = file.url;
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
      ele.fileDone(key, updateImg);
      dragImg.onload = () => {
        ele.$message({
          message: '图片上传成功～',
          type: 'success',
          duration: 2000,
        });
        if (key !== undefined) {
          ele.$refs.imgReview[key].uplaodDone();
        }
        const newH = (dragImg.height * ele.$store.state.page.phoneWidth) / dragImg.width;
        if (!ele.fileSuccess) ele.fileSuccess = true;
        updateImg.size = {
          w: 375,
          h: newH,
        };
        ele.fileDone(key, updateImg);
      };
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
      if (!isModify) {
        this.$refs.imgReview[key].uplaodDone(true);
        this.imgList.splice(key, 1);
      }
    },
    onFileChange(params, isModify, key) {
      const file = isModify ? params : params.file;
      const addItem = {
        title: file.name,
        url: '',
        isLoading: true,
      };
      if (!isModify) {
        this.imgList.push(addItem);
      } else {
        addItem.url = file.url;
        this.imgList[key] = addItem;
      }
      this.fileAble = true;
      const curKey = key !== undefined ? key : this.imgList.length - 1;
      this.fileUploading(file, curKey, isModify);
    },
    fileModify(file, isModify, key) {
      this.onFileChange(file, isModify, key);
    },
    async fileUploading(item, k, isModify) {
      try {
        const upItem = isModify ? item.raw : item;
        const up = await oss(upItem);
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
      const { dragImgLists, imgListActive } = this.$store.state.editor;
      const imgLists = dragImgLists;
      this.imgList[key] = updateImg;
      const drag = imgLists[imgListActive];
      drag.imgList = this.imgList;
      imgLists[imgListActive] = drag;
      this.$set(this.$store.state.editor, 'dragImgLists', imgLists);
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
.link-el.el-form-item--mini .el-form-item__content {
    display: inline-block;
    width: 255px;
}
.link-setting .el-form-item__label {
    padding-right: 5px;
}
.upload-wrap {
  position: relative;
}
.upload-wrap .el-upload-dragger {
  height: 160px;
  width: 320px;
  color: #409eff;
  margin-left: 15px;
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
.drag-del {
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #888;
  border-radius: 20px;
  right: -10px;
  top: -10px;
  cursor: pointer;
      background-color: #ddd;
      z-index: 1090;
}
</style>
