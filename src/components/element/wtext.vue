<template>
    <el-input
        :placeholder="attr.label || '单行文本'" :class="[...attr.classList]" :style="attr.styles">
    </el-input>
</template>
<script>

export default {
  name: 'texg',
  props: {
    attr: {
      type: Object,
      default: () => ({ label: '单行文本' }),
    },
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
