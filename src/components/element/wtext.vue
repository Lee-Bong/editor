<template>
    <el-input
        :placeholder="attr.label" :class="[...attr.classList, attr.isRequired? 'from-required': '']"
        :style="attr.styles">
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
.from-required:before {
    content: '*';
    color: #D0021B;
    position: absolute;
    font-size: 14px;
    top: 13px;
    left: 7px;
}
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
