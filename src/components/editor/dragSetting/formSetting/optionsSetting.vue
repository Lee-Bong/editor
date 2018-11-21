<template>
    <el-form-item size="mini" :inline="true">
        <div class="options-label">选项设置：</div>
        <div class="options-manage">
            <draggable class="layer-drag"
                :list="dragList"
                @update="datadragEnd"
                :options="{animation: 300,handle:'.moving'}">
                <transition-group name="list-complete" >
                <el-row type="flex" v-for="(layer, index) in dragList" :key="index">
                    <el-input :placeholder="'选项' + (index+1)" class="option-item"></el-input>
                    <el-button type="danger" icon="el-icon-delete" circle size="small"
                     class="del"></el-button>
                    <el-button type="text" icon="el-icon-rank"></el-button>
                </el-row>
                </transition-group>
            </draggable>
            <el-button type="primary" class="option-item">新增选项</el-button>
        </div>

    </el-form-item>
</template>

<script>
import sortable from 'sortable';
import VueDraggable from 'vuedraggable';

export default {
  name: 'DragSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    draggable: VueDraggable,
    sortable,
  },
  data() {
    return {
      dragList: [1, 2, 3],
    };
  },
  methods: {
    datadragEnd() {
    },
  },
};
</script>

<style lang="less" scoped>
.options-label {
    width: 90px;
    font-size: 14px;
    color: #606266;
    text-align: right;
}
.options-manage {
    width: 330px;
    margin-left: 20px;
    .option-item {
        width: 250px;
    }
    .del {
        margin-left: 10px;
    }
    .moving {
        background-color: red;
    }
}
</style>
