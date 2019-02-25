<template>
  <base-setting :setForm="setForm">
    <template slot="form">
      <el-form ref="form" label-width="90px">
        <el-form-item label="标题：" size="mini">
          <el-input type="text" v-model="dragForm.label"
          @change="labelEvent" maxlength="15"></el-input>
          <span class="title-tip">标题最多输入15个字</span>
        </el-form-item>
        <el-form-item label="" size="mini" v-if="!setForm.noReauired">
          <div style="width: 90px; display: inline-block;"></div>
          <el-checkbox :value="dragForm.isRequired" @change="requireEvent">设为必填</el-checkbox>
        </el-form-item>
        <slot name="setting"></slot>
      </el-form>
    </template>
    <template>
      <el-form-item label="位置：" size="mini" class="number-item">
      </el-form-item>
    </template>
  </base-setting>
</template>

<script>
import baseSetting from '@/components/editor/dragSetting/baseSetting';
import { settingCom } from '@/util/settingMxi';

export default {
  name: 'formSetting',
  mixins: [settingCom()],
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    baseSetting,
  },
  data() {
    return {
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 0,
        hmin: 0,
      },
      fileModify: false,
    };
  },
  computed: {
    pHeight() {
      return this.form.postion
    },
  },
  methods: {
    requireEvent(val) {
      this.requireChange(this.setForm.dragName, val, this.setForm.dragActive);
    },
    labelEvent(val) {
      this.updateDrags(this.setForm.dragName, val, this.setForm.dragActive, 'label');
    },
  },
};
</script>

<style >
.bg-reset.el-button.el-button--text {
  position: absolute;
  height: 28px;
  margin-top: 0;
  width: 40px;
  margin-left: 5px;
}
.bg-reset.el-button.el-button--text:hover,
.page-setting .el-button.el-button--text:hover {
  border: 0;
}

.page-setting .el-form-item--mini .el-form-item__content {
  display: inline-block;
  width: 260px;
  margin-left: 0 !important;
}
.page-setting .el-form-item__label {
  padding-right: 5px;
}
.page-setting .el-input--mini .el-input__inner {
  padding: 0 8px;
}
.page-setting .share-img.el-form-item--mini .el-form-item__content {
  width: 200px;
}
.page-setting .el-textarea__inner {
  padding: 3px 8px;
}
.label-dec {
  font-size: 10px;
  color: #999;
  display: inline-block;
  margin-left: 5px;
}
.title-tip {
  color: #999;
  font-size: 12px;
}
.setting-box .el-form-item--mini.el-form-item,
.setting-box .el-form-item--small.el-form-item {
  margin-bottom: 8px;
}
</style>
