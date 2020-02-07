import Field from "./src/fields/Field.vue";
import TitleField from "./src/fields/TitleField.vue";
import InlineTextField from "./src/fields/InlineTextField.vue";
import TextField from "./src/fields/TextField.vue";
import JsonField from "./src/fields/JsonField.vue";
import MarkdownField from "./src/fields/MarkdownField.vue";

import MarkdownPane from "./src/panes/MarkdownPane.vue";
import InlineMarkdownPane from "./src/panes/InlineMarkdownPane.vue";

import InlineTextWidget from "./src/widgets/InlineTextWidget.vue";
import TextAreaWidget from "./src/widgets/TextAreaWidget.vue";


const components = {
  Field,
  TitleField,
  InlineTextField,
  TextField,
  JsonField,
  MarkdownField,
  // panes
  MarkdownPane,
  InlineMarkdownPane,
  // widgets
  InlineTextWidget,
  TextAreaWidget
};

export {
  components,
  
  Field,
  TitleField,
  InlineTextField,
  TextField,
  JsonField,
  MarkdownField,
  // panes  
  MarkdownPane,
  InlineMarkdownPane,
  // widgets
  InlineTextWidget,
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
