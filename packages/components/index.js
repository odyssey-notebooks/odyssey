import Checkbox from "./src/components/Checkbox.vue";
import RichTextEditor from "./src/components/RichTextEditor.vue";
import TitleField from "./src/fields/TitleField.vue";

const components = {
  Checkbox,
  RichTextEditor
};

export { components, Checkbox, RichTextEditor, TitleField };

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
