<template>
  <div>
    <nav-bar pageName="数据统计">
      <template slot="btnGroup">
      </template>
    </nav-bar>
    <el-tabs v-model="activeTab" type="card" class="main-total-wrap" @tab-click="tabChange">
      <el-tab-pane name="webTotal" label="页面统计" class="lllll">
        <web-total />
      </el-tab-pane>
      <el-tab-pane name="formTotal" label="表单汇总">
        <form-total />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { timeForMat } from '@/util/tools';
import * as service from '@/service';
import webTotal from '@/components/table/webTotal';
import NavBar from '@/components/NavBar';
import formTotal from '@/components/table/formTotal';

export default {
  components: {
    NavBar,
    webTotal,
    formTotal,
  },
  filters: {
    isOnline(value) {
      return !value ? '上线' : '下线';
    },
  },
  data() {
    return {
      activeTab: 'webTotal',
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
    tabChange() {

    },
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
          let pvOutCount = 0;
          let shareCount = 0;
          const clickCount = [];
          this.viewDataTotal = [];
          this.clickDataTotal = [];
          for (const k in data.data) {
            let pvItem = [];
            let pvItemOut = [];
            if (data.data[k].length) {
              const view = data.data[k];
              const len = view.length;
              for (let i = 0; i < len; i++) {
                if (view[i].length) {
                  if (view[i][0] === 'pv') {
                    if (view[i][2] === 'outside') {
                      pvItemOut = view[i];
                    } else {
                      pvItem = view[i];
                    }
                  }
                  const index2 = parseInt(view[i][4], 10);
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
            const pv = pvItem.length ? pvItem[4] : 0;
            const pvOut = pvItemOut.length ? pvItemOut[4] : 0;
            const uv = pvItem.length ? pvItem[5] : 0;
            pvCount += parseInt(pv, 10);
            pvOutCount += parseInt(pvOut, 10);
            uvCount += parseInt(uv, 10);
            this.viewDataTotal.push({
              date: k,
              pv,
              uv,
              pvOut,
            });
          }
          if (type) {
            this.viewDataTotal.push({
              date: '合计',
              pv: pvCount,
              uv: uvCount,
              pvOut: pvOutCount,
            });
            this.viewDataTotal = this.viewDataTotal.reverse();
            this.viewData = this.viewDataTotal.slice(0, 10);
            this.viewPager.total = this.viewDataTotal.length;
          } else {
            const pre = !(pvCount + pvOutCount) ? 0 :
              ((shareCount / (pvCount + pvOutCount)) * 100).toFixed(2);
            this.clickDataTotal.push({
              name: '分享',
              click: shareCount,
              precent: `${pre}%`,
            });
            if (clickCount.length) {
              const ele = this;
              clickCount.map((pro, i) => {
                const pre1 = !(pvCount + pvOutCount) ? 0 :
                  ((pro / (pvCount + pvOutCount)) * 100).toFixed(2);
                this.clickDataTotal.push({
                  name: ele.clickArr[i] || '热区',
                  click: pro,
                  precent: `${pre1}%`,
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
.main-total-wrap .el-tabs__nav.is-top {
  height: 41px !important;
  line-height: 39px;
}
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
  /* background-color: #eee; */
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
