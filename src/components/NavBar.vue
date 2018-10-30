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
          <el-col :span="8" type="flex" style="marginTop: 10px">
            <slot name="btnGroup" />
          </el-col>
          <el-col :span="2" type="flex" style="marginTop: 15px"><help /></el-col>
        </el-row>
      </el-header>
</template>

<script>
import help from '@/components/editor/layout/help';

export default {
  props: ['pageName'],
  components: {
    help,
  },
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

