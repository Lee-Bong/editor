<template>
    <el-form-item size="mini" :inline="true">
        <div class="options-label">选项设置：</div>
        <div class="options-manage">
            <draggable class="layer-drag"
                :list="list"
                @update="datadragEnd"
                :options="{animation: 300,handle:'.moving'}">
                <transition-group name="list-complete" >
                <el-row type="flex" v-for="(item, index) in list" :key="index">
                    <el-input :placeholder="'选项' + (index+1)" class="option-item"
                    ref="optionText"
                    v-model="item.text" @change="optionTextChange(index)"></el-input>
                    <el-button v-if="list.length && list.length > 1"
                    type="text" icon="el-icon-delete"
                    class="del" @click="delOption(index)"></el-button>
                    <el-button type="text" icon="el-icon-rank"></el-button>
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
  name: 'DragSetting',
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
      optionIndex: 1, // 索引只增不减
      itemHeight: 40 + 1,
    };
  },
  mounted() {
    this.optionIndex = this.list.length;
  },
  methods: {
    datadragEnd() {
    },
    addOption() {
      this.optionIndex += 1;
      this.list.push({ text: `选项${this.optionIndex}`, label: this.optionIndex });
      this.updateOption();
    },
    delOption(i) {
      this.list.splice(i, 1);
      this.updateOption();
    },
    updateOption() {
      const h = (this.itemHeight * this.list.length) + 40;
      const size = {
        w: this.form.size.w,
        h,
      };
      this.updateSetting(this.form.dragName, this.form.dragActive, { list: this.list, size });
    },
    optionTextChange(i) { // todo v-model改为value无法获取value
      const text = this.$refs.optionText[i].value;
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
    width: 250px;
  }
  .options-manage .del {
    margin-left: 10px;
  }
  .options-manage .el-icon-delete {
    color: red;
  }
  .options-manage .moving {
    background-color: #eee;
  }
  .options-manage .el-row--flex {
    margin-bottom: 8px;
  }
</style>
