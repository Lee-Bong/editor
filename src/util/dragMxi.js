exports.dragCom = () => {
  const drag = {
    methods: {
      dragClick(index, type) { // 点击组件  index=-1表示全部都取消，index=-2表示点击了网页标题
        let newEditor,
          layerActive;
        if (type !== undefined) {
          newEditor = this.deActiveArr(index, type);
          layerActive = this.updateLayer(index, type);
        } else {
          newEditor = this.deActiveArr(index, type, true);
        }

        newEditor.layerActive = layerActive;
        this.$store.commit('editor_update', newEditor);
        if (this.$store.state.page.pageSet && index !== -2) {
          this.$store.commit('page_update', { pageSet: false });
        }
      },
      deActiveArr(index, type, otherClick) {
        const updateEditor = {};
        for (const item in this.$store.state.editor.typeCat) {
          const form = this.$store.state.editor.typeCat[item];
          const lists = this.$store.state.editor[form[0]];
          if (otherClick) {
            updateEditor[form[0]] = this.textActiveOff(lists, { index: 0, isAll: true });
            updateEditor[form[2]] = false;
          } else {
            const dragName = this.$store.state.editor.typeCat[type][0];
            if (lists.length) {
              if (dragName === form[0]) {
                updateEditor[form[0]] = this.textActiveOff(lists, { index });
                updateEditor[form[2]] = true;
                updateEditor[form[3]] = index;
              } else {
                updateEditor[form[0]] = this.textActiveOff(lists, { index: 0, isAll: true });
                updateEditor[form[2]] = false;
              }
            }
          }
        }
        return updateEditor;
      },
      updateLayer(index, type) {
        const layers = this.$store.state.editor.layerLists;
        let i;
        layers.map((item, key) => {
          if (item.type === type && item.num === index) { // todo 导致报错
            i = key;
          }
          return true;
        });
        return i;
      },
      textActiveOff(arr, payload) {
        const { index, isAll } = payload;
        if (arr && arr.length) {
          if (isAll !== undefined) {
            arr[index].isActive = false;
            arr[index].zIndex = arr[index].dragIndex;
          } else {
            arr[index].isActive = true;
            arr[index].zIndex = 1000;
          }
          if (arr.length !== 1) {
            arr.map((item, i) => {
              if (i !== index && arr[i].isActive) {
                arr[i].isActive = false;
                arr[i].zIndex = arr[i].dragIndex;
              }
            });
          }
        }
        return arr;
      },
      fixedTopChange(val) {
        this.fixedTop = this.getDistan(val);
        this.dragForm.location.y = this.fixedTop;
        this.setFixedBottom(val, this.dragForm.size.h);
        this.locationChange();
      },
      fixedBottomChange(val) {
        this.fixedBottom = this.getDistan(val);
        const y = this.$store.state.page.screenHeight - this.fixedBottom - this.dragForm.size.h;
        this.dragForm.location.y = y;
        this.locationChange();
      },
      getDistan(val) {
        let dis;
        const maxBottom = this.$store.state.page.screenHeight - this.dragForm.size.h;
        if (val > maxBottom) {
          dis = maxBottom;
        } else {
          dis = val;
        }
        return dis;
      },
      setFixedBottom(x, h) {
        this.fixedBottom = this.$store.state.page.screenHeight - x - h;
      },

    },
    computed: {
      fixedBottom() {
        return this.$store.state.page.screenHeight - this.dragForm.location.y
       - this.dragForm.size.h;
      },
      fixedTop() {
        return this.dragForm.location.y;
      },
    },
  };
  return drag;
};
