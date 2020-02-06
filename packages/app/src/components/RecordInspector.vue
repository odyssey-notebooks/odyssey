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
      <markdown-field
        v-if="typeof content !== 'undefined'" 
        v-model="content" 
        :tags="tags"
        :key="selectedRecordId"
        label="Content"
        editable
      />
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
    MarkdownField,
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
        this.$db('notes').patch(this.selectedRecordId, { title })
      }
    },
    type: {
      get() {
        return this.selectedRecord.type || ''
      },
      set(type) {
        this.$db('notes').patch(this.selectedRecordId, { type })
      }
    },
    content: {
      get() {
        return this.selectedRecord.content
      },
      set(content) {
        this.$db('notes').patch(this.selectedRecordId, { content })
      }
    },
    tags() {
      return this.$store.getters.tags
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.deleteSelectedRecord()
      }
    },
    deleteSelectedRecord() {
      this.$db('notes').remove(this.selectedRecordId)
      this.$store.commit('resetSelectedRecord')
    }
  }
};
</script>

<style>
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
