<template>
  <div id="app">
    <aside>
      <record-browser/>
    </aside>
    <main>
      <record-inspector/>
    </main>
  </div>
</template>

<script>
import RecordBrowser from '@/components/RecordBrowser.vue'
import RecordInspector from '@/components/RecordInspector.vue'

export default {
  name: "app",
  components: {
    RecordBrowser,
    RecordInspector
  },
  data: () => ({
    loggedin: false,
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

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

aside {
  width: 25%;
  height: 100%;
  border-right: 1px solid rgba(0,0,0,0.6);
}

main {
  width: 75%;
  height: 100%;
}
</style>

<style>
@import '~@csstools/normalize.css';
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
::-webkit-scrollbar-button{
  display: none; 
  height: 13px;
  border-radius: 0px;
  background-color: #AAA;
}
::-webkit-scrollbar-button:hover{
  background-color: #AAA;
}
::-webkit-scrollbar-thumb{
  background-color: #c7c7c7; border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover{
  background-color: #aaaaaa;
}
::-webkit-scrollbar-track{
  background-color: none;
}
::-webkit-scrollbar-track:hover{
  background-color: none;
}
::-webkit-scrollbar{
  width: 10px;
}
</style>
