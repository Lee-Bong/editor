exports.dragCom = () => {
  const drag = {
    methods: {
      dragClick(index, type) { // 点击组件
        const newEditor = this.deActiveArr(index, type);
        const layerActive = this.updateLayer(index, type);
        newEditor.layerActive = layerActive;
        this.$store.commit('editor_update', newEditor);
        if (this.$store.state.page.pageSet) {
          this.$store.commit('page_update', { pageSet: false });
        }
      },
      deActiveArr(index, type) {
        const updateEditor = {};
        const dragName = this.$store.state.editor.typeCat[type][0];
        for (const item in this.$store.state.editor.typeCat) {
          const form = this.$store.state.editor.typeCat[item];
          const lists = this.$store.state.editor[form[0]];
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
        return updateEditor;
      },
      updateLayer(index, type) {
        const layers = this.$store.state.editor.layerLists;
        let i;
        layers.map((item, key) => {
          if (item.type === type && item.num === index) { // todo 导致报错
            i = key;
          }
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
    },
  };
  return drag;
};
