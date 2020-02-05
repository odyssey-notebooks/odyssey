<template>
  <div class="record-inspector">
    <template v-if="selectedRecordId">
      <title-field 
        v-if="typeof title !== 'undefined'"
        v-model="title" 
        :key="selectedRecordId+'-title'" 
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
    </template>
  </div>
</template>

<script>
import { TitleField, MarkdownField } from 'odyssey-components';

export default {
  components: {
    TitleField,
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
        return this.selectedRecord.title
      },
      set(title) {
        this.$db('notes').patch(this.selectedRecordId, { title })
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
  }
};
</script>

<style>
.record-inspector {
  width: 75%;
  display: inline-block;
  padding: 1rem 2rem;
  height: 100%;
  overflow: auto;
}
</style>

