<template>
    <el-header>
        <el-row class="header-flex">
          <el-col :span="14" type="flex">
            <el-breadcrumb separator="/" type="flex">
              <el-breadcrumb-item :to="{ path: '/manage' }">
                微页面
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                {{ pageName }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="10" type="flex" style="marginTop: 10px">
            <slot name="btnGroup" />
            <el-button type="text" icon="el-icon-question" class="help-icon"
            @click="goHelpWeb">使用帮助</el-button>
          </el-col>
        </el-row>
      </el-header>
</template>

<script>
export default {
  props: ['pageName'],
  methods: {
    goHelpWeb() {
      window.open('https://www.yuque.com/evan/vvgcu9/bl0dq3');
    },
  },
};
</script>

<style>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 56px;
  background-color: #fafafa;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #ccd5db;
  z-index: 1020;
}

.header-flex {
  height: 100%;
  align-content: center;
  justify-content: space-between;
}

.header-flex .el-breadcrumb__inner {
  line-height: 56px;
}

.el-button.el-button--text:hover {
  color: #489df5;
}
.el-button.el-button--text:active {
  color: #409eff;
}
.el-breadcrumb__inner.is-link {
  color: #409eff;
}
</style>

