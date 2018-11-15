<template>
  <div class="login-wrap">
    <div class="login-banner">
      <div class="login-logo"></div>
    </div>
    <div class="login-form">
      <h1>编辑器管理后台</h1>
      <el-form :model="loginForm">
        <el-form-item
          prop="username"
          :rules="{ required: true, message: '请填写用户名', trigger: 'blur' }"
        >
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="{ required: true, message: '请填写密码', trigger: 'blur' }"
        >
          <el-input placeholder="密码" type="password" v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="extra">
          <el-checkbox @change="switchKeep" v-model="loginForm.keepAccount">记住用户名</el-checkbox>
          <div class="tip">** 需要部门账号请联系徐志加</div>
        </el-form-item>
        <el-form-item>
          <div><el-button class="btn" @click.prevent="login">登录</el-button></div>
          <div><el-button class="btn" @click.prevent="oaLogin">OA一键登录</el-button></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as service from '../service';
import Storage from '../util/storage';

export default {
  data() {
    const loginForm = Storage.getItem('AccountInfo', {
      username: '',
      password: '',
      keepAccount: false,
    });
    return {
      loginForm,
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const data = await service.getUserInfo();
        if (data && data.status === 'ok' && data.data) {
          this.$store.commit('setUser', data.data);
          this.$router.push({
            path: '/manage',
          });
        }
      } catch (err) {
        // console.log('未登陆');
      }
    },
    switchKeep() {
      if (!this.loginForm.keepAccount) {
        Storage.setItem('AccountInfo', {
          username: '',
          password: '',
          keepAccount: false,
        });
      }
    },
    oaLogin() {
      const { host } = window.location;
      const api = process.env.NODE_ENV === 'development' || host.indexOf('test-') === 0 ? 'https://test-bfe.meiyou.com/we/oa' : 'https://bfe.meiyou.com/we/oa';
      window.location.href = api;
    },
    async login() {
      const formData = new FormData();
      formData.append('username', this.loginForm.username);
      formData.append('password', this.loginForm.password);
      try {
        const { data } = await service.loginByAccount(formData);
        if (data.status && data.status === 'ok') {
          this.$message({
            type: 'success',
            message: '登录成功~',
          });
          if (this.loginForm.keepAccount) {
            Storage.setItem('AccountInfo', { ...this.loginForm, password: '' });
          }
          this.$store.commit('setUser', { name: this.loginForm.username });
          setTimeout(() => {
            this.$router.push({
              path: '/manage',
            });
          }, 1000);
        } else {
          this.$message({
            type: 'error',
            message: data.message || '',
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
    margin-top: -200px;
  }
  .login-form {
    text-align: center;
    width: 25%;
    height: auto;
    min-height: 250px;
    background: #fff;
    margin: 0 auto;
    position: absolute;
    top: 180px;
    left: 37%;
    border-radius: 4px;
    h1 {
      font-size: 18px;
      margin: 40px 0;
    }
    .el-form {
      width: 80%;
      margin: auto;
      .extra {
        text-align: left;
        .tip {
          color: #FF5476;
          font-size: 14px;
          line-height: 14px;
        }
      }
      .btn {
        background: #ff5375;
        color: #fff;
        width: 216px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
