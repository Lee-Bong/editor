<template>
  <div :class="['setting-content', $store.state.editor.isImgSet ?
    'setting-show' : '']" :style="{width: setForm.width+'px',
  }">
    <div class="setting-box">
      <div class="setting-title">
        <span>组件设置</span>
        <span class="header-btn">
          <i class="el-icon-close" @click="settingClose"></i>
        </span>
      </div>
      <div class="setting">
        <el-form ref="form">
          <div class="upload-wrap" :class="[fileAble?'upload-disabled': '']"
            v-if="!dragForm.notModify">
            <el-upload :disabled="fileAble" class="upload-demo" drag :file-list="imgList"
              :on-change="onFileChange" list-type="picture" :limit="limit"
              :auto-upload="true" action="" accept=".png,.gif,.jpeg, .jpg">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>+ 点击上传图片</em> ,或把图片拖到此处</div>
              <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
            </el-upload>
            <img-review-item v-if="imgList && imgList.length" :imgObj='rev'
              @file-change="fileModify" ref="imgReview" :index="index" />
          </div>
          <div class="file-info" v-if="!!dragForm.notModify">
            <img-review-item :imgObj='dragForm.img' @file-change="fileModify"
              ref="imgReview"/>
            <el-form-item label="位置：" size="mini">
              <el-input-number v-model="dragForm.location.x" @change="locationChange"
                :min="location.xmin" :max="($store.state.page.phoneWidth-dragForm.size.w)"
                controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.location.y" @change="locationChange"
                :min="location.ymin" :max="($store.state.page.phoneHeight-dragForm.size.h)"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label">
              <label>X</label>
              <label> Y</label>
            </div>
            <el-form-item label="尺寸：" size="mini">
              <el-input-number v-model="dragForm.size.w" @change="sizeChange(1)"
                :min="size.wmin" :max="$store.state.page.phoneWidth-dragForm.location.x"
                controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.size.h" @change="sizeChange(2)"
                :min="size.hmin" :max="$store.state.page.phoneHeight-dragForm.location.y"
                controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label">
              <label>宽</label>
              <label>高</label>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import imgReviewItem from '@/components/editor/dragItem/image/imgReviewItem';
import oss from '@/util/oss';

export default {
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
      // imgObj: {
      //   source: 'http://pic30.photophoto.cn/20140310/0008020974539766_b.jpg',
      //   alt: '这是图片标题',
      // },
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
  computed: {

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
        const maxH = this.$store.state.page.phoneHeight - this.dragForm.location.y;
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
        const maxW = this.$store.state.page.phoneWidth - this.dragForm.location.x;
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
        const images = this.$store.state.editor.dragImages;
        const drags = images[this.$store.state.editor.imgActive];
        const newH = (dragImg.height * this.$store.state.page.phoneWidth) / dragImg.width;

        drags.img = {
          title: file.oldName,
          url: file.url,
          w: this.$store.state.page.phoneWidth,
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
          w: this.$store.state.page.phoneWidth,
        };
        if (!isModify) {
          drags.notModify = true;
        }
        drags.isUpload = false;
        images[this.$store.state.editor.imgActive] = drags;
        this.$store.commit('editor_update', { dragImages: images });
        this.fileSuccess = true;
        const ableTime = setTimeout(() => {
          this.fileAble = false;
          clearTimeout(ableTime);
        }, 1000);

        // todo 解决aspectRatio只根据初始值设定比例
        const loadTime = setTimeout(() => {
          drags.isUpload = true;
          images[this.$store.state.editor.imgActive] = drags;
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
        const up = await oss(file.raw);
        up.oldName = file.name;
        if (up && up.url) {
          this.imgList = [file];
          // this.onFileSuccess(up, isModify);
        } else {
          this.onFileError(isModify);
        }
      } catch (err) {
        this.onFileError(isModify);
      }
    },
    fileModify(file) { // 更换图片
      this.isFirst = true;
      this.onFileChange(file, [], true);
    },
  },
  mounted() {
    this.imgList = this.dragForm.imgList;
  },
  updated() {
    this.imgList = this.dragForm.imgList;
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
  width: 320px;
  color: #409eff;
  margin-left: 15px;
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
  top: 120px;
  /* left: 100px; */
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
