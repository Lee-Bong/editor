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
                :min="size.wmin" :max="maxW"
                controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.size.h" @change="sizeChange(2)"
                :min="hmin" :max="maxH"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label">
              <label>宽</label>
              <label>高</label>
            </div>
          </div>
          <div v-if="!!dragForm.notModify">
            <el-form-item label="固定位置：" size="mini" class="posotion-item">
              <el-radio v-model="dragForm.position" label="relative"
                @change="positionChange('relative')">不固定</el-radio>
              <el-radio v-model="dragForm.position" label="fixedTop"
                @change="positionChange('fixedTop')"
                >相对顶部固定</el-radio>
              <el-radio v-model="dragForm.position" label="fixedBottom"
                @change="positionChange('fixedBottom')"
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
        const mH = this.page.phoneHeight - this.dragForm.location.y;
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
      const lists = this.editor.dragImages;
      let drags = lists[this.editor.imgActive];

      drags = Object.assign({}, drags, { size, isUpload: false });
      lists[this.editor.imgActive] = drags;
      this.$store.commit('editor_update', { dragImages: lists });
      this.ratioSet(this, 'dragImages', 'imgActive');
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
        let drags = images[this.editor.imgActive];
        let newH = dragImg.height;
        let newW = dragImg.width;
        const newDrag = {
          location: {
            x: 0,
            y: drags.location.y,
          },
        };
        if (dragImg.width > this.page.phoneWidth) {
          newW = this.page.phoneWidth;
          newH = (dragImg.height * this.page.phoneWidth) / dragImg.width;
        }
        const phoneH = drags.position === 'relative' ? this.page.phoneHeight : this.page.screenHeight;
        if (isModify && newH > phoneH - drags.location.y) {
          newDrag.location.y = phoneH - newH;
        }

        newDrag.img = {
          title: file.oldName,
          url: file.url,
          w: newW,
          h: newH,
        };
        newDrag.location.x = 0;
        newDrag.size = {
          h: newH,
          w: newW,
        };
        if (!isModify) {
          newDrag.notModify = true;
        }
        newDrag.isUpload = false;
        drags = Object.assign({}, drags, newDrag);
        images[this.editor.imgActive] = drags;
        this.$store.commit('editor_update', { dragImages: images });
        const ableTime = setTimeout(() => {
          this.fileAble = false;
          clearTimeout(ableTime);
        }, 1000);
        this.ratioSet(this, 'dragImages', 'imgActive');
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
    positionChange(val) {
      const { dragImages, imgActive } = this.editor;
      if (val !== 'relative' && this.dragForm.size.h > this.page.screenHeight) {
        this.$message({
          message: '组件高度大于一屏，无法设置固定位置～',
          type: 'error',
          duration: 2000,
        });
        dragImages[imgActive].position = 'relative';
        this.$store.commit('editor_update', {
          dragImages,
        });
        return false;
      }
      dragImages[imgActive].position = val;
      dragImages[imgActive].isUpload = false;
      this.$store.commit('editor_update', {
        dragImages,
      });
      const maxBottom = this.page.screenHeight - this.dragForm.size.h;
      if (this.dragForm.location.y > maxBottom) {
        let { location } = this.dragForm;
        location = {
          x: location.x,
          y: maxBottom,
        };
        this.$emit('input-locationChange', 'dragImages', location, 'imgActive');
      }
      this.ratioSet(this, 'dragImages', 'imgActive');
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
