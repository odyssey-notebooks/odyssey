<template>
  <aside class="flex-menu">
      
    <template v-if="activeMenuTab === 'explorer'">
      <record-browser
        v-for="archetype in sortedArchetypes"
        :archetype="archetype"
        :key="archetype.name"
        collapsed
      />
    </template>

    <template v-else-if="activeMenuTab === 'notes'">
      <record-browser
        :archetype="archetypeNamed('Daily Journal Entry')"
        collapsed
      />
      <record-browser
        :archetype="archetypeNamed('Note')"
      />
    </template>

    <template v-else-if="activeMenuTab === 'places'">
      <record-browser
        :archetype="archetypeNamed('Location')"
      />
    </template>

    <template v-else-if="activeMenuTab === 'people'">
      <record-browser
        :archetype="archetypeNamed('Person')"
      />
    </template>

    <template v-else-if="activeMenuTab === 'tasks'">
      <record-browser
        :archetype="archetypeNamed('Repeating Task')"
      />
      <record-browser
        :archetype="archetypeNamed('Task')"
      />
    </template>

    <template v-else-if="activeMenuTab === 'events'">
      <record-browser
        :archetype="archetypeNamed('Event')"
      />
    </template>

    <template v-else-if="activeMenuTab === 'goals'">
      <record-browser
        :archetype="archetypeNamed('Goal')"
      />
    </template>
    
    <template v-else-if="activeMenuTab === 'archetypes'">
      <archetype-browser/>
    </template>
    
    <template v-else-if="activeMenuTab === 'settings'">
      <flex-menu-tile label="Database" icon="database" />
    </template>
  
  </aside>
</template>

<script>
import RecordBrowser from '@/components/RecordBrowser.vue'
import ArchetypeBrowser from '@/components/ArchetypeBrowser.vue'
import FlexMenuTile from '@/components/FlexMenuTile.vue'
import { mapState } from 'vuex'

export default {
  components: {
    RecordBrowser,
    ArchetypeBrowser,
    FlexMenuTile
  },
  computed: {
    ...mapState(['activeMenuTab']),
    sortedArchetypes() {
      return this.$store.getters.archetypes.sort((a, b) => a.name > b.name ? 1 : -1)
    },
    archetypeNamed() {
      return name => this.$store.getters.archetypes.find(arch => arch.name === name)
    }
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
  flex-shrink: 0;
}
</style>