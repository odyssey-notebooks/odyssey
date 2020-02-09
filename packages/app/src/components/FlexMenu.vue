<template>
  <aside class="flex-menu">
      
    <template v-if="$store.state.activeMenuTab === 'explorer'">
      <record-browser
        v-for="archetype in $store.getters.archetypes.sort((a, b) => a.name > b.name ? 1 : -1)"
        :archetype="archetype"
        :key="archetype.name"
      />
    </template>
    
    <template v-if="$store.state.activeMenuTab === 'types'">
      <archetype-browser/>
    </template>
    
    <template v-if="$store.state.activeMenuTab === 'settings'">
      <flex-menu-tile label="Database" icon="database" />
    </template>
  
  </aside>
</template>

<script>
import RecordBrowser from '@/components/RecordBrowser.vue'
import ArchetypeBrowser from '@/components/ArchetypeBrowser.vue'
import FlexMenuTile from '@/components/FlexMenuTile.vue'

export default {
  components: {
    RecordBrowser,
    ArchetypeBrowser,
    FlexMenuTile
  }
}
</script>

<style scoped>
.flex-menu {
  width: 300px;
  height: 100%;
  border-right: 1px solid rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
}
</style>