<template>
  <div>
    <h2 class="text-2xl pb-2 underline font-semibold">Description</h2>
    <p>A title field is edited as a text input and displays as a heading element.</p>
    <h3 class="text-lg py-2 font-semibold">Input Text</h3>
    <code class="ml-4">{{text}}</code>
    <h3 class="text-lg py-2 font-semibold">Non-Editable</h3>
    <title-field class="ml-4 my-2" :text.sync="text"/>
    <h3 class="text-lg py-2 font-semibold">Editable</h3>
    <title-field editable class="ml-4 my-2" :text.sync="text"/>
  </div>
</template>

<script>
import { TitleField } from 'odyssey-components'

export default {
  components: {
    TitleField
  },
  data: () => ({
    text: "My *Awesome* Note's Title"
  })
}
</script>
