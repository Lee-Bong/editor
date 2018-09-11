<template>
<div>
  <el-table
    class="table-box"
    style="width: 100%"
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
          plain
          @click="handlePublish(scope.$index, scope.row)">下线</el-button>
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
import tip from '@/components/table/tip';
import { formatDate } from '@/util/tools';

const formatTableData = (data) => {
  const output = {
    title: '',
    createdAt: formatDate(data.createdAt),
    visit: 0,
  };
  if (data.state) {
    const json = JSON.parse(data.state);
    const pageData = json.page;
    if (pageData.title) {
      output.title = pageData.title;
    }
  }
  return output;
};

export default {
  components: {
    tip,
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
    };
  },
  // mounted() {
  // this.getList();
  // },
  methods: {
    getList() { // 获取页面数据
      const q = { ...this.pager, ...this.query };

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
      });
    },
    handlePageChange(page) {
      this.pager.page = page;
      this.getList();
    },
    handleSortChange(obj) {
      const { prop, order } = obj;
      if (prop === 'createdAt') {
        this.query.sort_by = order.replace('ending', '').toLocaleUpperCase();
        this.getList();
      }
    },
    handleAdd() {
      // TODO 复制
    },
    handleEdit() {
      this.$router.push({
        path: '/editor',
        name: 'editor',
      });
    },
    handlePublish() {

    },
    search(value) {
      this.query.dk = value;
      this.getList();
    },
    popverShow(index) {
      this.showTipNum = index;
    },
    formatter(row) {
      return row.address;
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
.spread{
height: auto;
width: 225px;
}
</style>
