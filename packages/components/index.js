import Field from "./src/fields/Field.vue";
import TitleField from "./src/fields/TitleField.vue";
import InlineTextField from "./src/fields/InlineTextField.vue";
import TextField from "./src/fields/TextField.vue";
import JsonField from "./src/fields/JsonField.vue";
import MarkdownField from "./src/fields/MarkdownField.vue";
import DropdownField from "./src/fields/DropdownField.vue";
import CheckboxField from "./src/fields/CheckboxField.vue";
import MultipleChoiceField from "./src/fields/MultipleChoiceField.vue";
import IconField from "./src/fields/IconField.vue";

import MarkdownPane from "./src/panes/MarkdownPane.vue";
import InlineMarkdownPane from "./src/panes/InlineMarkdownPane.vue";

import InlineTextWidget from "./src/widgets/InlineTextWidget.vue";
import TextAreaWidget from "./src/widgets/TextAreaWidget.vue";
import DropdownWidget from "./src/widgets/DropdownWidget.vue";
import CheckboxWidget from "./src/widgets/CheckboxWidget.vue";
import MultipleSelectWidget from "./src/widgets/MultipleSelectWidget.vue";
import IconWidget from "./src/widgets/IconWidget.vue";


const components = {
  Field,
  TitleField,
  InlineTextField,
  TextField,
  JsonField,
  MarkdownField,
  DropdownField,
  CheckboxField,
  MultipleChoiceField,
  IconField,
  // panes
  MarkdownPane,
  InlineMarkdownPane,
  // widgets
  InlineTextWidget,
  TextAreaWidget,
  DropdownWidget,
  CheckboxWidget,
  MultipleSelectWidget,
  IconWidget
};

export {
  components,
  
  Field,
  TitleField,
  InlineTextField,
  TextField,
  JsonField,
  MarkdownField,
  DropdownField,
  CheckboxField,
  MultipleChoiceField,
  IconField,
  // panes
  MarkdownPane,
  InlineMarkdownPane,
  // widgets
  InlineTextWidget,
  TextAreaWidget,
  DropdownWidget,
  CheckboxWidget,
  MultipleSelectWidget,
  IconWidget
};

const plugin = {
  install(Vue) {
    for (const [name, component] of Object.entries(components)) {
      Vue.component(name, component);
    }
  }
};

export default plugin;
