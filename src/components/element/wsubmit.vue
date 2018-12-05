<template>
  <button :class="['w-form-submit', attr.disabled ? 'w-submit-disabled': '']"
  @click="submitForm"
  :style="{backgroundColor: attr.bgColor, color: attr.textColor}">
    {{attr.label}}
  </button>
</template>
<script>

export default {
  name: 'wsubmit',
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
  methods: {
    submitForm() {
      if (this.attr.disabled) return false;
      this.$emit('clickEvent');
    },
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
.w-form-submit:hover, .w-form-submit:active {
  opacity: 0.85;
}
.w-submit-disabled,
.w-submit-disabled:hover{
  background-color: #9B9B9B !important;
  opacity: 1 !important;
  cursor: default;
}
</style>
