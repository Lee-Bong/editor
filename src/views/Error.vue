<template>
    <div class="wrap">
        <div class="logo">
            <img src="../assets/images/error.png" />
        </div>
        <div class="text">
            <div class="code">
                404
            </div>
            <div class="tip">
                抱歉，您访问的页面不存在
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.wrap {
  background-color: #fff;
  .logo {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
  .text {
      text-align: center;
      .code {
        font-size: 3rem;
      }
      .tip {
        font-size: 1rem;
        color: rgba(0, 0, 0, 0.427);
      }
  }
}
</style>
