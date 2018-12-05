<template>
    <el-input
        :placeholder="attr.label" :class="[...attr.classList, attr.isRequired?
        'from-required': '', 'w-text']"
        :style="attr.styles" @change="valueChange">
    </el-input>
</template>
<script>

export default {
  name: 'wtext',
  props: {
    attr: {
      type: Object,
      default: () => ({ label: '单行文本' }),
    },
    index: Number,
  },
  methods: {
    valueChange(val) {
      this.$emit('valueEvent', val, this.index);
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
.drag-form-item .el-input__inner::-webkit-input-placeholder,
.w-text .el-input__inner::-webkit-input-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner:-moz-placeholder
.w-text .el-input__inner:-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner::-moz-placeholder
.w-text .el-input__inner::-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.drag-form-item .el-input__inner:-ms-input-placeholder
.w-text .el-input__inner:-ms-input-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.w-text .el-input__inner {
  font-size: 14px;
  color: #333;
  padding: 0 14px;
}
</style>
