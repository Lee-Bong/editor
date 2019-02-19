<template>
  <div :class="[attr.isRequired? 'from-required': '', 'form-w-textarea']">
    <textarea
    @input="valueChange"
    :placeholder="attr.label"
    :class="[...attr.classList, 'w-textarea']"
    :style="{resize: 'none'}">
    </textarea>
  </div>
</template>
<script>

export default {
  name: 'wtextarea',
  props: {
    attr: {
      type: Object,
      default: () => {},
    },
    index: Number,
  },
  data() {
    return {
    };
  },
  methods: {
    valueChange(val) {
      this.$emit('valueEvent', val.srcElement.value, this.index);
    },
  },
};
</script>

<style>
.form-w-textarea:before {
  top: 16px;
  z-index: 5;
}
.w-textarea {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 12px 14px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  line-height: 20px;
  text-align: left;
  overflow-y: auto;
  display: block;
  position: relative;
  outline: none;
}
.w-textarea:focus {
  border: 1px solid #409EFF;
}
.w-textarea::-webkit-input-placeholder {
  color: #909399;
  font-size: 14px;
}
.w-textarea:-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.w-textarea::-moz-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
.w-textarea:-ms-input-placeholder{
  padding-top: 12px;
  color: #909399;
  font-size: 14px;
}
</style>
