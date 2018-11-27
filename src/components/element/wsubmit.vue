<template>
  <button class="w-form-submit" :style="{backgroundColor: attr.bgColor, color: attr.textColor}">
    {{attr.label}}
  </button>
</template>
<script>

export default {
  name: 'texg',
  props: {
    attr: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.w-form-submit {
  height: 40px;
  color: #fff;
  font-size: 14px;
  width: 100%;
  display: block;
  border: 0;
  background-color: #5ac7f9;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
}
/* .w-form-submit:hover {
  color: #fff;
  background-color: #409EFF !important;
  border-color: #409EFF !important;
} */
</style>
