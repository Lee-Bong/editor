<template>
  <div
  :class="['setting-content', $store.state.editor.isImgSet ? 'setting-show' : '']"
  :style="{width: setForm.width+'px',
  }">
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
          <div class="upload-wrap" v-if="!this.fileSuccess">
            <el-upload
              :disabled="fileAble"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="dragForm.imglist"
              :on-success="onFileSuccess"
              :on-error="onFileError"
              :on-change="onFileChange"
              list-type="picture"
              :limit="limit"
              :auto-upload="false"
              accept=".png,.gif,.jpeg, .jpg">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>+ 点击上传图片</em> ,或把图片拖到此处</div>
              <div class="el-upload__tip" slot="tip">建议宽度750像素</div>
            </el-upload>
            <input id="fileArea" class="file-up" type="file" name="fileName"
            @change="fileChange">
          </div>
          <div class="file-info" v-if="this.fileSuccess">
            <img-review-item :imgObj='dragForm.img'/>
            <el-form-item label="位置：" size="mini">
              <el-input-number v-model="dragForm.location.x" @blur="locationChange"
                :min="location.xmin" :max="($store.state.editor.phoneWidth-dragForm.size.w)"
                label="描述文字" controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.location.y" @blur="locationChange"
                :min="location.ymin" :max="($store.state.editor.phoneHeight-dragForm.size.h)"
                label="描述文字" controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label"> <label>X</label> <label> Y</label></div>
            <el-form-item label="尺寸：" size="mini">
              <el-input-number v-model="dragForm.size.w" @blur="sizeChange(1)"
                :min="size.wmin" :max="$store.state.editor.phoneWidth-dragForm.location.x"
                 label="描述文字" controls-position="right" class="num-input"></el-input-number>
              <el-input-number v-model="dragForm.size.h" @blur="sizeChange(2)"
                :min="size.hmin" :max="$store.state.editor.phoneHeight-dragForm.location.y"
                 label="描述文字" controls-position="right" class="num-input"></el-input-number>
            </el-form-item>
            <div class="dec-label"> <label>宽</label> <label>高</label></div>
          </div>
         </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import imgReviewItem from '@/components/editor/dragItem/image/imgReviewItem';
import oss from '@/util/oss';

export default {
  name: 'DragImgSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    imgReviewItem,
  },
  data() {
    return {
      // imgObj: {
      //   source: 'http://pic30.photophoto.cn/20140310/0008020974539766_b.jpg',
      //   alt: '这是图片标题',
      // },
      fileSuccess: false,
      fileAble: false,
      fileFail: false,
      files: [],
      sHeight: 500,
      limit: 1,
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
  computed: {

  },
  methods: {
    settingFixed() { // 锁定设置
      this.$emit('setting-fixed');
    },
    settingClose() { // 关闭设置
      this.$store.commit('editor_update', { isImgSet: false });
    },
    locationChange() { // 位置值发生改变
      this.$emit('input-locationChange', 'dragImages', this.dragForm.location, 'imgActive');
    },
    sizeChange(opt) { // 大小值发生改变
      if (opt === 1) {
        // todo 300为图片的在375下自适应的真实高度
        this.dragForm.size.h = (this.dragForm.size.w * 300) / 375;
      } else {
        this.dragForm.size.w = (this.dragForm.size.w * 375) / 300;
      }
      this.$emit('input-sizeChange', 'dragImages', this.dragForm.size, 'imgActive');
      this.$emit('input-locationChange', 'dragImages', this.dragForm.location, 'imgActive');
    },
    onFileSuccess(rep, file) {
      this.fileSuccess = true;
      this.fileAble = true;
      this.$message({
        message: '图片上传成功～',
        type: 'success',
        duration: 2000,
      });
      const drags = this.$store.state.editor.dragImages[this.$store.state.editor.imgActive];
      drags.img = {
        title: file.name,
        url: file.url,
      };
      this.$store.commit('editor_update', { dragImages: drags });
    },
    onFileError() { // 图片上传失败 err, file, fileList
      // this.fileFail = true;
      // this.fileAble = false;
      // this.$message({
      //   message: '图片上传失败，请重试～',
      //   type: 'error',
      //   duration: 2000,
      // });
      const { dragImages, imgActive } = this.$store.state.editor;
      const drags = dragImages[imgActive];
      drags.img = {
        title: 'sss',
        url: 'http://pic30.photophoto.cn/20140310/0008020974539766_b.jpg',
      };
      dragImages[imgActive] = drags;
      this.$store.commit('editor_update', { dragImages });
      this.fileSuccess = true;
    },
    onFileChange(file) {
      // if (!this.fileFail) {
      //   this.fileAble = true;
      //   return;
      // }

      // this.fileFail = false;
      oss(file);
    },
    fileChange(file) {
      const settingWrap =  document.getElementsByClassName('file-up')[0].files[0];

      oss(settingWrap);
    }
  },
};
</script>

<style>
.file-upload {
  width: 220px;
  height: 100px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 15px;
  border: dashed 1px #ddd;
  cursor: pointer;
}

.file-upload:hover {
  color: #409eff;
  border-color: #409eff;
}

.file-upload:active {
  color: #fff;
  background-color: #409eff;
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
.upload-wrap .el-upload__tip  {
    position: absolute;
    top: 120px;
    /* left: 100px; */
    width: 100%;
    text-align: center;
}
.upload-wrap .el-upload-list {
  margin: 16px;
}
.upload-wrap .el-upload-list__item {
  outline: none;
}
</style>
