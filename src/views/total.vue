<template>
  <div>
    <nav-bar pageName="数据统计">
      <template slot="btnGroup">
      </template>
    </nav-bar>
    <div class="main-total-wrap">
      <div class="content-wrap">
        <div class="review-table">
          <h3>页面浏览</h3>
          <div class="table-wrap">
            <div class="table-search-wrap">
              <el-date-picker
                v-model="viewDate"
                type="daterange"
                size="mini"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="pickDate">
              </el-date-picker>
              <div @click="viewToday(1)" class="total-search"
              :class="{'active': this.todayActive}">今昨</div>
              <div @click="viewMonth(1)" class="total-search"
              :class="{'active': this.monthActive}">近30天</div>
            </div>
            <el-table class="table-box" style="width: 100%" v-loading="loading0" :data="viewData">
              <el-table-column prop="date" label="时间" min-width="200" max-height=50>
                <template slot-scope="scope">
                  <i class="el-icon-time" v-if="scope.row.date !== '合计'"></i>
                  <i class="iconfont ed-icon-zongji" v-if="scope.row.date === '合计'"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pv" label="PV" min-width="200">
              </el-table-column>
              <el-table-column prop="uv" label="UV" min-width="200">
              </el-table-column>
            </el-table>
            <el-pagination class="table-page" layout="total, prev, pager, next, jumper"
            @current-change="viewPageChange" :current-page="viewPager.page"
            :page-size="viewPager.size" :total="viewPager.total">
            </el-pagination>
          </div>
        </div>
        <div class="button-table">
          <h3>按钮统计</h3>
          <div class="table-wrap">
            <div class="table-search-wrap">
              <el-date-picker
                v-model="btnsDate"
                type="daterange"
                size="mini"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="pickDate1">
              </el-date-picker>
              <div class="total-search" @click="clicTotal"
              :class="{'active': this.clickActive}">总计</div>
            </div>
            <el-table class="table-box" style="width: 100%" v-loading="loading1" :data="clickData">
              <el-table-column prop="name" label="按钮名称" min-width="200" max-height=50>
              </el-table-column>
              <el-table-column prop="click" label="点击量" min-width="200">
              </el-table-column>
              <el-table-column prop="precent" label="点击率" min-width="200">
              </el-table-column>
            </el-table>
            <el-pagination class="table-page" layout="total, prev, pager, next, jumper"
             @current-change="btnsPageChange" :current-page="clickPager.page"
             :page-size="clickPager.size" :total="clickPager.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
