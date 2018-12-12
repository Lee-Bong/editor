<template>
    <div :class="['toast-wrap']" v-if="isShow">
        <div class="tos">{{text}}</div>
    </div>
</template>
<script>

export default {
  name: 'wtoast',
  props: {
    text: String,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      const showTimer = setTimeout(() => {
        this.hide();
        clearTimeout(showTimer);
      }, 1500);
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.toast-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .tos{
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 4px;
    z-index: 1005;
    position: relative;
    width: auto;
    max-width: 80%;
    height: 40px;
    padding: 0 15px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
    box-sizing: border-box;
  }
}
.toast-show {
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}
</style>
