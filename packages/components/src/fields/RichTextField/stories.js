import { storiesOf } from "@storybook/vue";

import RichTextField from "./component.js";

storiesOf("Fields|RichTextField", module).add("to Storybook", () => ({
  components: { RichTextField },
  template: '<RichTextField />'}
}));