import { timeForMat } from '@/util/tools';
import * as service from '@/service';
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
      loading0: false,
      loading1: false,
      viewDate: '',
      btnsDate: '',
      viewData: [],
      viewDataTotal: [],
      viewPager: {
        page: 1,
        size: 10,
        total: 0,
      },
      clickData: [],
      clickDataTotal: [],
      clickPager: {
        page: 1,
        size: 10,
        total: 0,
      },
      clickActive: false,
      todayActive: false,
      monthActive: false,
      timeArr: [],
      clickArr: [],
      pickerOptions: {
        disabledDate(time) {
          const curDate = (new Date()).getTime();
          const oneMonths = curDate - (30 * 24 * 3600 * 1000);
          return time.getTime() > Date.now() || time.getTime() < oneMonths;
        },
      },
    };
  },
  mounted() {
    // [昨天, 今日, 明日, 近30天]， to是开区间
    this.timeArr = [timeForMat(-1), timeForMat(0), timeForMat(1), timeForMat(-29)];
    this.clickArr = this.$route.params.clickArr || [];
    this.viewToday(1);
    this.viewMonth(0);
  },
  methods: {
    viewToday(type) {
      this.updateTotal(this.timeArr[0], this.timeArr[2], type, () => {
        this.viewDate = [this.timeArr[0], this.timeArr[1]];
        this.todayActive = true;
        this.monthActive = false;
      });
    },
    viewMonth(type) {
      this.updateTotal(this.timeArr[3], this.timeArr[2], type, () => {
        if (type) {
          this.monthActive = true;
          this.todayActive = false;
          this.viewDate = [this.timeArr[3], this.timeArr[1]];
        } else {
          this.clickActive = true;
          this.btnsDate = [this.timeArr[3], this.timeArr[1]];
        }
      });
    },
    pickDate(val) {
      if (val && val[0]) {
        this.updateTotal(val[0], timeForMat(1, val[1]), 1, () => {
          this.todayActive = false;
          this.monthActive = false;
        });
      }
    },
    pickDate1(val) {
      if (val && val[0]) {
        this.updateTotal(val[0], timeForMat(1, val[1]), 0, () => {
          this.clickActive = false;
        });
      }
    },
    clicTotal() {
      this.viewMonth(0);
    },
    viewPageChange(page) {
      this.pageChange(page, 'view');
    },
    btnsPageChange(page) {
      this.pageChange(page, 'click');
    },
    pageChange(page, type) {
      const { size } = this[`${type}Pager`];
      this[`${type}Data`] = this[`${type}DataTotal`].slice((page - 1) * size, ((page - 1) * size) + 10);
    },
    async updateTotal(s, n, type, cb) {
      try {
        this[`loading${type}`] = true;
        const data = await service.stateBI(
          `weditor_${this.$route.query.page_id}`,
          s,
          n,
        );
        if (data.data) {
          this[`loading${type}`] = false;
          // 过滤
          let pvCount = 0;
          let uvCount = 0;
          let shareCount = 0;
          const clickCount = [];
          this.viewDataTotal = [];
          this.clickDataTotal = [];
          for (const k in data.data) {
            let pvItem = [];
            if (data.data[k].length) {
              const view = data.data[k];
              const len = view.length;
              for (let i = 0; i < len; i++) {
                if (view[i].length) {
                  if (view[i][0] === 'pv') {
                    pvItem = view[i];
                  }
                  const index2 = parseInt(view[i][2], 10);
                  if (index2 && !type) {
                    if (view[i][0] === 'share') {
                      shareCount += index2;
                    }
                    if (view[i][0] === 'click') {
                      const index = parseInt(view[i][1], 10);
                      if (!clickCount[index]) clickCount[index] = 0;
                      clickCount[index] += index2;
                    }
                  }
                }
              }
            }
            const pv = pvItem.length ? pvItem[2] : 0;
            const uv = pvItem.length ? pvItem[3] : 0;
            pvCount += parseInt(pv, 10);
            uvCount += parseInt(uv, 10);
            this.viewDataTotal.push({
              date: k,
              pv,
              uv,
            });
          }
          if (type) {
            this.viewDataTotal.push({
              date: '合计',
              pv: pvCount,
              uv: uvCount,
            });
            this.viewDataTotal = this.viewDataTotal.reverse();
            this.viewData = this.viewDataTotal.slice(0, 10);
            this.viewPager.total = this.viewDataTotal.length;
          } else {
            const pre = (shareCount / pvCount).toFixed(2) * 100;
            this.clickDataTotal.push({
              name: '分享',
              click: shareCount,
              precent: Number.isNaN(pre) ? 0 : `${pre}%`,
            });
            if (clickCount.length) {
              const ele = this;
              clickCount.map((pro, i) => {
                const pre1 = (pro / pvCount).toFixed(2) * 100;
                this.clickDataTotal.push({
                  name: ele.clickArr[i] || '热区',
                  click: pro,
                  precent: Number.isNaN(pre1) ? 0 : `${pre1}%`,
                });
                return true;
              });
            }
            this.clickPager.total = this.clickDataTotal.length;
            this.clickData = this.clickDataTotal.slice(0, 10);
          }
          if (cb) cb();
        }
      } catch (err) {
        this[`loading${type}`] = false;
        this.$message.error('查询数据失败，请重试～');
      }
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
.main-total-wrap {
  margin-top: 57px;
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
