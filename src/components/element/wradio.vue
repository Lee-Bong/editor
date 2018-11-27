<template>
    <div>
      <div class="radio-label text-over" :style="{backgroundColor: attr.bgColor,
      color: attr.textColor}">
      {{attr.label}}</div>
      <div v-for="(item, index) in attr.list"
      :key="index" class="radio-item">
        <el-radio :value="index" v-model="checked" v-if="attr.type===1">{{item.text}}</el-radio>
        <el-checkbox :value="index" v-model="checked" v-if="attr.type===2">
        {{item.text}}</el-checkbox>
      </div>
    </div>
</template>
<script>

export default {
  name: 'wradio',
  props: {
    attr: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      checked: 0,
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
.radio-item .el-radio, .radio-item .el-checkbox {
  display: block;
  width: 100%;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radio-item .el-radio__input, .radio-item .el-checkbox__input {
  position: absolute;
  right: 0;
}
.radio-item .el-radio__label, .radio-item .el-checkbox__label {
  float: left;
  padding-left: 0;
  position: absolute;
  left: 0;
  right: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.radio-item .el-radio__inner, .radio-item .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.radio-text {
  display: inline-block;
}
.text-over {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.radio-item .el-checkbox__inner::after {
  left: 7px;
  top: 4px;
}
</style>
