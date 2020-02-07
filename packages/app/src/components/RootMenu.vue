<template>
  <aside class="root-menu">
    <div class="root-menu-tile"
      :class="{ active: $store.state.activeMenuTab === 'explorer' }"
      @click="$store.commit('setActiveMenuTab', 'explorer')"
      title="Explorer"
    >
      <span class="mdi mdi-compass-rose"/>
    </div>
    <div class="root-menu-tile"
      :class="{ active: $store.state.activeMenuTab === 'types' }"
      @click="$store.commit('setActiveMenuTab', 'types')"
      title="Data Types"
    >
      <span class="mdi mdi-shape"/>
    </div>
    <div class="root-menu-tile"
      :class="{ active: $store.state.activeMenuTab === 'settings' }"
      @click="$store.commit('setActiveMenuTab', 'settings')"
      title="Settings"
    >
      <span class="mdi mdi-settings"/>
    </div>
  </aside>
</template>

<style scoped>
.root-menu {
  width: 4rem;
  background: #777;
  display: flex;
  flex-direction: column;
}
.root-menu-tile {
  height: 4rem;
  width: 4rem;
  color: white;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms;
  cursor: pointer;
}
.root-menu-tile:hover {
  background-color: rgba(0,0,0,0.2);
}
.root-menu-tile.active {
  background-color: rgba(0,0,0,0.5);
}
</style>