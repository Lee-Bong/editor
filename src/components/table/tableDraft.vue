<template>
<div>
  <el-table
    class="table-box"
    style="width: 100%"
    v-loading="loading"
    :data="tableData"
    :default-sort="{prop: 'createdAt', order: 'descending'}"
    @sort-change="handleSortChange"
    >
    <el-table-column
      prop="title"
      label="标题"
      min-width="280"
      max-height=50
    >
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="创建时间"
      sortable
      min-width="220">
    </el-table-column>
    <el-table-column label="操作" min-width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary" plain
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="info" plain
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="table-page"
    layout="total, prev, pager, next, jumper"
    @current-change="handlePageChange"
    :current-page="pager.page"
    :page-size="pager.size"
    :total="pageTotal">
    </el-pagination>
</div>
</template>

<script>
import { formatTableData } from '@/util/tools';

export default {
  data() {
    return {
      showTipNum: -1,
      currentPage: 1,
      tipTitle: '',
      tableData: [],
      pageTotal: 0,
      pager: {
        page: 1,
        size: 10,
      },
      query: {
        sort: 'createdAt',
        sort_by: 'DESC', // 'ASC'
        dk: '',
      },
      loading: false,
    };
  },
  methods: {
    getList() {
      const q = { ...this.pager, ...this.query };
      this.loading = true;
      this.$http({
        params: q,
        method: 'get',
        url: '/api/we/pages',
      }).then((res) => {
        const r = res.data;
        if (r.status === 'ok') {
          let list = r.data.pages;
          if (list && list.length) {
            list = list.map(formatTableData).filter(e => !!e);
          }
          this.tableData = list;
          this.pageTotal = r.data.count;
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handlePageChange(page) {
      this.pager.page = page;
      this.getList();
    },
    handleSortChange({ prop, order }) {
      if (prop === 'createdAt') {
        this.query.sort_by = order.replace('ending', '').toLocaleUpperCase();
        this.getList();
      }
    },
    handleEdit(index, row) {
      const { id } = row;
      this.$router.push({
        path: '/editor',
        query: { id },
      });
    },
    handleDelete(index, row) {
      this.$confirm('删除后将无法复原！是否确认删除？')
        .then(() => {
          const { id } = row;
          this.deletePage(id);
        })
        .catch(() => {

        });
    },
    deletePage(id) {
      this.$http({
        params: { page_id: id },
        method: 'delete',
        url: '/api/we/page',
      }).then((res) => {
        const r = res.data;
        if (r.status === 'ok') {
          this.$message.success('删除成功');

          this.getList();
        } else {
          this.$message.warning('未删除成功，请稍后重试~');
        }
      }).catch(() => {
        this.$message.error('出错了，请稍后重试~');
      });
    },
    search(value) {
      this.query.dk = value;
      this.getList();
    },
  },
};
</script>
<style>
.table-box {
    margin-top: 20px;
}
.table-box .el-button + .el-button:nth-child(2n + 1) {
    margin-left: 10px;
}
.table-box.el-table th {
        background: #f5f7fa;
}
.table-page {
    margin-top: 20px;
        height: 40px;
    text-align: right;
}
.spread{
height: auto;
width: 225px;
}
</style>
