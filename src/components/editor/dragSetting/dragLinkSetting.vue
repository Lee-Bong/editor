<template>
   <base-setting :setForm="setForm">
   <template slot="form">
      <el-form ref="form" label-width="90px" class="link-setting-form">
        <size-location-pro :form="{dragName, dragActive, size: dragForm.size,
        location: dragForm.location, minW: 15, minH: 15, pH:formWrapH}"/>
        <el-form-item size="mini" class="link-setting-item">
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('1')" label="1">设置跳转链接</el-radio>
          <el-radio v-model="dragForm.sourceType"
            @change="sourceChange('2')" label="2">设置App唤起 /下载链接</el-radio>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='1'" label="App内跳转：" size="mini">
          <el-input type="text" v-model="dragForm.appLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='1'" label="App外跳转：" size="mini">
          <el-input type="text" v-model="dragForm.outLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="唤起链接：" size="mini">
          <el-input  type="text" v-model="dragForm.awakeLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="iOS 渠道：" size="mini">
          <el-input type="text" v-model="dragForm.iosLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="安卓渠道：" size="mini">
          <el-input :span="16" type="text" v-model="dragForm.andLink"></el-input>
        </el-form-item>
        <el-form-item class="link-el" v-if="dragForm.sourceType==='2'" label="应用宝渠道：" size="mini">
          <el-input type="text" v-model="dragForm.yybLink"></el-input>
        </el-form-item>
        <position-pro :dragForm="{dragName, dragActive,position: dragForm.position,
        size: dragForm.size,location: dragForm.location, type: dragForm.type}"/>
      </el-form>
    </template>
  </base-setting>
</template>

<script>
import { dragCom } from '@/util/dragMxi';
import baseSetting from '@/components/editor/dragSetting/baseSetting';
import sizeLocationPro from '@/components/editor/dragSetting/proSetting/sizelocationPro';
import positionPro from '@/components/editor/dragSetting/proSetting/positionPro';

export default {
  mixins: [dragCom()],
  name: 'dragLinkSetting',
  props: {
    dragForm: Object,
    setForm: Object,
  },
  components: {
    baseSetting,
    sizeLocationPro,
    positionPro,
  },
  data() {
    return {
      dragName: 'dragLinks',
      dragActive: 'linkActive',
      sHeight: 800,
      sizeList: ['12px', '14px'],
      location: {
        xmin: 0,
        ymin: 0,
      },
      size: {
        wmin: 15,
        hmin: 15,
      },
    };
  },
  computed: {
    formWrapH() {
      return this.dragForm.position === 'relative' ? this.page.phoneHeight : this.page.screenHeight;
    },
  },
  methods: {
    sourceChange(type) {
      this.$emit('source-change', type, 'dragLinks', 'linkActive');
    },
  },
};
</script>
<style>
.link-el.el-form-item--mini .el-form-item__content {
  display: inline-block;
  width: 255px;
}
.link-setting-form .el-form-item__label {
  padding-right: 5px;
}
.link-setting-form .el-input--mini .el-input__inner {
  padding: 0 8px;
}
.link-setting-form .el-form-item__content {
  margin-left: 0 !important;
}
.link-setting-item {
  margin-left: 25px !important;
}
.link-setting-form .posotion-item .el-radio+.el-radio {
  margin-left: 5px;
}
.link-setting-item .el-form-item__content {
  margin-left: 0;
}
</style>
