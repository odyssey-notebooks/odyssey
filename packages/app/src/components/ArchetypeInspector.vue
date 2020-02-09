<template>
  <div class="archetype-inspector">
    <inline-text-field
      v-model="name" 
      :key="archetypeId+'-name'" 
      editable
      label="Name"
    />
    <inline-text-field
      v-model="namePlural" 
      :key="archetypeId+'-name-pl'" 
      editable
      label="Name (plural)"
    />
    <json-field
      v-model="definition" 
      :key="archetypeId+'-definition'" 
      editable
      label="Definition"
    />
    <hr>
    <button class="delete-btn" @click="deleteButtonClicked">Delete This Record</button>
  </div>
</template>

<script>
import { InlineTextField, JsonField } from 'odyssey-components';

export default {
  components: {
    InlineTextField,
    JsonField
  },
  computed: {
    archetype() {
      return this.$store.state.selectedRecord
    },
    archetypeId() {
      return this.archetype._id
    },
    definition: {
      get() {
        const { _id, __meta__, archetype, name, namePlural, ...definition } = this.archetype
        return JSON.stringify(definition, null, 2)
      },
      set(definition) {
        definition = JSON.parse(definition)
        this.$db.patch(this.archetypeId, definition)
      }
    },
    name: {
      get() {
        return this.archetype.name
      },
      set(name) {
        this.$db.patch(this.archetypeId, { name })
      }
    },
    namePlural: {
      get() {
        return this.archetype.namePlural
      },
      set(namePlural) {
        this.$db.patch(this.archetypeId, { namePlural })
      }
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.$db.remove(this.archetypeId)
        this.$store.commit('resetSelectedRecord')
      }
    }
  }
};
</script>

<style scoped>
.archetype-inspector {
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  overflow: auto;
}
hr {
  margin: 4rem 0;
  border-color: rgba(0,0,0,0.2);
}
.delete-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255,0,0,0.1);
  border: 1px solid rgba(255,0,0,0.3);
  cursor: pointer;
}
</style>
