import Checkbox from "src/components/Checkbox.vue";
import RichTextEditor from "src/components/RichTextEditor.vue";

const components = {
  Checkbox,
  RichTextEditor
};

export { components, Checkbox, RichTextEditor };

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
