<template>
  <aside class="record-browser">
    <button @click="newNote">New Note</button>
    <hr>
    <div class="items">
      <div
        :key="note._id"
        v-for="note in sortedNotes"
        class="note"
        :class="{ selected: note._id === selectedRecordId }"
        @click="$store.commit('selectRecord', note)"
      >
        <h3 :key="note._id+'-heading'" v-if="note.title" v-html="note.title"/>
        <h3 :key="note._id+'-heading'" v-else v-text="'Untitled'"/>
        <p :key="note._id+'-description'" v-text="note.content.substring(0, 50)+'...'"/>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    notes() {
      return this.$store.state.records
    },
    selectedRecordId() {
      return (this.$store.state.selectedRecord || {})._id
    },
    sortedNotes() {
      return this.notes.sort((a, b) => {
        if (a.created === b.created) return 0;
        
        return !(a.created < b.created)
          ? -1
          : 1
      })
    }
  },
  methods: {
    newNote() {
      this.$db('notes')
        .create({
          title: '', 
          content: '',
          created: (new Date).toISOString()
        })
        .then(record => {
          this.$store.commit('selectRecord', record)
        })
    }
  },
};
</script>

<style>
.record-browser {
  width: 25vw;
  display: inline-block;
  overflow: auto;
  background: rgba(0,0,0,0.1);
  border-right: 1px solid black;
}
.record-browser .items {
  overflow: hidden;
  text-overflow: ellipsis;
}
.record-browser .items {
  padding: 1rem;
}
.note {
  border: 1px solid #bbb;
  margin: 0.5rem 0;
  padding: 0.5rem;
  cursor: pointer;
}
.note:first-child {
  margin: 0 0 0.5rem 0;
}
.note h3 {
  margin: 0 0 0.25rem 0;
}
.note p {
  margin: 0;
}
</style>

