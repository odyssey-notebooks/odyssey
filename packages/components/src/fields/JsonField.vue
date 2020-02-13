<template>
  <field class="json" :label="label">
    <div class="toolbar">
      <div v-if="editable" class="validity-indicator" :class="{ valid, invalid: !valid }">
        <span v-if="valid" class="mdi mdi-check-circle"/>
        <span v-else class="mdi mdi-alert-circle"/>
      </div>
    </div>
    <text-area-widget
      :value="originalText"
      :editable="editable"
      @input="handleUnsavedText"
      @change="handleSavedText"
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
  },
  data() {
    return {
      originalText: this.value,
      unsavedText: this.value
    }
  },
  computed: {
    valid() {
      return this.isValid(this.unsavedText)
    }
  },
  methods: {
    isValid(text) {
      try {
        JSON.parse(text)
        return true
      } catch {
        return false
      }
    },
    handleUnsavedText(text) {
      this.unsavedText = text
    },
    handleSavedText(text) {
      if (this.isValid(text)) {
        this.$emit('input', text)
      }
    }
  }
}
</script>

<style scoped>
.widget {
  height: 50vh;
  width: 100%;
  margin-bottom: 2rem;
}
.validity-indicator {
  font-size: 1rem;
}
.valid {
  color: green;
}
.invalid {
  color: red;
}
</style>
