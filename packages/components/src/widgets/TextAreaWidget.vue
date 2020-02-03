<template>
  <textarea
    v-text="value"
    class="widget text-area"
    :class="{
      'not-resizable': !resizable
    }"
    :disabled="!editable"
    @keydown.esc="() => $el.focused && $el.blur()"
    @input="() => $emit('input', $el.value)"
    @change="() => $emit('change', $el.value)"
  />
</template>

<script>
import Tribute from "tributejs";

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false  
    },
    tags: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      tribute: null
    }
  },
  mounted() {
    if (!this.tags) return;
    const tributeOptions = Array.isArray(this.tags)
      ? {
        collection: this.tags
      }
      : this.tags
    this.tribute = new Tribute(tributeOptions)
    this.tribute.attach(this.$el)
  }
}
</script>

<style scoped>
.widget {
  border: 1px solid rgba(0,0,0,0.2);
}
.not-resizable {
  resize: none;
}
</style>
