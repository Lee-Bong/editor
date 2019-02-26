<template>
    <div class="wrap ew-user-wrap">
      <span class="ew-user_name" v-if="user">{{user.name}}</span>
      <span class="ew-user_logout" @click="logout">退出</span>
    </div>
</template>

<script>
import { getUserInfo, logout } from '@/service';

export default {
  async mounted() {
    if (!this.user) {
      const data = await getUserInfo();
      if (data.status && data.status === 'ok') {
        this.$store.commit('setUser', data.data);
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async logout() {
      try {
        const { data } = await logout();
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
.ew-user-wrap {
  margin: 0 10px;
  font-size: 14px;
  .ew-user_name {
    margin: 10px;
  }
  .ew-user_logout {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
