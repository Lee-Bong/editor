<template>
    <div class="wrap"><div class="logout" @click="logout">退出</div></div>
</template>

<script>
import * as service from '../../../service';

export default {
  methods: {
    async logout() {
      try {
        const { data } = await service.logout();
        if (data.status && data.status === 'ok') {
          this.$message({
            type: 'success',
            message: '退出成功~',
          });
          setTimeout(() => {
            this.$router.push({
              path: '/login',
            });
          }, 1000);
        } else {
          this.$message({
            type: 'error',
            message: data.status || '',
          });
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: error,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  margin: 0 10px;
  font-size: 14px;
  .logout {
    cursor: pointer;
    color: #409eff;
  }
}
</style>
