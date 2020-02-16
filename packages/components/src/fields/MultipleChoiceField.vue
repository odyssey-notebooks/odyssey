<template>
  <field class="multiple-choice" :label="label">
    <div class="control">
      <multiple-select-widget
        v-model="excludedOptionsSelected"
        :options="excludedOptions"
        :disabled="!editable"
        @focus.native="includedOptionsSelected = []"
      />
      <div class="btn-set">
        <button
          :disabled="!excludedOptionsSelected.length"
          @click="includeOptions"
        >&gt;</button>
        <button
          :disabled="!includedOptionsSelected.length"
          @click="excludeOptions"
        >&lt;</button>
      </div>
      <multiple-select-widget
        v-model="includedOptionsSelected"
        :options="includedOptions"
        :disabled="!editable"
        @focus.native="excludedOptionsSelected = []"
      />
    </div>
  </field>
</template>

<script>
import Field from './Field.vue'
import MultipleSelectWidget from '../widgets/MultipleSelectWidget.vue'

export default {
  components: {
    Field,
    MultipleSelectWidget
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
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
      excludedOptionsSelected: [],
      includedOptionsSelected: []
    }
  },
  computed: {
    includedOptions() {
      return this.options.filter(option => this.value.includes(option.value))
    },
    excludedOptions() {
      return this.options.filter(option => !this.value.includes(option.value))
    }
  },
  methods: {
    includeOptions() {
      const newValue = this.excludedOptionsSelected.concat(this.value)
      this.$emit('input', newValue)
      this.excludedOptionsSelected = []
    },
    excludeOptions() {
      const newValue = this.includedOptions
        .map(option => option.value)
        .filter(val => !this.includedOptionsSelected.includes(val))
      this.$emit('input', newValue)
      this.includedOptionsSelected = []
    }
  }
}
</script>

<style scoped>
.control {
  height: 20vh;
  width: 100%;
  margin-bottom: 2rem;
}
.control {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.btn-set {
  display: grid;
  grid-auto-rows: 1fr 1fr;
}
button {
  cursor: pointer;
}
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>