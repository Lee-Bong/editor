<template>
  <div>
    <el-table class="table-box" style="width: 100%" v-loading="loading"
      :row-class-name="tableRowClassName" :data="tableData"
      :default-sort="{prop: 'createdAt', order: 'descending'}" @sort-change="handleSortChange">
      <el-table-column prop="title" label="标题" min-width="200" max-height=50>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" sortable min-width="180">
      </el-table-column>
      <el-table-column prop="visit" label="浏览量" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text"
            @click="goTotalWeb(scope.row)">查看报表</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="280">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleAdd(scope.$index, scope.row)">复制</el-button>
          <el-button size="mini" type="primary" plain
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover placement="bottom" width="220" trigger="click"
            @show="popverShow(scope.$index, scope.row)">
            <div class="spread" v-if="scope.$index === tip.index">
              <qr-code :url="tip.url" />
            </div>
            <el-button size="mini" type="primary" plain slot="reference">推广</el-button>
          </el-popover>
          <el-button size="mini" :type="scope.row.online === 1 ? '' : 'primary'"
            plain @click="handlePublish(scope.$index, scope.row)">
            {{ scope.row.online | isOnline }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table-page" layout="total, prev, pager, next, jumper"
      @current-change="handlePageChange" :current-page="pager.page"
      :page-size="pager.size" :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
import { formatTableData } from '@/util/tools';
import * as API from '@/service';
import qrCode from '../../components/QrCode';

const getTipUrl = id => `${API.api}/we/view?page_id=${id}&is_formal=1`;

export default {
  components: {
    qrCode,
  },
  filters: {
    isOnline(value) {
      return !value ? '上线' : '下线';
    },
  },
  data() {
    return {
      tip: { // 推广二维码
        index: -1,
        url: '',
      },
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
        filter: 'public',
      },
      loading: false, // 表格 loading 状态
    };
  },
  methods: {
    getList(isCope) { // 获取页面数据, isCope 复制引起的刷新
      const q = { ...this.pager, ...this.query };
      this.loading = true;
      API.getPageList(q)
        .then((res) => {
          if (res.status === 'ok') {
            const list = res.data.pages;
            let newList = [];
            if (list && list.length) {
              list.map((item) => {
                newList.push(formatTableData(item));
                return true;
              });
              newList = newList.filter(e => !!e);
            }
            if (isCope) {
              newList[0].isNew = true;
            }
            this.tableData = newList;
            this.pageTotal = res.data.count;
          }
          this.loading = false;
        })
        .catch(() => {
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
    handleAdd(index, { id }) { // 复制
      const ele = this;
      API.duplicatePage(id)
        .then((res) => {
          if (res.status === 'ok') {
            ele.$message.success('复制成功');
            this.pager.page = 1;
            this.getList(true);
          } else {
            ele.$message.warning('未复制成功，请稍后重试~');
          }
        })
        .catch(() => {
          this.$message.error('出错了，请稍后重试~');
        });
    },
    handleEdit(index, { id }) {
      this.$router.push({
        path: '/editor',
        query: { page_id: id, public: 1 },
      });
    },
    handlePublish(index, { id, online }) {
      if (online) { // 已上线
        API.markPage(id, 0)
          .then((res) => {
            if (res.status === 'ok') {
              const updatedData = formatTableData(res.data);
              this.$set(this.tableData[index], 'online', updatedData.online);
              this.$message.success('下线操作成功');
            } else {
              this.$message.warning('下线操作失败，请稍后再试~');
            }
          })
          .catch(() => {
            this.$message.error('出错了，请稍后再试~');
          });
      } else { // 未上线
        // API.publishPage(id)
        API.markPage(id, 1)
          .then((res) => {
            if (res.status === 'ok') {
              const updatedData = formatTableData(res.data);
              this.$set(this.tableData[index], 'online', updatedData.online);
              this.$message.success('上线操作成功');
            } else {
              this.$message.warning('上线操作失败，请稍后再试~');
            }
          })
          .catch(() => {
            this.$message.error('出错了，请稍后再试~');
          });
      }
    },
    search(value) {
      this.query.dk = value;
      this.getList();
    },
    popverShow(index, { id }) {
      this.tip.index = index;
      this.tip.url = getTipUrl(id);
    },
    goTotalWeb({ id, clickArr }) {
      this.$router.push({
        name: 'total',
        query: { page_id: `weditor_${id}` },
        params: {
          clickArr,
        },
      });
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
.el-table th,
.el-table tr.table-row-new {
  background-color: #ecf5ff;
}
.spread {
  height: auto;
  width: 225px;
}
</style>
