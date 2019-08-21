import Checkbox from "./src/components/Checkbox.vue";
import RichTextEditor from "./src/components/RichTextEditor.vue";
import TitleField from "./src/fields/TitleField.vue";
import TextAreaField from "./src/fields/TextAreaField.vue";

const components = {
  Checkbox,
  RichTextEditor,
  TitleField,
  TextAreaField
};

export { components, Checkbox, RichTextEditor, TitleField, TextAreaField };

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
