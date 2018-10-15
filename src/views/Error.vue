<template>
    <div class="wrap wrap-error">
        <div>
            <div class="logo">
                <img src="../assets/images/error.png" />
            </div>
            <div class="text">
                <!-- <div class="code">
                    404
                </div> -->
                <div class="tip">
                    抱歉，您访问的页面不存在
                </div>
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
    margin-bottom: 20px;
    img {
        height: 100px;
    }
  }
  .text {
      text-align: center;
      .code {
        font-size: 3rem;
      }
      .tip {
        font-size: 1rem;
        line-height: 3.4rem;
        color: #888;
      }
  }
}
.wrap-error {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
