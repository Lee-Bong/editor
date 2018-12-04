<template>
  <div>
    <nav-bar pageName="数据统计">
      <template slot="btnGroup">
      </template>
    </nav-bar>
    <el-tabs  v-model="activeTab" type="card" class="main-total-wrap" @tab-click="tabChange">
      <el-tab-pane name="webTotal" label="页面统计">
      </el-tab-pane>
      <el-tab-pane name="formTotal" label="表单汇总">
      </el-tab-pane>
    </el-tabs>
    <transition name="fade" mode="out-in" >
      <keep-alive>
        <web-total v-if="activeTab === 'webTotal'" />
        <form-total v-if="activeTab === 'formTotal'" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import merge from 'webpack-merge';
import webTotal from '@/components/table/webTotal';
import NavBar from '@/components/NavBar';
import formTotal from '@/components/table/formTotal';

export default {
  components: {
    NavBar,
    webTotal,
    formTotal,
  },
  computed: {
    activeTab: {
      get() {
        return this.$route.query.tab || 'webTotal';
      },
      set() {
      },
    },
  },
  methods: {
    tabChange(tab) {
      this.$router.push({
        query: merge(this.$route.query, { tab: tab.name }),
      });
    },
  },
};
</script>
<style>
.main-total-wrap .el-tabs__nav.is-top {
  height: 41px !important;
  line-height: 39px;
}
.table-box {
  margin-top: 20px;
}
.table-box .el-button + .el-button:nth-child(2n + 1) {
  margin-left: 10px;
}
.table-page {
  margin-top: 20px;
  height: 40px;
  text-align: right;
}
.spread {
  height: auto;
  width: 225px;
}
.main-total-wrap {
  margin-top: 57px;
  /* background-color: #eee; */
  padding: 20px 30px 30px 30px;
}
.content-wrap {
  background-color: #fff;
  padding: 10px 15px;
}
.table-wrap {
  border: 1px solid #ebeef5;
}

.table-search-wrap {
  background: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
  height: 50px;
  padding-left: 15px;
  display: flex;
  align-items: center;
}
.total-search {
  width: 50px;
  height: 22px;
  text-align: center;
  margin-left: 5px;
  line-height: 22px;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  border-radius: 4px;
  color: #409eff;
  font-size: 13px;
}
.total-search.active,
.total-search:hover {
  background: #ecf5ff;
  border: 1px solid #b3d8ff;
}
.table-wrap .el-date-editor--daterange.el-input__inner {
  width: 250px;
}
</style>
