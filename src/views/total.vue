<template>
  <div>
    <nav-bar pageName="数据统计">
      <template slot="btnGroup">
      </template>
    </nav-bar>
    <div class="main-wrap">
      <div class="content-wrap">
        <div class="review-table">
          <h3>页面浏览</h3>
          <div class="table-wrap">
            <div class="table-search">
              <el-date-picker
                v-model="viewDate"
                type="daterange"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="pickViewDate">
              </el-date-picker>
              <div @click="viewToday" class="total-search">今昨</div>
              <div @click="viewMonth" class="total-search active">近30天</div>
            </div>
            <el-table class="table-box" style="width: 100%" v-loading="loading" :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="date" label="时间" min-width="200" max-height=50>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pv" label="PV" sortable min-width="200">
              </el-table-column>
              <el-table-column prop="uv" label="UV" min-width="200">
              </el-table-column>
            </el-table>
            <el-pagination class="table-page" layout="total, prev, pager, next, jumper" @current-change="viewPageChange" :current-page="pager.page" :page-size="pager.size" :total="pageTotal">
            </el-pagination>
          </div>
        </div>
        <div class="button-table">
          <h3>按钮统计</h3>
          <div class="table-wrap">
            <div class="table-search">
              <el-date-picker
                v-model="btnsDate"
                type="daterange"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <div class="total-search active">总计</div>
            </div>
            <el-table class="table-box" style="width: 100%" v-loading="loading" :data="tableData" :default-sort="{prop: 'createdAt', order: 'descending'}">
              <el-table-column prop="date" label="按钮名称" min-width="200" max-height=50>
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pv" label="播放" min-width="200">
              </el-table-column>
              <el-table-column prop="uv" label="热区" min-width="200">
              </el-table-column>
            </el-table>
            <el-pagination class="table-page" layout="total, prev, pager, next, jumper" @current-change="btnsPageChange" :current-page="pager.page" :page-size="pager.size" :total="pageTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTableData } from '@/util/tools';
import * as API from '@/service';
import NavBar from '../components/NavBar';

export default {
  components: {
    NavBar,
  },
  filters: {
    isOnline(value) {
      return !value ? '上线' : '下线';
    },
  },
  data() {
    return {
      loading: false,
      viewDate: '',
      btnsDate: '',
      tableData: [
        {
          date: '总计',
          pv: 222,
          uv: 222,
        },
        {
          date: '今日',
          pv: 333,
          uv: 333,
        },
        {
          date: '昨日',
          pv: 444,
          uv: 444,
        },
      ],
      pageTotal: 10,
      pager: {
        page: 1,
        size: 10,
      },
    };
  },
  methods: {
    handlePageChange() {

    },
    viewToday() {},
    viewMonth() {},
    viewPageChange() {},
    btnsPageChange() {},
    pickViewDate(date) {
      console.log('minD', date);

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
.table-page {
  margin-top: 20px;
  height: 40px;
  text-align: right;
}
.spread {
  height: auto;
  width: 225px;
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
.table-wrap {
  border: 1px solid #ebeef5;
}

.table-search {
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
