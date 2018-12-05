<template>
    <div>
      <div class="radio-label text-over" :style="{backgroundColor: attr.bgColor,
      color: attr.textColor}">
      <span v-if="attr.isRequired" class="radio-required">*</span>{{attr.label}}</div>
      <div v-for="(item, index) in attr.list"
      :key="index" class="radio-item">
        <el-radio :value="checked" v-if="attr.type===1"
        @change="redioChange(index)" :label="index">{{item.text}}</el-radio>
        <el-checkbox v-if="attr.type===2" ref="checkRef" :label="index"
        @change="checkChange(index)">
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
    index: Number,
  },
  data() {
    return {
      checked: -1,
      selectList: [],
    };
  },
  methods: {
    redioChange(i) {
      this.checked = i;
      this.$emit('valueEvent', this.attr.list[i].text, this.index);
    },
    checkChange(i) {
      this.selectList[i] = this.$refs.checkRef[i].isChecked;
      const value = [];
      this.attr.list.map((item, index) => {
        if (this.selectList[index]) {
          value.push(item.text);
        }
        return true;
      });
      const values = value.join(',');
      this.$emit('valueEvent', values, this.index);
    },
  },
};
</script>

<style>
.radio-required {
  display: inline-block;
  font-size: 14px;
  color: #D0021B;
  margin-right: 2px;
}
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
