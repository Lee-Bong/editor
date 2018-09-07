<template>
<div class="img-review-item">
  <div class="image-review">
    <div class="srouce-image"
    :style="{background: 'url('+ imgObj.url +') center center / cover no-repeat'}"></div>
    <div class="modify-image">
      <el-upload
        class="upload-modify"
        action=""
        :show-file-list="false"
        :limit="1"
        accept=".png,.gif,.jpeg, .jpg"
        :on-remove="onFileRemove"
        :on-change="onFileChange">
        <div class="el-upload__text">更换图片</div>
      </el-upload>
    </div>
  </div>
  <div class="image-alt">
    <el-input v-model="imgObj.title" :title="imgObj.title" class="alt-input" clearable></el-input>
    <el-progress  :percentage="pre"
     class="modify-precent" :class="[isLoading?'precent-out' : 'precent-in']"></el-progress>
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
      isLoading: false,
      pre: 0,
    };
  },
  methods: {
    onFileChange(file) {
      this.loadingPre();
      this.$emit('file-change', file);
    },
    uplaodDone() {
      this.pre = 100;
      this.isLoading = false;
      const clearTime = setTimeout(() => {
        this.pre = 0;
        clearTimeout(clearTime);
      }, 3000);
    },
    loadingPre() {
      this.isLoading = true;
      let i = 0;
      const step = 7;
      const loadingTime = setInterval(() => {
        if (this.pre >= 91) {
          clearInterval(loadingTime);
          return false;
        }
        this.pre = i;
        i += step;
      }, 15);
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
  .modify-precent {
    margin-top: 20px;
    opacity: 0;
  }
  .precent-out {
    opacity: 1;
    transition: opacity 0s;
  }
  .precent-in {
    opacity: 0;
    transition: opacity 1s;
  }
</style>
