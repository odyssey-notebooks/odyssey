<template>
  <div id="app">
    <aside id="item-nav">
      <button @click="newNote">New Note</button>
      <hr>
      <div class="items">
        <!-- <pre v-for="note in notes" :key="note.id" class="note" @click="doc = note">{{ note }}</pre> -->
        <div
          :key="note._id"
          v-for="note in sortedNotes"
          class="note"
          :class="{ selected: note._id === doc._id }"
          @click="doc = note"
        >
          <h3 :key="note._id+'-heading'" v-if="note.title" v-html="note.title"/>
          <h3 :key="note._id+'-heading'" v-else v-text="'Untitled'"/>
          <p :key="note._id+'-description'" v-text="note.content.substring(0, 50)+'...'"/>
        </div>
      </div>
    </aside>
    <div id="center-pane">
      <title-field :key="doc._id+'-title'" v-if="typeof title !== 'undefined'" v-model="title" editable/>
      <!-- <quill v-if="content" v-model="content"></quill> -->
      <markdown-field v-model="content" :key="doc._id" label="Content" v-if="typeof content !== 'undefined'" editable :tags="tags"/>
    </div>
  </div>
</template>

<script>
import { TitleField, MarkdownField } from 'odyssey-components';

export default {
  name: "app",
  components: {
    TitleField,
    MarkdownField
  },
  data: () => ({
    loggedin: false,
    notes: [],
    doc: {}
  }),
  computed: {
    title: {
      get() {
        return this.doc.title
      },
      set(title) {
        this.$db('notes').patch(this.doc._id, { title })
        this.doc.title = title
      }
    },
    content: {
      get() {
        return this.doc.content
      },
      set(content) {
        this.$db('notes').patch(this.doc._id, { content })
        this.doc.content = content
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
          this.doc = record
        })
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
            this.notes = notes
          })
      })
  },
  beforeDestroy() {

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

#item-nav {
  width: 25vw;
  display: inline-block;
  overflow: auto;
  background: rgba(0,0,0,0.1);
  border-right: 1px solid black;
}

#item-nav .items, #item-nav pre {
  overflow: hidden;
  text-overflow: ellipsis;
}

#item-nav .items {
  padding: 1rem;
}

#item-nav pre {
  border: 1px solid black;
  padding: 1rem;
  margin: 0;
}

#item-nav pre:not(:first-child) {
  margin-top: 1rem;
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

