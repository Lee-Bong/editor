<template>
  <div :class="['setting-content', editor.isImgSet ?
    'setting-show' : '']" :style="{width: setForm.width+'px',
  }">
    <div class="setting-box">
      <div class="setting-title">
        <span>组件设置</span>
        <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
        </span>
      </div>
      <div class="setting" :style="{ maxHeight: setForm.maxHeight + 'px'}">
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
            <el-form-item label="位置：" size="mini" class="number-item">
              <el-input-number v-model="dragForm.location.x" @change="locationChange"
                :min="location.xmin" :max="(page.phoneWidth-dragForm.size.w)"
                controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.location.y" @change="locationChange"
                :min="location.ymin" :max="yMax"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label">
              <label>X</label>
              <label> Y</label>
            </div>
            <el-form-item label="尺寸：" size="mini" class="number-item">
              <el-input-number v-model="dragForm.size.w" @change="sizeChange(1)"
                :min="size.wmin" :max="page.phoneWidth-dragForm.location.x"
                controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.size.h" @change="sizeChange(2)"
                :min="size.hmin" :max="page.phoneHeight-dragForm.location.y"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label">
              <label>宽</label>
              <label>高</label>
            </div>
          </div>
          <div v-if="!!dragForm.notModify">
            <el-form-item label="固定位置：" size="mini" class="posotion-item">
            <el-radio v-model="dragForm.position" label="relative">不固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedTop" @change="positionChange"
              >相对顶部固定</el-radio>
            <el-radio v-model="dragForm.position" label="fixedBottom" @change="positionChange"
              >相对底部固定</el-radio>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedTop'">
              <el-input-number
                v-model="fixedTop" @change="fixedTopChange"
                :min="location.ymin" :max="(page.screenHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <el-form-item label="距离：" size="mini" v-if="dragForm.position === 'fixedBottom'"
              class="number-item">
              <el-input-number
                v-model="fixedBottom" @change="fixedBottomChange"
                :min="location.ymin" :max="(page.phoneHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import imgReviewItem from '@/components/editor/dragSetting/upload/imgReviewItem';
import oss from '@/service/oss';
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'DragImgSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgReviewItem,
  },
  data() {
    return {
      imgPrecent: 1,
      fileSuccess: false,
      fileAble: false,
      isFirst: false, // 是否是更换图片
      files: [],
      sHeight: 500,
      limit: 1,
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      imgList: [],
    };
  },
  methods: {
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragImages', this.dragForm.location, 'imgActive');
    },
    sizeChange(type) { // 大小值发生改变
      let { size } = this.dragForm;
      const { img } = this.dragForm;
      if (type === 1) {
        let newW = size.w;
        let newH = (img.h * size.w) / img.w;
        const maxH = this.page.phoneHeight - this.dragForm.location.y;
        if (newH > maxH) {
          newH = maxH;
          newW = (img.w * newH) / img.h;
        }
        size = {
          w: newW,
          h: newH,
        };
      } else {
        let newW = (img.w * size.h) / img.h;
        let newH = size.h;
        const maxW = this.page.phoneWidth - this.dragForm.location.x;
        if (newW > maxW) {
          newW = maxW;
          newH = (img.h * newW) / img.w;
        }
        size = {
          w: newW,
          h: newH,
        };
      }
      this.$emit('input-sizeChange', 'dragImages', size, 'imgActive');
      // this.$emit('input-locationChange', 'dragImages', this.dragForm.location, 'imgActive');
    },
    onFileSuccess(file, isModify) {
      const dragImg = new Image();
      dragImg.src = file.url;
      const ele = this;
      dragImg.onload = () => {
        this.$message({
          message: '图片上传成功～',
          type: 'success',
          duration: 2000,
        });
        if (isModify) {
          this.$refs.imgReview.uplaodDone();
        }
        const images = this.editor.dragImages;
        const drags = images[this.editor.imgActive];
        const newH = (dragImg.height * this.page.phoneWidth) / dragImg.width;

        drags.img = {
          title: file.oldName,
          url: file.url,
          w: this.page.phoneWidth,
          h: newH,
        };
        if (this.isFirst) {
          drags.location = {
            x: 0,
            y: 0,
          };
        }
        drags.size = {
          h: newH,
          w: this.page.phoneWidth,
        };
        if (!isModify) {
          drags.notModify = true;
        }
        drags.isUpload = false;
        images[this.editor.imgActive] = drags;
        this.$store.commit('editor_update', { dragImages: images });
        this.fileSuccess = true;
        const ableTime = setTimeout(() => {
          this.fileAble = false;
          clearTimeout(ableTime);
        }, 1000);

        // todo 解决aspectRatio只根据初始值设定比例
        const loadTime = setTimeout(() => {
          drags.isUpload = true;
          images[this.editor.imgActive] = drags;
          this.$store.commit('editor_update', { dragImages: images });
          clearTimeout(loadTime);
        }, 100);
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
    fileModify(file) { // 更换图片
      this.isFirst = true;
      this.onFileChange(file, [], true);
    },
    positionChange() {
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        const { location } = this.dragForm;
        location.y = maxBottom;
        this.$emit('input-locationChange', 'dragImages', location, 'imgActive');
      }
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
