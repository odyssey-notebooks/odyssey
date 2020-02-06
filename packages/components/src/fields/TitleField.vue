<template>
  <field
    class="title"
    :label="labeled && label"
    :description="description"
  >
    <text-widget
      :value="value" 
      :id="label" 
      :disabled="!editable"
      @change="text => $emit('input', text)"
    />
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import TextWidget from '../widgets/TextWidget.vue'

const description = `Mention titles in text using using #hashtags.`

export default {
  components: {
    Field,
    TextWidget
  },
  data() {
    return {
      description
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Title'
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
  font-size: 2rem;
}
</style>
