<template>
  <div>
    <div v-for="(drag, index) in dragList" :key="drag.id" class="drag-outside">
      <div :is="dragType(drag.type)" :list-index="index" :dragForm="drag"
      @dragTextClick="dragClick" @dragStop="inputDragStop" @dragDel="dragDel" ></div>
    </div>
  </div>
</template>
<script>
import dragText from '@/components/editor/dragItem/dragText';
import dragImg from '@/components/editor/dragItem/dragImg';
import dragLink from '@/components/editor/dragItem/dragLink';
import dragImgLists from '@/components/editor/dragItem/dragImgLists';
import dragVideo from '@/components/editor/dragItem/dragVideo';
import dragAudio from '@/components/editor/dragItem/dragAudio';
import dragFormText from '@/components/editor/dragItem/dragForm/dragFormText';
import dragFormTextarea from '@/components/editor/dragItem/dragForm/dragFormTextarea';
import dragFormRadio from '@/components/editor/dragItem/dragForm/dragFormRadio';
import dragFormSmscode from '@/components/editor/dragItem/dragForm/dragFormSmscode';
import dragFormSubmit from '@/components/editor/dragItem/dragForm/dragFormSubmit';
import dragFormUpload from '@/components/editor/dragItem/dragForm/dragFormUpload';
import { dragCom } from '@/util/dragMxi';

export default {
  mixins: [dragCom()],
  name: 'dragList',
  components: {
    dragText,
    dragImg,
    dragLink,
    dragImgLists,
    dragVideo,
    dragAudio,
    dragFormText,
    dragFormTextarea,
    dragFormRadio,
    dragFormSmscode,
    dragFormSubmit,
    dragFormUpload,
  },
  props: {
    dragList: {
      type: Array,
      default: () => [],
    },
    index: Number,
  },
  data() {
    return {
    };
  },
  methods: {
    dragType(type) {
      switch (type) {
        case 1:
        {
          return 'dragText';
        }
        case 2:
        {
          return 'dragImg';
        }
        case 3: {
          return 'dragLink';
        }
        case 4:
        {
          return 'dragImgLists';
        }
        case 5:
        {
          return 'dragVideo';
        }
        case 6: {
          return 'dragAudio';
        }
        case 7:
        {
          return 'dragFormText';
        }
        case 8:
        {
          return 'dragFormTextarea';
        }
        case 9:
        case 10: {
          return 'dragFormRadio';
        }
        case 11: {
          return 'dragFormSmscode';
        }
        case 12: {
          return 'dragFormSubmit';
        }
        case 13: {
          return 'dragFormUpload';
        }
        default: {
          break;
        }
      }
    },
    dragStopHandle(form, ev, index) { // 拖动组件同步设置
      const dragItems = this.$store.state.editor[form];
      const dragItem = dragItems[index];
      dragItem.size.w = ev.width;
      dragItem.size.h = ev.height;
      dragItem.location.y = ev.top;
      dragItem.location.x = ev.left;
      dragItems[index] = dragItem;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
    inputDragStop(form, ev, index) { // 拖动组件同步设置
      const dragItems = this.$store.state.editor[form];
      const dragItem = dragItems[index];
      dragItem.size.w = ev.width;
      dragItem.size.h = ev.height;
      dragItem.location.y = ev.top;
      dragItem.location.x = ev.left;
      dragItems[index] = dragItem;
      this.$store.commit('editor_update', {
        [form]: dragItems,
      });
    },
  },
  computed: {
    dragActive() {
      return this.dragList.filter(item => item.isShow);
    },
  },
  // updated() {
  //   console.log('child-updated');
  // },
  // beforeUpdate() {
  //   console.log('child-beforeUpdate');
  // },
  beforeDestroy() {
    console.log('parent-beforeDestroy');
  },
  destroyed() {
    console.log('parent-destroyed');
  },

};
</script>

<style>
a,input,label{
  -webkit-tap-highlight-color:rgba(255,0,0,0);
  -webkit-tap-highlight-color: transparent;
  }
.radio-required {
  display: inline-block;
  margin-right: 2px;
  font-size: 14px;
  color: #D0021B;
}
.radio-label {
  height: 40px;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #5ac7f9;
}
.radio-item {
  height: 40px;
  background-color: #fff;
  line-height: 20px;
  color: #333;
  border: 1px solid #dcdfe6;
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

.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
  box-shadow: none;
}
</style>
