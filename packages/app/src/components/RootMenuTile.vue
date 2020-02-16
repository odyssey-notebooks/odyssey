<template functional>
  <div class="root-menu-tile"
    :class="{ active: props.active }"
    :title="props.title"
    @click="listeners.click(props.value)"
  >
    <span class="mdi" :class="`mdi-${props.icon}`"/>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    active: Boolean,
    icon: String
  }
}
</script>

<style scoped>
.root-menu-tile {
  height: var(--root-menu-width);
  width: var(--root-menu-width);
  color: white;
  font-size: calc(var(--root-menu-width) - 1rem);
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