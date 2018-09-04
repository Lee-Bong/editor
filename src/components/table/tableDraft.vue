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
      width="90"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="150"
      max-height=50
    >
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间"
      sortable
      width="180">
    </el-table-column>
    </el-table-column>
    <el-table-column label="操作" min-width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary" plain
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="info" plain disabled
          @click="handlePublish(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  class="table-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
</div>
</template>

<script>
import tip from '@/components/table/tip';

export default {
  components: {
    tip,
  },
  data() {
    return {
      showTipNum: -1,
      currentPage: 1,
      tipUrl: 'www.baidu.com',
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
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSizeChange() {

    },
    handleCurrentChange() {},
    popverShow(index, row) {
      this.showTipNum = index;
    },
    handleAdd(index, row) {

    },
    handleEdit(index, row) {

    },
    handlePublish(index, row) {

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
