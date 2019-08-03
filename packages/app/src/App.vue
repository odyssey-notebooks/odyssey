<template>
  <div id="app">
    <aside id="item-nav">
      <observable-stream paginated endpoint="notes" :query="{}" v-if="loggedin">
        <template v-slot="{ stream: notes }">
          <div>
            <pre v-for="note in notes" :key="note.id" class="note" @click="doc = note">{{ note }}</pre>
          </div>
        </template>
      </observable-stream>
    </aside>
    <div id="center-pane">
      <button @click="$db('notes').create({ content: 'New Note' })">New Note</button>
      <checkbox v-if="doc.hasOwnProperty('editable')" :value="doc.editable"/>
      <rich-text-editor :initial-content="doc.content"/>
    </div>
  </div>
</template>

<script>
import Checkbox from './components/Checkbox.vue';
import RichTextEditor from './components/RichTextEditor.vue';

export default {
  name: "app",
  components: {
    Checkbox,
    RichTextEditor
  },
  data: () => ({
    loggedin: false,
    doc: {}
  }),
  mounted() {
    this.$db().authenticate({ email: '1', password: '1' })
      .then(() => {
        console.log('db: automatically logged in');
        this.loggedin = true;
      })
      .catch(e => {
        if (e.name !== 'NotAuthenticated') console.log('db: automatic login not successful, sending to login');
      })
  }
};
</script>

<style>
@import '~@csstools/normalize.css';

body {
  margin: 0;
}

#app {
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  display: flex;
}

#item-nav {
  width: 25%;
  display: inline-block;
}

#center-pane {
  width: 50%;
  display: inline-block;
}
</style>

