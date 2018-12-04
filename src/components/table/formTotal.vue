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
          v-for="(item, index) in formItems"
          :key="item.value"
          :label="item.label"
          :selected="true"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button class="table-fliter-btn" icon="iconfont ed-icon-icon-test" type="text"></el-button>
      </div>
      </div>
      <el-table class="table-box" style="width: 100%" border v-loading="loading1" ref="tableRef"
        :data="formData" >
        <el-table-column v-for="(item, index) in formShowItems" :key="index" class="table-col"
        :prop="item.id" :label="item.label" min-width="80" :width="item.id === 'fId' ? 80 : 'auto'"
        >
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
import * as service from '@/service';
import { formatDate } from '@/util/tools';

export default {
  name: 'formTotal',
  props: {
    attr: {
      type: Object,
      default: () => ({ label: '单行文本' }),
    },
    id: String,
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
          isShow: true,
        },
      ],
      showItems: ['fId'],
      formShowItems: [],
      formPager: {
        size: 10,
        pager: 1,
        total: 30,
      },
      formData: [],
      filters: [], // 当前显示的表格列['id', ***]
      filtersBefore: [],
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
    },
    async formSummary(pager) {
      try {
        const data = await service.formSummary({
          page_id: this.$route.query.page_id,
          currentPage: 1,
          pageSize: 10,
        });
        console.log('sss', data);
        if (data && data.status === 'ok') {
          if (data.data) {
            const fdata = data.data;
            this.formPager.total = fdata.total;
            const formData = [];
            const { summaries, formItems } = data.data;
            if (summaries && summaries.length) {
              summaries.map((item, index) => {
                const tdata = {};
                tdata.fId = this.formPager.pager + index;
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
                  label: '创建时间',
                  isShow: true,
                });
                this.formShowItems = this.formItems;
              }

              this.hasData = true;
              this.formData = formData;
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
      console.log('list', list);
      this.filters = list;
      this.showItems = list;
      // for (let i = 0; i < this.formItems.length; i++) {
      //   if (list.includes(this.formItems[i].id)) {
      //     this.formItems[i].isShow = true;
      //   } else {
      //     this.formItems[i].isShow = false;
      //   }
      // }
      debugger;
    },
    filterFocus(visible) {
      if (!visible) { // 收起列表触发
        if (this.filters.toString() !== this.filtersBefore.toString()) {
          this.filtersBefore = Object.assign([], this.filters);
          const formShowItems = [{
            id: 'fId',
            label: '序号',
          }];
          this.filters.map((item) => {
            formShowItems.push({
              id: item, label: this.getTableLabel(item)[0].label, isShow: true,
            });
            return true;
          });
          this.formShowItems = formShowItems.concat({
            id: 'createdAt',
            label: '创建时间',
          });

          this.$refs.tableRef.doLayout();
          console.log('gio;', this.formShowItems);
        }
      }
    },
    getTableLabel(id) {
      return this.formItems.filter(item => item.id === id);
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
.perate-wrap .el-select__input  {
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
.table-box .cell {
  max-height: 115px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
