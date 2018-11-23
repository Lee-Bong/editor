<template>
  <div>
    <el-input
    placeholder="请输入手机号">
    </el-input>
    <div style="margin-top: 14px" class="code-cont" v-if="verify === 1">
      <el-input class="code-left"
      placeholder="验证码">
      </el-input>
      <el-button type="primary" class="code-right">发送验证码</el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'texg',
  props: {
    verify: Number,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
    };
  },
};
</script>

<style>
.code-cont {
  display: flex;
}
.code-left {
  display: inline-block;
}
.code-right {
  min-width: 95px;
  width: 95px;
  flex-basis: 95px;
  height: 40px;
  padding: 0;
  line-height: 40px;
  background-color: #5AC7F9;
  text-align: center;
  border: 0;
  margin-left: 12px;
}
</style>
