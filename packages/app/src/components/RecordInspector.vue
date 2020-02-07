<template>
  <div class="record-inspector">
    <template v-if="selectedRecordId">
      <title-field
        v-model="title" 
        :key="selectedRecordId+'-title'" 
        editable
      />
      <inline-text-field
        v-model="type"
        label="Type"
        :key="selectedRecordId+'-type'" 
        editable
      />
      <template v-for="field in fields">
        <markdown-field
          v-if="field.type === 'md'" 
          :key="field.name + ' - ' + selectedRecordId"
          :value="field.value"
          :tags="$store.getters.tags"
          @input="value => patchField(field.name, { value })"
          label="Content"
          editable
        />
        <input type="number" 
          v-if="field.type === 'number'" 
          :key="field.name + ' - ' + selectedRecordId"
          :value="field.value"
          @input="e => patchField(field.name, { value: Number(e.target.value) })"
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
    selectedRecord() {
      return this.$store.state.selectedRecord || {}
    },
    selectedRecordId() {
      return this.selectedRecord._id
    },
    title: {
      get() {
        return this.selectedRecord.title || ''
      },
      set(title) {
        this.$db.patch(this.selectedRecordId, { title })
      }
    },
    type: {
      get() {
        return this.selectedRecord.type || ''
      },
      set(type) {
        this.$db.patch(this.selectedRecordId, { type })
      }
    },
    fields() {
      return Object.entries(this.selectedRecord.fields)
        .map(([name, originalData]) => {
          let data = { ...originalData }
          if (typeof data !== 'object') {
            data = {
              value: data
            }
          }
          if (!data.type) {
            data.type = typeof data.value
          }
          data.name = name
          return data
        })
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.removeSelectedRecord()
      }
    },
    patchField(fieldName, patch) {
      const { fields } = this.selectedRecord
      const fieldData = fields[fieldName]
      const newFieldData = Object.assign({ }, fieldData, patch)
      fields[fieldName] = newFieldData
      this.$db.patch(this.selectedRecordId, { fields })
    },
    removeSelectedRecord() {
      this.$db.remove(this.selectedRecordId)
      this.$store.commit('resetSelectedRecord')
    }
  },
  watch: {
    selectedRecordId(id) {
      // Patching content
      // if (this.selectedRecord.content && !this.selectedRecord.fields) {
      //   let fields = {
      //     content: {
      //       value: this.selectedRecord.content,
      //       type: 'md'
      //     }
      //   }
      //   this.$db.patch(id, { fields }).then(record => this.$store.commit('selectRecord', record))
      // }
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
