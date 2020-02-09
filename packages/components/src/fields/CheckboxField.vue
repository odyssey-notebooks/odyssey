<template>
  <field 
    class="checkbox" 
    :label="labeled && label" 
    :description="description"
  >
    <checkbox-widget
      :value="value" 
      :id="label" 
      :disabled="!editable"
      @change="val => $emit('input', val)"
    />
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import CheckboxWidget from '../widgets/CheckboxWidget.vue'

export default {
  components: {
    Field,
    CheckboxWidget
  },
  props: {
    value: {
      type: Boolean,
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
  font-family: sans-serif; 
  font-size: 1.5rem;
  margin-bottom: 2rem;
  vertical-align: middle;
}
</style>
