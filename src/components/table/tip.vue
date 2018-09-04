<template>
    <div class="tip-wrap">
    <el-input v-model="tip.url" placeholder="请输入内容">http://www.baidu.com</el-input>
    
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    tip: Object,
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

</style>
