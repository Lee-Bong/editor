<template>
  <div class="img-upload-item">
    <div v-if="!imgObj||!imgObj.url">
      <el-button type="primary" plain size="mini" @click="uploadTrigger">{{'选择文件'}}</el-button>
      <span class="label-dec">{{dec || ''}}</span>
    </div>
    <input type="file" ref="fileUpload" @change="fileChange"
       class="check-upload" accept=".png,.gif,.jpeg, .jpg"/>
    <div v-if="imgObj&&imgObj.url">
      <div class="image-review">
        <div class="srouce-image"
        :style="{background: !imgObj.url ? '#ddd'
        : 'url('+ imgObj.url +') center center / cover no-repeat'}"></div>
        <div class="modify-image" @click="uploadTrigger">更换图片</div>
      </div>
      <el-button class="file-remove--plain" plain @click="fileRemove">删除图片</el-button>
    </div>
  </div>
</template>

<script>
import oss from '@/service/oss';

export default {
  name: 'HelloWorld',
  props: {
    imgObj: Object,
    dec: String,
  },
  data() {
    return {
    };
  },
  methods: {
    uploadTrigger() {
      this.$refs.fileUpload.click();
    },
    async fileChange(val) {
      try {
        const file = val.currentTarget.files[0];
        const up = await oss(file);
        // (up);
        up.beforeName = file.name;
        if (up && up.url) {
          this.$emit('upload-done', up);
        } else {
          this.onFileError();
        }
      } catch (err) {
        this.onFileError();
      }
    },
    fileRemove() {
      this.$refs.fileUpload.value = '';
      this.$emit('file-remove');
    },
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
  background: rgba(0, 0, 0, 0.5);
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
.modify-image .el-upload-list.el-upload-list--text {
  display: none !important;
}
.check-upload {
  display: none;
}
.file-remove--plain {
  position: absolute;
      top: 0;
    right: 0;
}
</style>
