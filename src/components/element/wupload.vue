<template>
  <div :class="['form-upload-wrap',
    attr.isRequired? 'from-required': '', 'iphone-input']">
    <div class="upload-label">{{attr.label}}</div>
    <el-upload
      :class="[attr.disabled ? 'disabled-upload' : '']"
      :disabled="attr.disabled"
      action=""
      accept=".png, .jpg, .jpeg, .gif"
      :limit="4"
      :auto-upload="true"
      :on-preview="handlePictureCardPreview"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="fileToUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" class="pre-img">
    </el-dialog>
  </div>
</template>
<script>
import oss from '@/service/oss';

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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async fileToUpload(file) {
      if (file.file) {
        this.fileCount++;
        const up = await oss(file.file);
        if (up && up.url) {
          this.fileList.push({
            index: this.fileCount - 1,
            name: up.url,
            url: up.url,
          });
          let values = '';
          this.fileList.map((item, i) => {
            values += item.url;
            if (i < this.fileList.length - 1) values += ', ';
            return true;
          });
          this.$emit('valueEvent', values, this.index);
          this.$emit('propsSetting', 'images', this.fileList, this.index);
        }
      }
    },
    handleRemove(file) {
      if (!this.cancleUpload) {
        this.fileList.splice(file.index, 1);
        this.fileList.map((item, i) => {
          this.fileList[i].index = i;
          return true;
        });
        this.fileCount--;
        const files = this.fileList.length ? this.fileList : null;
        this.$emit('valueEvent', files, this.index);
      }
    },
    beforeUpload(file) {
      const isLt5M = file.size < (1024 * 1024 * 5);
      if (!isLt5M) {
        this.$emit('sendToast', '上传文件大小不能超过5MB!');
        this.cancleUpload = true;
        return false;
      }
      this.cancleUpload = false;
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
  margin-bottom: 5px;
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
</style>
