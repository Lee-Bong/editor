<template>
  <div>
    <el-table class="table-box" style="width: 100%" v-loading="loading"
      :row-class-name="tableRowClassName" :data="tableData"
      :default-sort="{prop: 'createdAt', order: 'descending'}" @sort-change="handleSortChange">
      <el-table-column prop="time" label="时间" min-width="200" max-height=50>
      </el-table-column>
      <el-table-column prop="pv" label="PV" sortable min-width="180">
      </el-table-column>
      <el-table-column prop="uv" label="UV" min-width="180">
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

export default {
  components: {
  },
  filters: {
    isOnline(value) {
      return !value ? '上线' : '下线';
    },
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>
<style>

</style>
