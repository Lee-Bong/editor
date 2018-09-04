<template>
    <div class="login-wrap">
        <div class="login-banner">
            <div class="login-logo"></div>
        </div>
        <div class="login-form">
            <h1>编辑器管理后台</h1>
            <div class="login-oa">
                <a href="https://bfe.meiyou.com/oa" class="oa">OA一键登录</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {

    };
  },
  methods: {

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
    background: url('../assets/images/logo.png') center no-repeat;
    background-size: 100%;
}
.login-form {
    text-align: center;
        width: 25%;
    height: auto;
    min-height: 250px;
    background: #FFF;
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
    width:216px;
    height: 40px;
    background: #ff5375;
    margin: 10px auto;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
        margin-top: 90px;

    a {
color: #fff;
    }
}

}

</style>
