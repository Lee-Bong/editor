<template>
    <el-row>
      <el-col>
        <el-input
          placeholder="请输入手机号">
        </el-input>
      </el-col>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-input
          placeholder="验证码">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">获取验证码</el-button>
        </el-col>
      </el-row>
    </el-row>
</template>
<script>

export default {
  name: 'texg',
  props: {
    label: String,
    list: Array,
    styles: Object,
    place: {
      type: String,
      default: () => '单行文本',
    },
    classList: Array,
    type: String,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
    };
  },
};
</script>

<style>
.radio-label {
  background-color: #5AC7F9;
  color: #fff;
  font-size: 18px;
  height: 40px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  line-height: 40px;
}
.radio-item {
  height: 40px;
  background-color: #fff;
  line-height: 20px;
  color: #333;
  border: 1px solid #DCDFE6;
  border-top: 0;
  padding: 0 14px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.radio-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.radio-item .el-radio__inner, .radio-item .el-checkbox__inner {
  width: 20px;
  height: 20px;
  flex-basis: 20px;
  flex-grow: 1;
}
.radio-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
}
</style>
