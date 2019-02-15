<template>
  <div :class="['form-upload-wrap',
    attr.isRequired? 'from-required': '', 'iphone-input']">
    <div class="upload-label">{{attr.label}}</div>
    <div class="file-list-item" v-for="(item, i) in fileList" :key="item.url"
    :style="{background: '#ddd url('+ item.url + ') center center / cover no-repeat'}">
    <!-- <div class="file-list-item" v-for="(item, i) in fileList" :key="item.url"
    :style="{background: '#ddd'}" v-if="item === 'loading'"> -->
      <i class="el-icon-circle-close-outline file-remove-icon" @click="imageRemove(i)"></i>
      <!-- <input class="shadow-bg file-pre-cover" @focus="imageFocus(i)" @blur="imageBlur(i)"/> -->
      <div class="file-shadow shadow-bg" v-show="activeImage === i">
        <!-- <i class="el-icon-delete" @click  ="imageRemove(i)"></i> -->
      </div>
    </div>
    <div class="file-upload-btn">
      <input type="file" accept="image/*" id="upload" name="upload"
      :class="['file-upload-origin', attr.disabled && 'file-upload-disabled']"
      @change="fileCheckedChange" :disabled="attr.disabled">
      <i class="el-icon-plus" style="z-index: 40;"></i>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" class="pre-img">
    </el-dialog>
  </div>
</template>
<script>
import { fileUplaod } from '@/service';

export default {
  name: 'wupload',
  data() {
    return {
      fileList: [],
      itemW: window.innerWidth / 5,
      fileCount: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      cancleUpload: false, // 不符合要求，取消上传
      activeImage: -1,
    };
  },
  props: {
    attr: {
      type: Object,
      default: () => ({ label: '上传图片' }),
    },
    index: Number,
  },
  methods: {
    fileCheckedChange(event) { // 选取文件
      try {
        const { files } = event.target;
        if (files.length + this.fileCount > 4) { // todo 没有
          this.$emit('sendToast', '最多只能选择4张图片，请重试!');
          return false;
        }
        const ele = this;
        Array.from(files).map((item) => {
          const file = item;
          if (ele.beforeUpload(file)) {
            ele.fileToUpload(file);
          }
          return true;
        });
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      } catch (err) {
        this.$emit('sendToast', '上传文件失败，请重试!');
      }
    },
    imageFocus(i) {
      this.activeImage = i;
    },
    imageBlur() {
      const blurTimer = setTimeout(() => {
        this.activeImage = -1;
        clearTimeout(blurTimer);
      }, 500);
    },
    imageRemove(i) {
      this.handleImageRemove(i);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileToUpload(file) {
      const reader = new FileReader();
      const ele = this;
      const curIndex = this.fileCount;
      this.fileList[curIndex] = 'loading';
      reader.onload = function cb(e) {
        ele.fileToLoad(e);
      };
      reader.onerror = function cn() {
        ele.$emit('sendToast', '文件上传失败，请重试!');
        if (this.fileList[curIndex] === 'loading') {
          ele.handleImageRemove(curIndex);
        }
        throw new Error();
      };
      reader.readAsDataURL(file);
    },
    async fileToLoad(e) {
      const formData = new FormData();
      formData.append('base64', e.target.result);
      const up = await fileUplaod(formData);
      if (up && up.code === 0 && up.data && up.data.url) {
        const { url } = up.data;
        this.fileList[this.fileCount] = {
          index: this.fileCount,
          name: url,
          url,
        };
        this.fileList = Object.assign([], this.fileList);
        this.fileCount++;
        let values = '';
        this.fileList.map((item, i) => {
          values += item.url;
          if (i < this.fileList.length - 1) values += ', ';
          return true;
        });
        this.$emit('valueEvent', values, this.index);
        this.$emit('propsSetting', 'images', this.fileList, this.index);
      }
    },
    handleImageRemove(index) {
      this.fileList.splice(index, 1);
      this.fileList.map((item, i) => {
        this.fileList[i].index = i;
        return true;
      });
      this.fileList = Object.assign([], this.fileList);
      this.fileCount--;
      const files = this.fileList.length ? this.fileList : null;
      this.$emit('valueEvent', files, this.index);
    },
    beforeUpload(file) {
      const isLt5M = file.size < (1024 * 1024 * 5);
      if (!isLt5M) {
        this.$emit('sendToast', '上传文件大小不能超过5MB!');
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.from-required:before {
    content: '*';
    color: #D0021B;
    position: absolute;
    font-size: 14px;
    top: 13px;
    left: 7px;
}
.w-text .el-input__inner {
  line-height: 18px;
}
.form-upload-wrap .el-upload__tip {
  position: absolute;
  top: 0;
  right: 5px;
  left: 85px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.w-form-upload {
  height: 32px;
  width: 80px !important;
  color: #fff;
  font-size: 14px;
  width: 100%;
  display: block;
  border: 0;
  background-color: #5ac7f9;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
}
.form-upload-wrap .el-upload-list--picture-card .el-upload-list__item,
.form-upload-wrap .el-upload--picture-card {
  height: 60px;
  width: 60px;
}
.form-upload-wrap .el-upload--picture-card {
  position: relative;
}
.form-upload-wrap .el-icon-plus {
  font-size: 20px;
  position: absolute;
  left: 50%;
  margin-left: -10px;
  top: 50%;
  margin-top: -10px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label {
  width: 35px;
  top: -10px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label i {
  margin-top: 12px;
}
.form-upload-wrap .upload-label {
  font-size: 14px;
  color: #606266;
  padding-left: 7px;
  /* margin-bottom: 5px; */
}
.form-upload-wrap {
  overflow: hidden;
  height: 95px;
}
.form-upload-wrap.from-required:before {
  left: 0;
  top: 0;
}
.form-upload-wrap .el-icon-close-tip {
  display: none!important;
}
.disabled-upload .el-upload {
  cursor: default;
}
.file-upload-btn {
  position: relative;
  display: inline-block;
  height: 60px;
  width: 60px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 4px;
  margin-top: 8px;
  color: #8c939d;
}
.file-upload-btn:hover,
.file-upload-btn:active {
  border: 1px dashed #409EFF;
}
.file-upload-origin {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  height: 60px;
  width: 60px;
  z-index: 50;
  cursor: pointer;
}
.file-list-item {
  display: inline-block;
  height: 60px;
  width: 60px;
  margin-right: 10px;
  margin-top: 8px;
  position: relative;
  border: 1px solid #ddd;
}
.shadow-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.file-shadow {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}
.file-shadow i {
  cursor: pointer;
}
.file-pre-cover {
  opacity: 0;
}
.file-remove-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ddd;
  border-radius: 100%;
  color: #999;
  cursor: pointer;
}
.file-upload-disabled {
  cursor: default;
}
</style>
