<template>
  <field 
    class="inline-text" 
    :label="labeled && label" 
    :description="description"
  >
    <inline-text-widget
      :value="value" 
      :id="label" 
      :disabled="!editable"
      @change="text => $emit('input', text)"
    />
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import InlineTextWidget from '../widgets/InlineTextWidget.vue'

export default {
  components: {
    Field,
    InlineTextWidget
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Unlabeled Field'
    },
    description: {
      type: String
    },
    editable: {
      type: Boolean,
      default: false
    },
    labeled: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.widget {
  width: 100%;
  font-family: sans-serif; 
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
