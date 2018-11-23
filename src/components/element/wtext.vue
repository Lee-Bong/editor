<template>
    <el-input
        :placeholder="place" :class="[...classList]" :style="styles">
    </el-input>
</template>
<script>

export default {
  name: 'texg',
  props: {
    styles: Object,
    place: {
      type: String,
      default: () => '单行文本',
    },
    classList: Array,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
    };
  },
};
</script>

<style>
.drag-form-item .el-input__inner::-webkit-input-placeholder {
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner:-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner::-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner:-ms-input-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
</style>
