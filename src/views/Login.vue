<template>
  <div class="login-wrap">
    <div class="login-banner">
      <div class="login-logo"></div>
    </div>
    <div class="login-form">
      <h1>编辑器管理后台</h1>
      <a ref="oaLogin" class="login-oa">
        OA一键登录
      </a>
    </div>
  </div>
</template>

<script>
import * as service from '../service';

export default {
  name: 'HelloWorld',
  props: {
  },
  methods: {
    async getUserInfo() {
      try {
        const ele = this;
        await service.getUserInfo().then((data) => {
          if (data && data.status === 'ok' && data.data) {
            ele.$router.push({
              path: '/manage',
            });
          }
        }).catch((err) => {
          if (err.request.status === 401) {
            // console.log('未登陆');
          }
        });
      } catch (err) {
        // console.log('未登陆');
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.oaLogin.setAttribute('href', 'https://bfe.meiyou.com/we/oa');
    });
    this.getUserInfo();
  },
};
</script>

<style scoped lang="scss">
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f0eb;
  .login-banner {
    width: 100%;
    height: 400px;
    background: #ff5375;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-logo {
    width: 240px;
    height: 85px;
    background: url("../assets/images/logo.png") center no-repeat;
    background-size: 100%;
    margin-top: -60px;
  }
  .login-form {
    text-align: center;
    width: 25%;
    height: auto;
    min-height: 250px;
    background: #fff;
    margin: 0 auto;
    position: absolute;
    top: 250px;
    left: 37%;
    border-radius: 4px;
    h1 {
      font-size: 18px;
      margin: 40px 0;
    }
  }
  .login-oa {
    display: block;
    width: 216px;
    height: 40px;
    background: #ff5375;
    margin: 10px auto;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    margin-top: 64px;
    color: #fff;
    text-decoration: none;
  }
}
</style>
