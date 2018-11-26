<template>
    <textarea
    :rows="rows"
    :placeholder="place"
    :class="[...classList, 'w-textarea']" :style="Object.assign(styles,
     {width: size.w+'px', height: size.h+'px'})">
    </textarea>
</template>
<script>

export default {
  name: 'texg',
  props: {
    styles: Object,
    place: {
      type: String,
      default: () => '多行文本',
    },
    classList: Array,
    rows: Number,
    size: Object,
  },
  data() {
    return {
      dragName: 'dragFormTexts',
    };
  },
  updated() {
    // console.log('updated', this.size);
  },
};
</script>

<style>
.w-textarea {
  box-sizing: border-box;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 0 14px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  text-align: left;
  overflow-y: auto;
}
.w-textarea::-webkit-input-placeholder {
  padding-top: 12px;
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
