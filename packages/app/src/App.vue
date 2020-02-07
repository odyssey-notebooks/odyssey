<template>
  <div id="app">
    <root-menu/>
    <flex-menu/>
    <main>
      <template v-if="$store.state.selectedRecord">
        <archetype-inspector v-if="$store.state.selectedRecord.archetype"/>
        <record-inspector v-else/>
      </template>
    </main>
  </div>
</template>

<script>
import RootMenu from '@/components/RootMenu.vue'
import FlexMenu from '@/components/FlexMenu.vue'
import RecordInspector from '@/components/RecordInspector.vue'
import ArchetypeInspector from '@/components/ArchetypeInspector.vue'

export default {
  name: "app",
  components: {
    RootMenu,
    FlexMenu,
    RecordInspector,
    ArchetypeInspector
  },
  mounted() {
    this.$store.dispatch('init')
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
main {
  flex: 1 1 100%;
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
