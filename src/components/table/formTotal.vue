<template>
  <div class="content-wrap">
    <div class="empty" v-if="!hasData">没有数据哦～</div>
    <div v-if="hasData">
      <div class="perate-wrap" >
        <div class="filter-text">表格过滤：</div>
        <div class="filter">
          <el-select v-model="showItems"
          class="filter-select"
          multiple
          @change="filterChange"
          @visible-change="filterFocus"
          :popper-append-to-body="true"
          placeholder="表格过滤">
          <el-option :class="['filter-option']"
            :disabled="item.id === 'fId'"
            v-for="item in formItems.slice(1)"
            :key="item.value"
            :label="item.label? item.label : '   '"
            :selected="true"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button class="table-fliter-btn" icon="iconfont ed-icon-icon-test" type="text">
        </el-button>
      </div>
        <div class="filter-right">
          <el-button @click="stopCollect">
            <i class="el-icon-bell" v-if="!isStopCollect"></i>
            <i class="el-icon-time" v-if="isStopCollect"></i>
            <span v-if="isStopCollect">开始收集</span>
            <span v-if="!isStopCollect">停止收集</span>
          </el-button>
          <el-button icon="el-icon-upload2" @click="exportTable">导出表格</el-button>
        </div>
      </div>
      <el-table class="form-table" style="width: 100%" border v-loading="loading1" ref="tableRef"
        :data="formData" >
        <el-table-column v-for="(item, index) in formShowItems" :key="index" class="table-col"
        :prop="item.id" :label="item.label" min-width="80" :width="setTWidth(item)">
        <template slot-scope="scope">
          <div>
            <div class="cell-show">{{scope.row[item.id]}}</div>
            <div class="cell-hide" >{{scope.row[item.id]}}</div>
            <div class="expend-all" @click="expendAll(scope.row[item.id])">查看全部 >></div>
          </div>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="table-page"
        layout="total, prev, pager, next, jumper"
        @current-change="formPageChange"
        :current-page="formPager.page"
        :page-size="formPager.size"
        :total="formPager.total" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { formSummary, formExport, formStopCollect } from '@/service';
import { formatDate } from '@/util/tools';

