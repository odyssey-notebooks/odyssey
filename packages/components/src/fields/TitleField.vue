<template>
  <field class="title" :label="label" :description="description">
    <template>
      <text-widget
        :value="value" 
        :id="label" 
        :disabled="!editable"
        @change="text => $emit('input', text)"
      />
    </template>
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import TextWidget from '../widgets/TextWidget.vue'

const description = `The Title field is special because it can be mentioned in markdown fields using the hashtag (#).`

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
    editable: {
      type: Boolean,
      default: false
    },
    labeled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    label() {
      return this.labeled && 'Title'
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
