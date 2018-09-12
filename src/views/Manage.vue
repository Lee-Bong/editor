<template>
  <div class="manage-wrap">
    <div class="header-fixed">
      <el-tabs @tab-click="tabChange">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i>H5 管理</span>
        </el-tab-pane>
        <el-tab-pane label="">
          <span slot="label">
            <i class="el-icon-edit"></i>草稿箱</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main-wrap">
      <div class="content-wrap">
        <div>
          <el-button type="primary" @click="newEditor">新建H5</el-button>
          <el-input
            ref="searchInput"
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
        <div>
          <keep-alive>
            <table-list ref="tableList" v-if="showList" />
            <table-draft ref="tableDraftList" v-else />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableList from '@/components/table/table';
import tableDraft from '@/components/table/tableDraft';

export default {
  name: 'manage',
  props: {
  },
  components: {
    tableList,
    tableDraft,
  },
  data() {
    return {
      showList: true,
      searchValue: '',
    };
  },
  methods: {
    tabChange(tab, event) {
      const tarId = event.currentTarget.getAttribute('id');
      if (tarId === 'tab-1') { // 草稿tabs
        this.showList = false;
      } else {
        this.showList = true;
      }
    },
    newEditor() {
      this.$router.push({
        path: '/editor',
        name: 'editor',
      });
    },
    handleSearch() {
      const value = this.searchValue;
      if (value) {
        if (this.showList) {
          this.$refs.tableList.search(value);
        } else {
          this.$refs.tableDraftList.search(value);
        }
      } else { // focus on search input
        this.$refs.searchInput.focus();
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
  height: 56px;
  padding: 0 20px;
  background-color: #fafafa;
  width: 100%;
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
