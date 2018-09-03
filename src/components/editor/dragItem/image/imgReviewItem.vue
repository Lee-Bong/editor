<template>
<div class="img-review-item">
  <div class="image-review">
    <div class="srouce-image"
    :style="{background: 'url('+ imgObj.source +')',
      backgroundRepeat: 'no-repeat', backgroundPosition: 'center center',
      backgroundSize:'cover' }"></div>
    <div class="modify-image">
      <el-upload
        class="upload-modify"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :limit="1"
        accept="png,gif,jpeg,jpg"
        :on-success="onFileSuccess"
        :on-error="onFileError"
        :on-remove="onFileRemove"
        :on-change="onFileChange">
        <div class="el-upload__text">更换图片</div>
      </el-upload>
    </div>
  </div>
  <div class="image-alt">
    <el-input v-model="imgObj.alt" class="alt-input" clearable></el-input>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    imgObj: Object,
  },
  data() {
    return {

    };
  },
  methods: {
    onFileSuccess() {
      this.$message({
        message: '图片上传成功～',
        type: 'success',
        duration: 2000,
      });
    },
    onFileError() {
      this.$message({
        message: '图片上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
    },
    onFileRemove() {

    },
    onFileChange() {
    },
  },
};
</script>

<style>
  .img-review-item {
    display: flex;
        border: 1px dashed #ddd;
    padding: 10px;
    margin: 10px;

  }
  .image-review {
      position: relative;
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border: 1px solid #e5e5e5;
        text-align: center;
    }
    .srouce-image {
        height: 80px;
        width: 100px;
            border: 0;
            outline: none;
        }
        .modify-image {
          position: absolute;
          color: #fff;
      background: rgba(0,0,0,.5);
      bottom: 0;
      width: 100%;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
      flex-shrink: 0;
        }
        .image-alt {
          flex-grow: 1;
          flex-shrink: 1;
        }
  .alt-input .el-input__inner {
    height: 30px;
    border-radius: 2px;
    padding: 0 8px;
    line-height: 30px;
    font-size: 12px;


  }
    .modify-image  .el-upload-list.el-upload-list--text {
display: none!important;
  }
</style>
