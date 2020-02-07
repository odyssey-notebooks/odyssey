<template>
  <div class="flex-menu-tile" @click="$emit('click')">
    <span :class="`mdi mdi-${icon}`"/> {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.flex-menu-tile {
  width: 100%;
  padding: 0.25rem;
  font-size: 1.25rem;
  transition: background-color 200ms;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
}
.flex-menu-tile:hover {
  background-color: rgba(0,0,0,0.1);
}
.flex-menu-tile.active {
  background-color: rgba(0,0,0,0.3);
}
.mdi {
  margin: 0 0.25rem;
}
</style>