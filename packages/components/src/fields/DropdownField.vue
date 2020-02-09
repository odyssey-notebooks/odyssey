<template>
  <field 
    class="dropdown" 
    :label="labeled && label" 
    :description="description"
  >
    <dropdown-widget
      :value="value" 
      :id="label" 
      :disabled="!editable"
      :options="options"
      @change="text => $emit('input', text)"
    />
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import DropdownWidget from '../widgets/DropdownWidget.vue'

export default {
  components: {
    Field,
    DropdownWidget
  },
  props: {
    value: {
      type: String
    },
    options: {
      type: Array,
      required: true,
      validator: options => options.length === options.filter(option => option.id && option.text).length
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