export default {
  name: 'formTotal',
  props: {
    formInfo: Object,
  },
  data() {
    return {
      hasData: false,
      loading1: false,
      tableFilter: [],
      formItems: [
        {
          id: 'fId',
          label: '序号',
        },
      ],
      showItems: [],
      formShowItems: [],
      formPager: {
        size: 10,
        pager: 1,
        total: 30,
      },
      formData: [],
      filters: [], // 当前显示的表格列['id', ***]
      filtersBefore: [],
      isStopCollect: false,
    };
  },
  mounted() {
    this.formSummary();
  },
  computed: {
    isStop: {
      get() {
        return this.formInfo.isStop || false;
      },
      set() {
      },
      immediate: true,
      deep: true,
      stopCollect: false,
    },
  },
  methods: {
    setTWidth(item) {
      const w = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
      if (item.id === 'fId') {
        if (this.formShowItems.length === 1) return 'auto';
        if (this.formShowItems.length > 1) return 80;
      } else if (w - 30 > ((this.formShowItems.length - 1) * 181) + 80) {
        return 'auto';
      } else {
        return 180;
      }
    },
    formItemShow(i) {
      return this.formShowItems.filter(item => item.id === this.formItems[i].id);
    },
    formPageChange(val) {
      this.formPager.pager = val;
      this.formSummary(val);
    },
    async formSummary(pager) {
      try {
        this.isStopCollect = this.formInfo.isStop;
        const data = await formSummary({
          page_id: this.$route.query.page_id,
          currentPage: pager || 1,
          pageSize: 10,
        });
        if (data && data.status === 'ok') {
          if (data.data) {
            const fdata = data.data;
            this.formPager.total = fdata.total;
            const formData = [];
            const { summaries, formItems } = data.data;
            if (summaries && summaries.length) {
              summaries.map((item, index) => {
                const tdata = {};
                tdata.fId = ((this.formPager.pager - 1) * this.formPager.size) + index + 1;
                if (item.data) {
                  for (let i = 0; i < formItems.length; i++) {
                    const fEle = formItems[i];
                    const pro = item.data.filter(ei => ei.id === fEle.id);
                    if (pro && pro.length) {
                      tdata[fEle.id] = pro[0].value;
                    } else {
                      tdata[fEle.id] = '';
                    }
                  }
                }
                tdata.createdAt = formatDate(item.createdAt);
                formData.push(tdata);
                return true;
              });
              // formItems = this.shiftUid(formItems);


              if (!pager) {
                this.formItems = this.formItems.concat(this.shiftUid(formItems), {
                  id: 'createdAt',
                  label: '提交时间',
                });
                this.formShowItems = this.formItems;
                this.formItems.map(item => this.showItems.push(item.id));
              }
              this.hasData = true;
              const expends = Array.prototype.slice.call(document.getElementsByClassName('expend-all'), 1);
              expends.map((item, index) => {
                expends[index].style.display = 'none';
                return true;
              });
              this.formData = formData;
              this.$nextTick(() => {
                this.expendSet(true);
              });
            } else {
              this.hasData = false;
            }
          } else {
            this.hasData = false;
          }
        } else {
          this.hasData = false;
          this.loading1 = false;
          this.$message.error('查询数据失败，请重试～');
        }
      } catch (err) {
        this.loading1 = false;
      }
    },
    shiftUid(formItems) { // uid 放到第一位
      const len = formItems.length;
      const isUID = formItems.filter(ele => ele.label === 'UID');
      if (isUID.length) {
        for (let i = 0; i < len; i++) {
          const ele = formItems[i];
          if (ele.label === 'UID') {
            formItems.splice(i, 1);
            break;
          }
        }
        formItems.unshift(isUID[0]);
      }
      return formItems;
    },
    expendSet(isFirst) {
      if (isFirst) {
        const cellRef = Array.prototype.slice.call(document.getElementsByClassName('cell-hide'));
        const expendRef = Array.prototype.slice.call(document.getElementsByClassName('expend-all'));
        cellRef.map((item, index) => {
          if (item.offsetHeight > 69) { // line-height 23 * 3
            expendRef[index].style.display = 'block';
            cellRef[index].className += ' expend-cell';
            expendRef[index].className += ' expend-cell-all';
          }
          return true;
        });
      } else {
        const overCellRef = Array.prototype.slice.call(document.getElementsByClassName('expend-cell'));
        const overRef = Array.prototype.slice.call(document.getElementsByClassName('expend-cell-all'));
        overCellRef.map((item, index) => {
          if (item.offsetHeight > 69) {
            overRef[index].style.display = 'block';
          } else {
            overRef[index].style.display = 'none';
          }
          return true;
        });
      }
    },
    filterChange(list) {
      this.filters = list;
      this.showItems = list;
    },
    // 表格列过滤
    filterFocus(visible) {
      if (!visible) { // 收起列表触发
        if (this.filters.toString() !== this.filtersBefore.toString()) {
          this.filtersBefore = Object.assign([], this.filters);
          let formShowItems = [];
          const ele = this;
          this.showItems.map((item) => {
            const fItem = ele.getTableLabel(item);
            formShowItems[fItem.index] = {
              id: item,
              label: fItem.label,
            };
            return true;
          });
          formShowItems = formShowItems.filter(t => t && t !== undefined && t !== null);
          this.formShowItems = formShowItems;
          this.formSummary(this.formPager.pager);
        }
      } else { // 展开列表
        const select = document.getElementsByClassName('el-select-dropdown el-popper is-multiple');
        select[0].style.marginLeft = '-27px';
        select[0].style.marginTop = '-11px';
      }
    },
    getTableLabel(id) {
      let index = 0;
      let fItem = {};
      this.formItems.map((item, k) => {
        if (item.id === id) {
          index = k;
          fItem = item;
        }
        return true;
      });
      fItem.index = index;
      return fItem;
    },
    // 导出表格
    async exportTable() {
      try {
        const data = await formExport(this.$route.query.page_id);
        const url = window.URL.createObjectURL(data.data); // todo URL undefined
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        const title = this.formInfo.title ? this.formInfo.title : '表单汇总';
        link.setAttribute('download', `${title}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      } catch (err) {
        this.$message.error('导出表格失败，请重试～');
      }
    },
    expendAll(content) {
      this.$confirm(content, '', {
        customClass: 'expend-dialog',
        showConfirmButton: false,
        showCancelButton: false,
      });
    },
    // 导出表格
    async stopCollect() {
      try {
        const { status } = await formStopCollect(this.$route.query.page_id, !this.isStopCollect);
        if (status === 'ok') {
          this.isStopCollect = !this.isStopCollect;
          this.$emit('isStopChange', !this.isStop);
          this.$message.success('设置成功～');
        } else {
          this.$message.error('操作失败，请重试～');
        }
      } catch (err) {
        this.$message.error('操作失败，请重试～');
      }
    },
  },
};
</script>

<style>
.empty {
  text-align: center;
  color: #999;
  line-height: 50px;
  font-size: 14px;
}
.perate-wrap {
  margin-bottom: 15px;
}
.perate-wrap .el-select {
  position: relative;
  width: 30px;
  height: 30px;
  overflow: hidden;
  z-index: 10;
  opacity: 0;
  cursor: pointer;
  margin-left: 0;
}
.perate-wrap .el-select__tags {
  max-width: 30px;
  max-height: 30px;
}
.perate-wrap .el-input__inner, .el-input__suffix, {
  display: none;
}
.table-fliter-btn {
  position: absolute;
  left: 0;
  width: 30px;
  height: 30px;
  z-index: 1;
  margin-left: 0;
  padding: 0;
  margin-top: 5px;
}
.table-fliter-btn .ed-icon-icon-test {
  font-size: 24px;
}
.table-fliter-btn .ed-icon-icon-test::before{
  margin-top: -10px;
  display: block;
}
.filter {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.filter-text {
  display: inline-block;
  font-size: 14px;
  color: #333;
}
.filter-option {
  width: auto;
  min-width: 150px;
  max-width: 400px;
  border-top: 1px solid #dddddd5c;
}
.filter-option:first-child {
  border-top: 0;
}
.el-select-dropdown__item {
  padding-right: 30px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.filter-option.selected::after {
  right: 10px !important;
}
.el-select-dropdown__wrap {
  max-height: 320px;
}
.form-table .cell-show  {
  max-height: 69px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.form-table .cell-hide {
  position: absolute;
  top: 0;
  opacity: 1;
  z-index: -1;
}
.form-table.el-table th {
  background: #f5f7fa;
}
.form-table.el-table th.is-leaf .cell{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.filter-right {
  float: right;
}
.expend-all {
  display: none;
  cursor: pointer;
  font-size: 13px;
  color: #409EFF;
}
.expend-dialog.el-message-box {
  width: auto;
  max-width: 550px;
  max-height: 600px;
  overflow-y: auto;
}
.expend-dialog .el-message-box__header {
  height: 3px;
  z-index: 10;
}
</style>
