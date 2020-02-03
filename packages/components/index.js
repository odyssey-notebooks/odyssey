import Field from "./src/fields/Field.vue";
import TitleField from "./src/fields/TitleField.vue";
import MarkdownField from "./src/fields/MarkdownField.vue";

import MarkdownPane from "./src/panes/MarkdownPane.vue";
import InlineMarkdownPane from "./src/panes/InlineMarkdownPane.vue";

import TextWidget from "./src/widgets/TextWidget.vue";
import TextAreaWidget from "./src/widgets/TextAreaWidget.vue";


const components = {
  Field,
  TitleField,
  MarkdownField,
  MarkdownPane,
  InlineMarkdownPane,
  TextWidget,
  TextAreaWidget
};

export {
  components,
  Field,
  TitleField,
  MarkdownField,
  MarkdownPane,
  InlineMarkdownPane,
  TextWidget,
  TextAreaWidget
};

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
