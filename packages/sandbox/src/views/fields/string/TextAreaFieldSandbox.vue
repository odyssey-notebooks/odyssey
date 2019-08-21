<template>
  <div>
    <h2 class="text-2xl pb-2 underline font-semibold">Description</h2>
    <p>A text area field is edited as a textarea and leverages markdown to display as a div.</p>
    <h3 class="text-lg py-2 font-semibold">Input Text</h3>
    <pre class="ml-4"><code>{{text}}</code></pre>
    <h3 class="text-lg py-2 font-semibold">Non-Editable</h3>
    <text-area-field class="ml-4 my-2" :text.sync="text"/>
    <h3 class="text-lg py-2 font-semibold">Editable</h3>
    <text-area-field editable class="ml-4 my-2" :text.sync="text"/>
  </div>
</template>

<script>
import { TextAreaField } from 'odyssey-components'

const text = `# My Title

Some body yada yada wew

> A block quote

- Bulleted
- List
`

export default {
  components: {
    TextAreaField
  },
  data: () => ({
    text
  })
}
</script>
