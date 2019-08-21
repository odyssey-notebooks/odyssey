import TitleField from "./src/fields/TitleField.vue";
import MarkdownField from "./src/fields/MarkdownField.vue";

const components = {
  TitleField,
  MarkdownField
};

export { components, TitleField, MarkdownField };

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
