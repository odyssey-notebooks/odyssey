<template>
  <div class="record-inspector">
    <template v-if="selectedRecordId">
      <template v-for="field in fields">
        <inline-text-field
          v-if="field.type === 'inline-text'" 
          :key="field.key + ' - ' + selectedRecordId" 
          :value="field.value"
          :label="field.label"
          @input="value => patchField(field.key, value )"
          editable
        />
        <markdown-field
          v-else-if="field.type === 'markdown'" 
          :key="field.key + ' - ' + selectedRecordId"
          :value="field.value"
          :tags="$store.getters.tags"
          @input="value => patchField(field.key, value )"
          label="Content"
          editable
        />
        <input type="number" 
          v-else-if="field.type === 'number'" 
          :key="field.key + ' - ' + selectedRecordId"
          :value="field.value"
          @input="e => patchField(field.key, Number(e.target.value))"
        >
      </template>
      <hr>
      <button class="delete-btn" @click="deleteButtonClicked">Delete This Record</button>
    </template>
  </div>
</template>

<script>
import { TitleField, InlineTextField, MarkdownField } from 'odyssey-components';

export default {
  components: {
    TitleField,
    InlineTextField,
    MarkdownField
  },
  computed: {
    record() {
      return this.$store.getters.selectedRecordResolved || {}
    },
    selectedRecordId() {
      return this.record._id
    },
    fields() {
      const { __meta__, _id, ...fields } = this.record
      return Object.values(fields)
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.removeSelectedRecord()
      }
    },
    patchField(fieldName, patchedData) {
      this.$db.patch(this.selectedRecordId, { [fieldName]: patchedData })
    },
    removeSelectedRecord() {
      this.$db.remove(this.selectedRecordId)
      this.$store.commit('resetSelectedRecord')
    }
  }
};
</script>

<style scoped>
.record-inspector {
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
