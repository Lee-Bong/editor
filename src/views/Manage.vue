<template>
    <div class="manage-wrap">
        <div class="header-fixed">
            <el-tabs @tab-click="tabChange">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i>H5 管理</span>
                </el-tab-pane>
                <el-tab-pane label="">
                    <span slot="label"><i class="el-icon-edit"></i>草稿箱</span>
                    </el-tab-pane>
            </el-tabs>
        </div>
        <div class="main-wrap">
            <div class="content-wrap">
                <div>
                    <el-button type="primary">新建H5</el-button>
                    <el-input class="table-search"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input21">
                    </el-input>
                    <button class="search-submit">搜索
                    </button>
                </div>
                <div>
                    <table-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tableView from '@/components/table/table';

export default {
  name: 'manage',
  props: {
  },
  components: {
    tableView,
  },
  data() {
    return {

    };
  },
  methods: {
    tabChange(tab, event) {

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
    width: 180px;
    margin-left: 15px;
}
.search-submit {
   margin-left: 15px;
    background: none;
    border: 0;
    font-size: 16px;
    outline: none;
    color: #409EFF;
    cursor: pointer;
}
.search-submit:hover {
    color: #0875e4;
}
</style>
