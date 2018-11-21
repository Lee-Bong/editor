<template>
  <div class="manage-wrap">
    <div class="header-fixed flex">
        <el-tabs v-model="activeTab" @tab-click="tabChange">
          <el-tab-pane name="pages">
            <span slot="label">
              <i class="el-icon-date"></i>H5 管理</span>
          </el-tab-pane>
          <el-tab-pane name="draft">
            <span slot="label">
              <i class="el-icon-edit"></i>草稿箱</span>
          </el-tab-pane>
        </el-tabs>
        <div class="extra">
          <help />
          <Account />
        </div>
    </div>
    <div class="main-wrap">
      <div class="content-wrap">
        <div>
          <el-button type="primary" @click="newEditor">新建H5</el-button>
          <el-input
            v-model.trim="searchValue"
            @keyup.native.enter="handleSearch"
            class="table-search"
            placeholder="请输入标题"
            prefix-icon="el-icon-search"
            clearable>
          </el-input>
          <button @click="handleSearch" class="search-submit">搜索
          </button>
        </div>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <table-list ref="tableList" v-if="activeTab === 'pages'" />
            <table-draft ref="tableDraftList" v-if="activeTab === 'draft'" />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import tableList from '@/components/table/table';
import tableDraft from '@/components/table/tableDraft';
import help from '@/components/editor/layout/help';
import Account from '@/components/editor/layout/Account';

export default {
  name: 'manage',
  props: {
  },
  components: {
    tableList,
    tableDraft,
    help,
    Account,
  },
  watch: {
    $route: 'changeTab',
  },
  data() {
    return {
      activeTab: 'pages',
      searchValue: '',
    };
  },
  mounted() {
    this.changeTab();
  },
  methods: {
    changeTab() {
      const tabName = this.$route.query.tab;
      this.activeTab = (tabName === 'draft') ? tabName : 'pages';
    },
    tabChange(tab) {
      this.$router.push({
        path: '/manage',
        query: { tab: tab.name },
      });
    },
    newEditor() {
      this.$router.push({
        path: '/editor',
        name: 'editor',
      });
    },
    handleSearch() {
      const value = this.searchValue;
      if (this.activeTab === 'pages') {
        this.$refs.tableList.search(value);
      } else if (this.activeTab === 'draft') {
        this.$refs.tableDraftList.search(value);
      }
    },
  },
};
</script>

<style>
.header-fixed {
  height: 56px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 0 20px;
  background-color: #fafafa;
  overflow: hidden;
  border-bottom: 1px solid #ccd5db;
  z-index: 1020;
}
.el-tabs__nav.is-top {
  height: 56px;
  line-height: 56px;
}

.el-tabs__nav-scroll {
  border: 1px solid #fafafa;
}

.main-wrap {
  position: absolute;
  top: 57px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee;
  padding: 20px 30px 30px 30px;
  overflow-y: auto;
}
.content-wrap {
  background-color: #fff;
  padding: 10px 15px;
}
.table-search {
  display: inline-block;
  width: 280px;
  margin-left: 15px;
}
.search-submit {
  margin-left: 15px;
  background: none;
  border: 0;
  font-size: 16px;
  outline: none;
  color: #409eff;
  cursor: pointer;
}
.search-submit:hover {
  color: #0875e4;
}
</style>

<style lang="less" scoped>
.flex {
  display: flex;
  .extra {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin: 20px;
  }
}
</style>
