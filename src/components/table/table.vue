<template>
<div>
  <el-table
    class="table-box"
    style="width: 100%"
    v-loading="loading"
    :row-class-name="tableRowClassName"
    :data="tableData"
    :default-sort="{prop: 'createdAt', order: 'descending'}"
    @sort-change="handleSortChange"
    >
    <el-table-column
      prop="title"
      label="标题"
      min-width="200"
      max-height=50
    >
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="创建时间"
      sortable
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="visit"
      label="浏览量"
      sortable
      min-width="180">
    </el-table-column>
    <el-table-column label="操作" min-width="280">
      <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary" plain
          @click="handleAdd(scope.$index, scope.row)">复制</el-button>
        <el-button
          size="mini"
          type="primary" plain
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-popover
          placement="bottom"
          width="220"
          trigger="click"
          @show="popverShow(scope.$index, scope.row)"
        >
          <div class="spread" v-if="scope.$index === showTipNum"><tip :tip-url="tipUrl"/></div>
          <el-button
            size="mini"
            type="primary" plain
            slot="reference"
            >推广</el-button>
        </el-popover>
        <el-button
          size="mini"
          :type="scope.row.online === 1 ? '' : 'primary'"
          plain
          @click="handlePublish(scope.$index, scope.row)">
          {{ scope.row.online | isOnline }}
        </el-button>
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
import tip from '@/components/table/tableTip';
import { formatTableData } from '@/util/tools';

export default {
  components: {
    tip,
  },
  filters: {
    isOnline(value) {
      return !value ? '上线' : '下线';
    },
  },
  data() {
    return {
      showTipNum: -1,
      tipUrl: 'http://www.baidu.com',
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
      loading: false, // 表格 loading 状态
    };
  },
  methods: {
    getList() { // 获取页面数据
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
      // } else if (prop === 'visit') { // TODO 浏览量
      }
    },
    tableRowClassName({ row }) {
      if (row.isNew) {
        return 'table-row-new';
      }
    },
    handleAdd(index, row) { // 复制
      const { id } = row;

      this.$http({
        params: { page_id: id },
        method: 'post',
        url: '/api/we/page-dup',
      }).then((res) => {
        const r = res.data;
        if (r.status === 'ok') {
          this.$message.success('复制成功');

          const newData = formatTableData(r.data);
          newData.isNew = true; // 新复制的页面高亮选中

          this.tableData.splice(index, 0, newData);
        } else {
          this.$message.warning('未复制成功，请稍后重试~');
        }
      }).catch(() => {
        this.$message.error('出错了，请稍后重试~');
      });
    },
    handleEdit(index, row) {
      const { id } = row;
      this.$router.push({
        path: '/editor',
        query: { id },
      });
    },
    handlePublish(index, row) {
      const { id } = row;
      console.log('上线/下线', id); // TODO
    },
    search(value) {
      this.query.dk = value;
      this.getList();
    },
    popverShow(index) {
      this.showTipNum = index;
    },
  },
};
</script>
<style>
.table-box {
  margin-top: 20px;
}
.table-box .el-button {
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
.el-table th, .el-table tr.table-row-new {
  background-color: #ecf5ff;
}
.spread{
  height: auto;
  width: 225px;
}
</style>
