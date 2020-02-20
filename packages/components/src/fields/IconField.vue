<template>
  <field 
    class="icon" 
    :label="labeled && label" 
    :description="description"
  >
    <div class="composite-widget">
      <div class="preview">
        <p class="icon-name">{{ value }}</p>
        <span class="mdi" :class="`mdi-${value}`" />
      </div>
      <icon-widget
        :value="value" 
        :id="label" 
        :disabled="!editable"
        @input="iconName => $emit('input', iconName)"
      />
    </div>
  </field>
</template>

<script>
import Field from '../fields/Field.vue'
import InlineTextWidget from '../widgets/InlineTextWidget.vue'
import IconWidget from '../widgets/IconWidget.vue'

export default {
  components: {
    Field,
    InlineTextWidget,
    IconWidget
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
.composite-widget {
  display: grid;
  grid-template-columns: 15rem auto;
}
.widget {
  width: 100%;
  font-family: sans-serif;
  margin-bottom: 2rem;
}
.preview {
  text-align: center;
}
.preview .icon-name {
  font-size: 1.5rem;
  margin: 0;
}
.preview .mdi {
  display: inline-block;
  margin-top: 1rem;
  font-size: 5rem;
}
</style>
