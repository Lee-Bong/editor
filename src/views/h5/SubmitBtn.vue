<template>
  <w-submit :attr="attr" />
</template>
<script>
import wSubmit from '../../components/element/wsubmit';

export default {
  name: 'wsubmit',
  props: {
    attr: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    wSubmit,
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
.w-form-submit:hover, .w-form-submit:active {
  opacity: 0.85;
}
</style>
