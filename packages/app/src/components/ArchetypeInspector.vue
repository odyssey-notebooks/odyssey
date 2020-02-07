<template>
  <div class="archetype-inspector">
    <inline-text-field
      v-model="name" 
      :key="selectedRecordId+'-name'" 
      editable
      label="Name"
    />
    <json-field
      v-model="definition" 
      :key="selectedRecordId+'-definition'" 
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
    selectedRecord() {
      return this.$store.state.selectedRecord
    },
    definition: {
      get() {
        return JSON.stringify(this.selectedRecord.definition, null, 2)
      },
      set(definition) {
        definition = JSON.parse(definition)
        this.$db.patch(this.selectedRecordId, { definition })
      }
    },
    name: {
      get() {
        return this.selectedRecord.name
      },
      set(name) {
        this.$db.patch(this.selectedRecordId, { name })
      }
    },
    selectedRecordId() {
      return this.selectedRecord._id
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.$db.remove(this.selectedRecordId)
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
