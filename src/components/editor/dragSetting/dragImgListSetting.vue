<template>
  <div :class="['setting-content', $store.state.editor.isImgListSet
    ? 'setting-show' : '', 'link-setting']"
    :style="{width: setForm.width+'px'}"
  >

  <!-- <vue-drag-resize
    class="setting-content"
    :isActive="true"
    :w="280"
    :h="sHeight"
    :x="600"
    :y="66"
    :isResizable="false"> -->
  <div class="setting-box">
    <div class="setting-title">
      <span>组件设置</span>
      <span class="header-btn">
          <i class="el-icon-news" @click="settingFixed"></i>
          <i class="el-icon-close" @click="settingClose"></i>
      </span>
    </div>
    <div class="setting">
      <el-form ref="form">
        <el-form-item label="位置：" size="mini">
          <el-input-number v-model="dragForm.location.x" @blur="locationChange"
            :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
          <el-input-number v-model="dragForm.location.y" @blur="locationChange"
            :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)"
            label="描述文字" controls-position="right" class="num-input"></el-input-number>
        </el-form-item>
        <div class="dec-label"> <label>X</label> <label> Y</label></div>
        <div class="upload-wrap">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple=true
            :file-list="dragForm.imglist"
            :on-success="onFileSuccess"
            :on-error="onFileError"
            :on-remove="onFileRemove"
            list-type="picture"
            accept="image/jpeg">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text"><em>+ 点击上传图片</em> ,或把图片拖到此处</div>
            <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
          </el-upload>
        <!-- <file-upload
          class="file-upload"
          url=''
          inputOfFile="file"
          extensions="png,gif,jpeg,jpg"
          @imageUploading="imageUploading"
          @imageuploaded="imageuploaded"
          @errorHandle="errorHandle"></file-upload> -->
        <span class="upload-dec"></span>
        </div>
      </el-form>
    </div>
   <!-- </vue-drag-resize> -->
   </div>
   </div>
</template>

<script>

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
      sHeight: 800,

      sizeList: ['12px', '14px'],

      location: {
        x: 10000,
        y: 0,
        xmin: 0,
        xmax: 10000000,
        ymin: 0,
        ymax: 100,
      },
      size: {
        w: 80,
        h: 80,
        wmin: 0,
        wmax: 1000000,
        hmin: 0,
        hmax: 1000000,
      },
      form: '',
      textAlign: 1,
      textColor: 'rgba(19, 206, 102, 0.8)',
    };
  },
  methods: {
    textInputFocus() {
    },
    textInputClick() {
    },
    onFileSuccess(rep, file, fileList) {
      this.fileSet(fileList);
    },
    onFileError() { // err, file, fileList图片上传失败
    },
    onFileRemove(file, fileList) {
      this.fileSet(fileList);
    },
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
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgListSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragImageLists', this.dragForm.location, 'imgListActive');
    },

    imageUploading() {

    },
    errorHandle() { // 图片上传异常

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
