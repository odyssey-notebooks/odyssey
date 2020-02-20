<template>
  <div
    class="widget icon"
    :class="{ disabled }"
  >
    <div class="filter-row">
      <label for="filter">Filter:</label>
      <input class="filter" type="filter" name="filter" id="filter" v-model="filter">
    </div>
    <div class="icon-choices">
      <div class="icon-choice"
        v-for="iconName in filteredIcons"
        :key="iconName"
      >
        <span
          class="mdi" 
          :class="`mdi-${iconName}`"
          @click="!disabled && $emit('input', iconName)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import iconNames from '../helpers/mdi.js'

export default {
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    filteredIcons() {
      return this.filter
        ? iconNames.filter(name => name.includes(this.filter))
        : iconNames
    }
  }
}
</script>

<style scoped>
label {
  padding-right: 1rem;
}
.filter-row {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.icon-choices {
  display: flex;
  flex-wrap: wrap;
  height: 20rem;
  overflow-y: scroll;
  background-color: rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
}
.icon-choice {
  cursor: pointer;
  padding: 0.5rem;
  font-size: 2rem;
  height: fit-content;
}
.disabled .icon-choice {
  cursor: not-allowed;
}
.icon-choice:hover {
  background-color: rgba(0,0,0,0.1);
}
</style>