<template>
  <div class="img-review-item" v-if="imgObj && imgObj.url" :class="{'img-review-move': isDel}">
    <div @click="onFileRemove" class="review-del" v-if="isDel">
      <i class="el-icon-circle-close"></i>
    </div>
    <div class="image-review">
      <div class="srouce-image" :style="{background: !(imgObj && imgObj.url) ? '#ddd'
     : 'url('+ imgObj.url +') center center / cover no-repeat'}"></div>
      <i v-if="!(imgObj && imgObj.url)" class="el-icon-loading"></i>
      <div class="modify-image">
        <el-upload :disabled="isLoading" class="upload-modify" action="string"
          :show-file-list="false" :limit="1" accept=".png,.gif,.jpeg, .jpg"
          :http-request="fileToUpload"
          :auto-upload="true">
          <div class="el-upload__text">更换图片</div>
        </el-upload>
      </div>
    </div>
    <div class="image-alt">
      <el-input :disabled="isLoading" v-model="imgObj.title" :title="imgObj.title"
        class="alt-input" clearable></el-input>
      <el-progress :percentage="pre" class="modify-precent"
      v-show="isLoading || pre"
        ></el-progress>
        <span class="loadding-tip img-tip" v-show="isLoading">文件上传中，请耐心等待，期间编辑页面将打断上传</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    imgObj: Object,
    index: Number,
    isDel: Boolean,
  },
  data() {
    return {
      isLoading: false,
      pre: 0,
    };
  },
  methods: {
    fileToUpload(params) {
      this.isLoading = true;
      this.$emit('file-change', params, true, this.index || 0);
    },
    uplaodDone(isError) {
      this.isLoading = false;
      this.pre = 100;
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
      this.$forceUpdate();
      if (!isError) {
        this.hidePre();
      } else {
        this.hidePre();
      }
    },
    hidePre() {
      const ele = this;
      const clearTime = setTimeout(() => {
        ele.pre = 0;
        ele.isLoading = false;
        clearTimeout(clearTime);
      }, 3000);
    },
    loadingPre(precent, key) {
      const step = 6;
      window[`clear${key}`] = setInterval(() => {
        if (this.pre >= precent) {
          this.pre = precent;
          clearInterval(window[`clear${key}`]);
          return false;
        }
        this.pre += step;
      }, 10);
    },
    onFileRemove() {
      this.$emit('file-remove', this.index || 0);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isLoading = this.imgObj && this.imgObj.isLoading ? this.imgObj.isLoading : false;
    });
  },
};
</script>

<style>
.img-review-item {
  display: flex;
  border: 1px dashed #ddd;
  padding: 10px;
  margin: 10px;
  position: relative;
}
.img-review-move {
  cursor: move;
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
.el-icon-loading {
  position: absolute;
  top: 35%;
  left: 42%;
  animation: rotating 3s linear infinite;
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
.modify-precent {
  margin-top: 20px;
  opacity: 1;
}
.precent-out {
  opacity: 1;
  transition: opacity 0s;
}
.precent-in {
  opacity: 0;
  transition: opacity 1s;
}
.review-del {
  position: absolute;
  right: -10px;
  top: -10px;
  color: #999999ba;
  cursor: pointer;
  font-size: 18px;
}
.loadding-tip.img-tip {
  width: 220px;
}
</style>
