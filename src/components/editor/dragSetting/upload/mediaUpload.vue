<template>
  <div class="img-upload-item">
    <div v-if="!(this.source && this.source.url) && !isLoading">
      <el-button type="primary" plain size="mini" @click="uploadTrigger"
      >{{'选择文件'}}</el-button>
      <span class="label-dec" style="right: 85px">{{dec || ''}}</span>
    </div>
    <input type="file" ref="fileUpload" @change="fileChange"
       class="check-upload" :accept="source.accept"/>
    <el-progress :percentage="pre" v-show="pre"
     class="modify-precent" :class="[isLoading?'precent-out' : 'precent-in']"></el-progress>
    <span class="loadding-tip" v-show="isLoading">文件上传中，请耐心等待，期间编辑页面将打断上传</span>
    <div v-show="source && source.title">
      <div class="audio-name">{{source.name}}</div>
      <el-button class="file-remove--plain" plain @click="fileRemove">删除</el-button>
    </div>
  </div>
</template>

<script>
import oss from '@/service/oss';

export default {
  name: 'HelloWorld',
  props: {
    source: Object,
    dec: String,
  },
  data() {
    return {
      pre: 0,
      isLoading: false,
    };
  },
  methods: {
    uploadTrigger() {
      this.$refs.fileUpload.click();
    },
    async fileChange(val) {
      try {
        this.isLoading = true;
        const file = val.currentTarget.files[0];
        const ele = this;
        const up = await oss(file, (progress) => {
          ele.pre = parseInt((progress.loaded / progress.total) * 100, 10);
        });
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
        message: '资源上传成功～',
        type: 'success',
        duration: 2000,
      });
    },
    onFileError() {
      this.$message({
        message: '资源上传失败，请重试～',
        type: 'error',
        duration: 2000,
      });
      this.$refs.fileUpload.value = '';
      this.uplaodDone(true);
    },
    uplaodDone(isError) {
      if (!isError) {
        this.pre = 100;
        this.isLoading = false;
        const clearTime = setTimeout(() => {
          this.pre = 0;
          clearTimeout(clearTime);
        }, 1000);
      } else {
        this.isLoading = false;
        this.pre = 0;
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
.audio-name {
      max-width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.img-upload-item .modify-precent {
  width: 280px;
  margin-top: 0;
  position: absolute;
  top: 0;
}

.img-upload-item .precent-in {
  transition: opacity 0s;
}
.loadding-tip {
  color: red;
  width: 290px;
  display: block;
  font-size: 12px;
  padding-top: 12px;
}

</style>
