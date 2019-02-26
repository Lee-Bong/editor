<template>
  <base-setting :setForm="setForm">
   <template slot="form">
      <el-form ref="form" label-width="80px">
        <div class="upload-wrap" :class="[fileAble?'upload-disabled': '']"
          v-if="!dragForm.notModify">
          <el-upload :disabled="fileAble" class="upload-demo" drag :file-list="imgList"
            list-type="picture" :limit="limit"
            :http-request="fileToUpload"
            :before-upload="beforeAvatarUpload"
            :auto-upload="true" action="string" accept=".png,.gif,.jpeg, .jpg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em>+ 点击上传图片</em> ,或把图片拖到此处</div>
            <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
          </el-upload>
          <img-review-item v-if="imgList && imgList.length" :imgObj='imgList[0]'
            @file-change="fileModify" ref="imgReview" :index="0" :isDel="false"/>
        </div>
        <div class="file-info" v-if="!!dragForm.notModify">
          <img-review-item :imgObj='dragForm.img' @file-change="fileModify"
            ref="imgReview"/>
          <size-location-pro :form="{dragName, dragActive, size: dragForm.size,
            location: dragForm.location, minW: 15, minH: hmin, pH:formWrapH, maxW, maxH,}"/>
        </div>
        <div v-if="!!dragForm.notModify">
          <position-pro :dragForm="{dragName, dragActive,position: dragForm.position,
          size: dragForm.size,location: dragForm.location, type: dragForm.type}"/>
        </div>
      </el-form>
   </template>
   </base-setting>
</template>

<script>
import imgReviewItem from '@/components/editor/dragSetting/upload/imgReviewItem';
import oss from '@/service/oss';
import { dragCom } from '@/util/dragMxi';
import baseSetting from '@/components/editor/dragSetting/baseSetting';
import sizeLocationPro from '@/components/editor/dragSetting/proSetting/sizelocationPro';
import positionPro from '@/components/editor/dragSetting/proSetting/positionPro';

