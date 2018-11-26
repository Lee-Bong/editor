<template>
  <button class="w-form-submit" :style="{backgroundColor: bgColor, color: textColor}">{{label}}
  </button>
</template>
<script>

export default {
  name: 'texg',
  props: {
    classList: Array,
    label: String,
    bgColor: String,
    textColor: String,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
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
}
</style>
