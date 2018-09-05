<template>
<div class="img-upload-item">
  <input type="file" @change="fileChange"/>
</div>
</template>

<script>
import oss from '@/util/oss';
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
    async fileChange(val) {
        var file = val.currentTarget.files[0];
        const up = await oss(file);
        up.beforeName = file.name;
        debugger;
        if (up && up.url) {
        this.$emit('upload-done', up);
      } else {
        // this.onFileError();
      }
      
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
