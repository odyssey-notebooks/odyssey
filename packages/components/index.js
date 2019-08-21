import Checkbox from "./src/components/Checkbox.vue";
import RichTextEditor from "./src/components/RichTextEditor.vue";
import TitleField from "./src/fields/TitleField.vue";
import MarkdownField from "./src/fields/MarkdownField.vue";

const components = {
  Checkbox,
  RichTextEditor,
  TitleField,
  MarkdownField
};

export { components, Checkbox, RichTextEditor, TitleField, MarkdownField };

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
