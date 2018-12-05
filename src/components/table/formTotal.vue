<template>
  <div class="content-wrap">
    <div class="empty" v-if="!hasData">没有数据哦～</div>
    <div v-if="hasData">
      <div class="perate-wrap" >
        <div class="filter-text">表格过滤：</div>
        <div class="filter">
          <el-select v-model="showItems"
          multiple
          @change="filterChange"
          @visible-change="filterFocus"
          placeholder="表格过滤">
          <el-option :class="['filter-option']"
            :disabled="item.id === 'fId'"
            v-for="item in formItems"
            :key="item.value"
            :label="item.label"
            :selected="true"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button class="table-fliter-btn" icon="iconfont ed-icon-icon-test" type="text">
        </el-button>
      </div>
        <div class="filter-right">
          <el-button icon="el-icon-bell" @click="stopCollect" :disabled="isStop">停止收集</el-button>
          <el-button icon="el-icon-upload2" @click="exportTable">导出表格</el-button>
        </div>
      </div>
      <el-table class="table-box" style="width: 100%" border v-loading="loading1" ref="tableRef"
        :data="formData" >
        <el-table-column v-for="(item, index) in formShowItems" :key="index" class="table-col"
        :prop="item.id" :label="item.label" min-width="80" :width="item.id === 'fId' &&
        formShowItems.length > 1 ? 80 : 'auto'">
        <template slot-scope="scope">
          <div>
            <div class="cell-show">{{scope.row[item.id]}}</div>
            <div class="cell-hide" >{{scope.row[item.id]}}</div>
            <div class="expend-all" @click="expendAll(scope.row[item.id])">展开全部 >></div>
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
      isStop: false,
    };
  },
  mounted() {
    this.formSummary();
  },
  methods: {
    formItemShow(i) {
      return this.formShowItems.filter(item => item.id === this.formItems[i].id);
    },
    formPageChange(val) {
      this.formPager.pager = val;
      this.formSummary(val);
    },
    async formSummary(pager) {
      try {
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

              if (!pager) {
                this.formItems = this.formItems.concat(formItems, {
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
                const cellRef = Array.prototype.slice.call(document.getElementsByClassName('cell-hide'), 1);
                const expendRef = Array.prototype.slice.call(document.getElementsByClassName('expend-all'), 1);
                cellRef.map((item, index) => {
                  if (item.offsetHeight > 67) {
                    expendRef[index].style.display = 'block';
                  }
                  return true;
                });
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
          this.$refs.tableRef.doLayout();
        }
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
        link.setAttribute('download', `${title}.xsl`);
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
        const { status } = await formStopCollect(this.$route.query.page_id);
        if (status === 'ok') {
          this.isStop = true;
          this.$message.success('停止收集设置成功～');
        } else {
          this.$message.error('操作失败，请重试～');
        }
      } catch (err) {
        this.$message.error('操作失败，请重试～');
      }
    },
  },
  updated() {

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
.perate-wrap .el-select {
  position: relative;
  width: 30px;
  height: 30px;
  overflow: hidden;
  z-index: 10;
  opacity: 0;
  cursor: pointer;
  margin-left: 10px;
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
  margin-left: 10px;
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
  width: 150px;
}
.table-box .cell-show  {
  max-height: 67px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.table-box .cell-hide {
  position: absolute;
  top: 0;
  opacity: 1;
  z-index: -1;
  background: red;
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
</style>
