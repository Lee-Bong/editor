<template>
  <div class="empty">没有数据哦～</div>
</template>
<script>

export default {
  name: 'texg',
  props: {
    attr: {
      type: Object,
      default: () => ({ label: '单行文本' }),
    },
    id: String,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
    };
  },
  methods: {
    valueChange(val) {
      this.$emit('valueEvent', val, this.id);
    },
  },
};
</script>

<style>
.empty {
  text-align: center;
  color: #999;
  line-height: 50px;
}
</style>
