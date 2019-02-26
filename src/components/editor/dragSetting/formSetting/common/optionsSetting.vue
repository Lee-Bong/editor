<template>
  <el-form-item size="mini" :inline="true">
    <div class="options-label">选项设置：</div>
    <div class="options-manage">
      <draggable class="ew-layer-drag"
        :list="list"
        @update="datadragEnd"
        :options="{animation: 300,handle:'.moving'}">
        <transition-group name="list-complete" >
          <el-row type="flex" v-for="(item, index) in list" :key="index" class="moving">
            <el-input :placeholder="'选项' + (index+1)" class="option-item"
            ref="optionText"
            v-model="item.text" @change="optionTextChange(index)"
            @clear="optionTextChange(index, '')"></el-input>
            <el-button v-if="list.length && list.length > 1"
            icon="el-icon-delete"
            class="del" @click="delOption(index)"></el-button>
            <el-button v-if="list.length && list.length > 1"
            icon="el-icon-rank" class="move"></el-button>
          </el-row>
        </transition-group>
      </draggable>
        <el-button type="primary" class="option-item add-option"
        @click="addOption">新增选项</el-button>
    </div>
  </el-form-item>
</template>

<script>
import sortable from 'sortable';
import VueDraggable from 'vuedraggable';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'optionsSetting',
  mixins: [settingCom()],
  props: {
    list: Array,
    form: Object,
  },
  components: {
    draggable: VueDraggable,
    sortable,
  },
  data() {
    return {
      dragList: [1, 2, 3],
      itemHeight: 40 + 1,
    };
  },
  methods: {
    datadragEnd() {
      this.updateSetting(this.form.dragName, this.form.dragActive, { list: this.list });
    },
    addOption() {
      this.list.push({ text: `选项${this.form.optionIndex + 1}`, label: this.form.optionIndex + 1 });
      this.updateOption({ optionIndex: this.form.optionIndex + 1 });
    },
    delOption(i) {
      this.list.splice(i, 1);
      this.updateOption({});
    },
    updateOption(arr) {
      const h = (this.itemHeight * this.list.length) + 40;
      const size = {
        w: this.form.size.w,
        h,
      };
      this.updateSetting(this.form.dragName, this.form.dragActive, {
        list: this.list, size, ...arr,
      });
    },
    optionTextChange(i, val) { // todo v-model改为value无法获取value
      const text = val !== undefined ? val : this.$refs.optionText[i].value;
      this.list[i].text = text;
      this.updateSetting(this.form.dragName, this.form.dragActive, { list: this.list });
    },
  },
};
</script>

<style>
.options-label {
  width: 90px;
  font-size: 14px;
  color: #606266;
  text-align: right;
}
.options-manage {
  width: 330px;
  margin-left: 20px;
}
.options-manage .option-item {
  width: 260px;
}
.options-manage .option-item input {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.options-manage .del {
  margin-left: 10px;
}
.options-manage .el-icon-delete {
  color: red;
}
.options-manage .moving {
  background-color: #fff;
}
.options-manage .el-row--flex {
  margin-bottom: 8px;
}
.options-manage .del, .options-manage .move {
  border: 1px solid rgba(0, 0, 0, 0) !important;
  background-color: #fff !important;
  padding: 5px;
  cursor: pointer;
  margin-left: 2px;
}
</style>
