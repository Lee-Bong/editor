<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    class="table-box"
    >
    <el-table-column
      prop="num"
      label="编号"
      min-width="90"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      min-width="200"
      max-height=50
    >
    </el-table-column>
    <el-table-column
      prop="date"
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
          <div class="spread" v-if="scope.$index === showTipNum">
            <qr-code :url="tipUrl"></qr-code>
          </div>
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
</div>
</template>

<script>
import QrCode from '../../components/QrCode';

export default {
  components: {
    QrCode,
  },
  data() {
    return {
      showTipNum: -1,
      currentPage: 1,
      tipUrl: 'http://www.baidu.com',
      tipTitle: '',
      tableData: [{
        num: 1,
        title: '母亲节活动母亲节活动母亲节活动母亲节活动母亲节活动母亲节活动母亲节活动',
        date: '2016-05-04 19:00:12',
        visit: 1800,
      }, {
        num: 2,
        title: '七夕活动',
        date: '2016-05-04 19:00:12',
        visit: 2000,
      }, {
        num: 3,
        title: '七夕活动',
        date: '2016-05-04 19:00:12',
        visit: 2000,
      }, {
        num: 4,
        title: '七夕活动',
        date: '2016-05-04 19:00:12',
        visit: 2000,
      }],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(query) { // 获取页面数据
      const q = {
        page: 1,
        size: 20,
        sort: 'createdAt',
        sort_by: 'DESC',
        dk: '',
      };

      this.$http({
        params: q || query,
        method: 'get',
        url: '/api/we/pages',
      }).then(() => {
        // console.log(res);
      }).catch(() => {
        // console.log(err);
      });
    },
    formatter(row) {
      return row.address;
    },
    handleSizeChange() {

    },
    handleCurrentChange() {},
    popverShow(index) {
      this.showTipNum = index;
    },
    handleAdd() {

    },
    handleEdit() {
      this.$router.push({
        path: '/editor',
        name: 'editor',
      });
    },
    handlePublish() {

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
