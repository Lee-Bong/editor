import { mapState } from 'vuex';

export function settingCom() {
  const drag = {
    methods: {
      locationChange(form, val, active) {
        this.updateDrags(form, val, active, 'location', 'size');
      },
      sizeChange(form, val, active) {
        this.updateDrags(form, val, active, 'size');
      },
      requireChange(form, val, active) {
        this.updateDrags(form, val, active, 'isRequired');
      },
      updateDrags(form, val, active, label, other) {
        let dragItems = this.$store.state.editor[form];
        dragItems[this.$store.state.editor[active]][label] = val;
        if (other) {
          dragItems[this.$store.state.editor[active]][other] =
          dragItems[this.$store.state.editor[active]][other];
        }
        dragItems = Object.assign([], dragItems);
        this.$store.commit('editor_update', {
          [form]: dragItems,
        });
      },
      updateSetting(form, active, prams) {
        let dragItems = this.$store.state.editor[form];
        let setting = dragItems[this.$store.state.editor[active]];
        setting = Object.assign(setting, prams);
        dragItems[this.$store.state.editor[active]] = setting;
        dragItems = Object.assign([], dragItems);
        this.$store.commit('editor_update', {
          [form]: dragItems,
        });
      },
    },
    computed: {
      ...mapState({
        editor: state => state.editor,
        page: state => state.page,
      }),
    },
  };
  return drag;
}

export default {
  settingCom,
};
