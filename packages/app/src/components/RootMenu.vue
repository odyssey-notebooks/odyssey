<template>
  <aside class="root-menu">
    <root-menu-tile
      v-for="menuItem in menuItems"
      :key="menuItem.value"
      :title="menuItem.title"
      :value="menuItem.value"
      :active="activeMenuTab === menuItem.value"
      :icon="menuItem.icon"
      @click="setActiveMenuTab"
    />
  </aside>
</template>

<script>
import RootMenuTile from './RootMenuTile.vue'
import { mapState } from 'vuex'

export default {
  components: {
    RootMenuTile
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Project Explorer',
          value: 'explorer',
          icon: 'compass-rose'
        },
        {
          title: 'Notes',
          value: 'notes',
          icon: 'book-multiple'
        },
        {
          title: 'People and Groups',
          value: 'people',
          icon: 'at'
        },
        {
          title: 'Places',
          value: 'places',
          icon: 'map-marker-multiple-outline'
        },
        {
          title: 'Tasks',
          value: 'tasks',
          icon: 'check-box-multiple-outline'
        },
        {
          title: 'Events',
          value: 'events',
          icon: 'calendar-outline'
        },
        {
          title: 'Goals',
          value: 'goals',
          icon: 'target'
        },
        {
          title: 'Archetypes',
          value: 'archetypes',
          icon: 'shape'
        },
        {
          title: 'Settings',
          value: 'settings',
          icon: 'settings'
        }
      ]
    }
  },
  computed: {
    ...mapState(['activeMenuTab'])
  },
  methods: {
    setActiveMenuTab(val) {
      if (this.setActiveMenuTab !== val) {
        this.$store.commit('setActiveMenuTab', val)
      }
    }
  }
}
</script>

<style scoped>
.root-menu {
  width: var(--root-menu-width);
  background: #777;
  display: flex;
  flex-direction: column;
}
</style>