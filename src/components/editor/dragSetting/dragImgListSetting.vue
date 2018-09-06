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
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :disabled="!isUpload"
            :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :disabled="!isUpload"
            :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <div class="upload-wrap">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :multiple="true"
            :file-list="dragForm.imglist"
            :on-change="onFileChange"
            list-type=""
            :auto-upload="false"
            accept=".png,.gif,.jpeg, .jpg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>+ 点击上传图片</em> ,或把图片拖到此处</div>
            <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
          </el-upload>
        <span class="upload-dec"></span>
        </div>
      </el-form>
    </div>
   </div>
   </div>
</template>

<script>
import oss from '@/util/oss';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
  },
  data() {
    return {
      isUpLoad: false,
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
    };
  },
  methods: {
    fileSet(fileList) {
      const { dragImageLists, imgListActive } = this.$store.state.editor;
      if (fileList.length) {
        fileList.map((item) => {
          dragImageLists[imgListActive].imglist.push({
            name: item.name, // todo 需要图片原本名
            url: URL.createObjectURL(item.raw),
          });
          return true;
        });
      }
      this.$store.commit('editor_update', { dragImageLists });
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgListSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragImageLists', this.dragForm.location, 'imgListActive');
    },
    async onFileChange(file) {
      const up = await oss(file.raw);
      if (up && up.url) {
        this.onFileSuccess(up);
      } else {
        this.onFileError();
      }
    },
    onFileSuccess(file) {
      const dragImg = new Image();
      dragImg.src = file.url;
      dragImg.onload = () => {
        this.isUpLoad = true;
        console.info(`${dragImg.height}sss${dragImg.width}`);
        this.$message({
          message: '图片上传成功～',
          type: 'success',
          duration: 2000,
        });
        const images = this.$store.state.editor.dragImages;
        const drags = images[this.$store.state.editor.imgActive];
        const newH = (dragImg.height * this.$store.state.editor.phoneWidth) / dragImg.width;

        drags.img = {
          // isUpload: true,
          title: file.name,
          url: file.url,
          w: this.$store.state.editor.phoneWidth,
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
          w: this.$store.state.editor.phoneWidth,
        };

        drags.isUpload = false;
        images[this.$store.state.editor.imgActive] = drags;
        this.$store.commit('editor_update', { dragImages: images });
        this.fileSuccess = true;
        this.fileAble = true;
        // todo 解决aspectRatio只根据初始值设定比例
        setTimeout(() => {
          drags.isUpload = true;
          images[this.$store.state.editor.imgActive] = drags;
          this.$store.commit('editor_update', { dragImages: images });
        }, 100);
      };
      dragImg.onerror = function () {
        this.onFileError();
      };
    },
    onFileError() { // 图片上传失败
      this.fileFail = true;
      this.fileAble = false;
      this.$message({
        message: '图片上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
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
</style>