export default {
  mixins: [dragCom()],
  name: 'dragImgSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgReviewItem,
    baseSetting,
    sizeLocationPro,
    positionPro,
  },
  data() {
    return {
      dragName: 'dragImages',
      dragActive: 'imgActive',
      imgPrecent: 1,
      fileAble: false,
      isFirst: false, // 是否是更换图片
      limit: 1,
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 15,
      },
      imgList: [],
    };
  },
  computed: {
    maxW: {
      get() {
        let mW = this.page.phoneWidth - this.dragForm.location.x;
        const phoneH = this.dragForm.position === 'relative' ? this.page.phoneHeight : this.page.screenHeight;
        const mH = phoneH - this.dragForm.location.y;
        if ((mW * this.dragForm.size.h) / this.dragForm.size.w > mH) {
          mW = (this.dragForm.size.w * mH) / this.dragForm.size.h;
        }
        return mW;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    maxH: {
      get() {
        const mW = this.page.phoneWidth - this.dragForm.location.x;
        let mH = this.page.phoneHeight - this.dragForm.location.y;
        if ((this.dragForm.size.w * mH) / this.dragForm.size.h > mW) {
          mH = (mW * this.dragForm.size.h) / this.dragForm.size.w;
        }
        return mH;
      },
      set() {
      },
      immediate: true,
      deep: true,
    },
    hmin: {
      get() {
        return JSON.stringify(this.dragForm.img) !== '{}' && this.dragForm.img.h ? (this.dragForm.img.h * 15) / this.dragForm.img.w : 15;
      },
    },
    formWrapH() {
      return this.dragForm.position === 'relative' ? this.page.phoneHeight : this.page.screenHeight;
    },
  },
  methods: {
    onFileSuccess(file, isModify) {
      const dragImg = new Image();
      dragImg.src = file.url;
      const ele = this;
      dragImg.onload = () => {
        ele.$message({
          message: '图片上传成功～',
          type: 'success',
          duration: 2000,
        });
        if (isModify) {
          ele.$refs.imgReview.uplaodDone();
        }
        let images = ele.editor.dragImages;
        let drags = images[ele.editor.imgActive];
        let newH = dragImg.height;
        let newW = dragImg.width;
        const newDrag = {
          location: {
            x: 0,
            y: drags.location.y,
          },
        };
        if (dragImg.width > ele.page.phoneWidth) {
          newW = ele.page.phoneWidth;
          newH = (dragImg.height * ele.page.phoneWidth) / dragImg.width;
        }
        newDrag.isUpload = false;
        drags = Object.assign({}, drags, newDrag);
        images[ele.editor.imgActive] = drags;
        images = Object.assign([], images);
        ele.$store.commit('editor_update', { dragImages: images });
        const phoneH = drags.position === 'relative' ? ele.page.phoneHeight : ele.page.screenHeight;
        if (newH > phoneH - drags.location.y) {
          newDrag.location = {
            x: 0,
            y: phoneH - newH,
          };
        } else {
          newDrag.location = {
            x: 0,
            y: drags.location.y,
          };
        }
        newDrag.img = {
          title: file.oldName,
          url: file.url,
          w: newW,
          h: newH,
        };
        newDrag.size = {
          h: 0,
          w: 0,
        };
        if (!isModify) {
          newDrag.notModify = true;
        }
        newDrag.size = {
          h: newH,
          w: newW,
        };
        drags = Object.assign({}, drags, newDrag);
        images[ele.editor.imgActive] = drags;
        ele.$store.commit('editor_update', { dragImages: images });
        const ableTime = setTimeout(() => {
          ele.fileAble = false;
          clearTimeout(ableTime);
        }, 1000);
        ele.ratioSet(ele, 'dragImages', 'imgActive');
        // todo 解决aspectRatio只根据初始值设定比例
        // const loadTime = setTimeout(() => {
        //   drags.isUpload = true;
        //   images[this.editor.imgActive] = drags;
        //   this.$store.commit('editor_update', { dragImages: images });
        //   clearTimeout(loadTime);
        // }, 300);
      };
      dragImg.onerror = () => {
        ele.onFileError();
      };
    },
    onFileError() { // 图片上传失败
      this.fileAble = false;
      this.$message({
        message: '图片上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
    async onFileChange(file, list, isModify) {
      if (this.fileAble) return false;
      this.fileAble = true;
      try {
        const up = await oss(file);
        up.oldName = file.name;
        if (up && up.url) {
          this.imgList = [{
            title: file.name,
            url: up.url,
          }];
          this.onFileSuccess(up, isModify);
        } else {
          this.onFileError(isModify);
        }
      } catch (err) {
        this.onFileError(isModify);
      }
    },
    fileToUpload(item) {
      this.onFileChange(item.file);
    },
    fileModify(params) { // 更换图片
      this.isFirst = true;
      this.onFileChange(params, [], true);
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
    ratioSet(ele, dragList, active) {
      const lists = ele.editor[dragList];
      let drags = lists[ele.editor[active]];
      const ratioTime = setTimeout(() => {
        drags = Object.assign({}, drags, { isUpload: true });
        lists[ele.editor[active]] = drags;
        ele.$store.commit('editor_update', { [dragList]: lists });
        clearTimeout(ratioTime);
      }, 100);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.imgList = this.dragForm.imgList || [];
    });
  },
  updated() {
    this.$nextTick(() => {
      this.imgList = this.dragForm.imgList || [];
    });
  },
};
</script>

<style>
.file-upload {
  width: 220px;
  height: 100px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 15px;
  border: dashed 1px #ddd;
  cursor: pointer;
}

.file-upload:hover {
  color: #409eff;
  border-color: #409eff;
}

.file-upload:active {
  color: #fff;
  background-color: #409eff;
}
.upload-wrap {
  position: relative;
}
.upload-wrap .el-upload-dragger {
  height: 160px;
  width: 350px;
  color: #409eff;
  margin-left: 10px;
  margin-top: 15px;
}
.upload-disabled .el-upload-dragger{
  background-color: #ddd;
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
.upload-wrap .el-upload__tip {
  position: absolute;
  top: 140px;
  width: 100%;
  text-align: center;
}
.upload-wrap .el-upload-list {
  margin: 16px;
}
.upload-wrap .el-upload-list__item {
  outline: none;
}
</style>
