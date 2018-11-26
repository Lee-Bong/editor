<template>
    <div>
      <div class="radio-label" :style="{backgroundColor: bgColor, color: textColor}">{{label}}</div>
      <div v-for="(item, index) in list"
      :key="index" class="radio-item">
        <span class="radio-text">{{item.text}}</span>
        <el-radio :value="1" v-if="type===1"></el-radio>
        <el-checkbox :value="1" v-if="type===2"></el-checkbox>
      </div>
    </div>
</template>
<script>

export default {
  name: 'texg',
  props: {
    label: String,
    list: Array,
    styles: Object,
    place: {
      type: String,
      default: () => '单行文本',
    },
    classList: Array,
    type: Number,
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
.radio-label {
  background-color: #5AC7F9;
  color: #fff;
  font-size: 18px;
  height: 40px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  line-height: 40px;
}
.radio-item {
  height: 40px;
  background-color: #fff;
  line-height: 20px;
  color: #333;
  border: 1px solid #DCDFE6;
  border-top: 0;
  padding: 0 14px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.radio-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.radio-item .el-radio__inner, .radio-item .el-checkbox__inner {
  width: 20px;
  height: 20px;
  flex-basis: 20px;
  flex-grow: 1;
}
.radio-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
}
</style>
