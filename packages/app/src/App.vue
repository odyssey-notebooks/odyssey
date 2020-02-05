<template>
  <div id="app">
    <record-browser/>
    <div id="center-pane">
      <template v-if="selectedRecordId">
        <title-field 
          v-if="typeof title !== 'undefined'"
          v-model="title" 
          :key="selectedRecordId+'-title'" 
          editable
        />
        <markdown-field v-model="content" :key="selectedRecordId" label="Content" v-if="typeof content !== 'undefined'" editable :tags="tags"/>
      </template>
    </div>
  </div>
</template>

<script>
import { TitleField, MarkdownField } from 'odyssey-components';
import RecordBrowser from '@/components/RecordBrowser.vue'

export default {
  name: "app",
  components: {
    TitleField,
    MarkdownField,
    RecordBrowser
  },
  data: () => ({
    loggedin: false,
  }),
  computed: {
    notes() {
      return this.$store.state.records
    },
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
      const values = this.notes
        .filter(note => this.notes.filter(otherNote => otherNote.title === note.title).length === 1)
      return {
        trigger: '#',
        values,
        selectTemplate(item) {
          return `<mention id="${item.original._id}" title="${item.original.title}"/>`
        },
        menuItemTemplate(item) {
          return '#' + item.original.title;
        },
        lookup(item) {
          return item.title
        },
        allowSpaces: true
      }
    }
  },
  mounted() {
    this.$db().authenticate({ email: '1', password: '1' })
      .then(() => {
        console.log('db: automatically logged in');
        this.loggedin = true;
      })
      .catch(e => {
        if (e.name !== 'NotAuthenticated') console.log('db: automatic login not successful, sending to login');
      })
      .then(() => {
        this.notesSubscription = this.$db('notes')
          .watch()
          .find({
            query: {
              $limit: '-1'
            }
          })
          .subscribe(notes => {
            this.$store.commit('setRecords', notes)
          })
      })
  }
};
</script>

<style>
@import '~@csstools/normalize.css';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

#center-pane {
  width: 75%;
  display: inline-block;
  padding: 1rem 2rem;
  height: 100%;
  overflow: auto;
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

