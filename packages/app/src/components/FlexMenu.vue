<template>
  <aside class="flex-menu">
      
    <template v-if="$store.state.activeMenuTab === 'explorer'">
      <record-browser :category="{
        singular: 'Daily',
        plural: 'Dailies',
        filter: record => record.type === 'daily'
      }"/>
      <record-browser collapsed :category="{
        singular: 'Uncategorized Record',
        plural: 'Uncategorized',
        filter: record => !record.type
      }"/>
      <record-browser collapsed />
    </template>
    
    <template v-if="$store.state.activeMenuTab === 'types'">
      <record-browser archetype :newRecord="defaultRecord => ({ archetype: true, name: '', definition: defaultRecord })" />
    </template>
    
    <template v-if="$store.state.activeMenuTab === 'settings'">
      <flex-menu-tile label="Database" icon="database"/>
    </template>
  
  </aside>
</template>

<script>
import RecordBrowser from '@/components/RecordBrowser.vue'
import FlexMenuTile from '@/components/FlexMenuTile.vue'

export default {
  components: {
    RecordBrowser,
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