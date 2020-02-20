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
    <div class="divider"/>
    <root-menu-tile
      v-for="footerItem in footerItems"
      :key="footerItem.value"
      :title="footerItem.title"
      :value="footerItem.value"
      :active="activeMenuTab === footerItem.value"
      :icon="footerItem.icon"
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
          icon: 'folder-multiple'
        },
        {
          title: 'Notes',
          value: 'notes',
          icon: 'book-multiple'
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
        }
      ],
      footerItems: [
        {
          title: 'Views',
          value: 'views',
          icon: 'eye'
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
.divider {
  flex: 1;
}
</style>