<template>
  <field class="text" :label="label">
    <text-area-widget
      class="view text"
      :editable="editable"
      :value="value"
      @change="text => $emit('input', text)"
    />
  </field>
</template>

<script>
import Field from './Field.vue'
import TextAreaWidget from '../widgets/TextAreaWidget.vue'

export default {
  components: {
    Field,
    TextAreaWidget
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    editable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
