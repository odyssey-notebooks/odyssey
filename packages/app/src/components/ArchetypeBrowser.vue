<template>
  <div class="archetype-browser" :class="{ collapsed: isCollapsed }">
    <div class="header">
      <button
        @click="isCollapsed = !isCollapsed"
        :title="isCollapsed ? 'Expand' : 'Collapse'" 
        class="btn expand-collapse"
      >
        <span class="mdi mdi-triangle"/>
        <span class="category">Archetypes ({{ archetypes.length }})</span>
      </button>
      <button
        @click="createNewArchetype"
        title="Create new archetype" 
        class="btn new-archetype"
      >
        <span class="mdi mdi-shape-plus"/>
      </button>
    </div>
    <div class="archetypes" v-if="!isCollapsed && archetypes.length">
      <div
        :key="archetype._id"
        v-for="archetype in sortedArchetypes"
        class="note"
        :class="{ selected: archetype._id === selectedArchetypeId }"
        @click="$store.commit('selectRecord', archetype)"
      >
        <h3 :key="archetype._id+'-heading'" v-html="archetype.title || archetype.name || 'Untitled'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { generateRecord } from 'odyssey-core'

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed
    }
  },
  computed: {
    archetypes() {
      return this.$store.getters.archetypes
    },
    selectedArchetypeId() {
      return (this.$store.state.selectedRecord || {})._id
    },
    sortedArchetypes() {
      return this.archetypes.sort((a, b) => {
        if (a.__meta__.created === b.__meta__.created) return 0;
        
        return !(a.__meta__.created < b.__meta__.created)
          ? -1
          : 1
      })
    }
  },
  methods: {
    createNewArchetype() {
      this.$db
        // .create(generateArchetype(''))
        // .then(record => {
        //   this.$store.commit('selectRecord', record)
        // })
    }
  },
};
</script>

<style scoped>
.archetype-browser {
  --border-width: 1px;
  --header-height: 2rem;
  width: 100%;
  max-height: 100%;
  display: inline-block;
  overflow: hidden;
  background: rgba(0,0,0,0.1);
  flex: 0 1 auto;
}
.archetype-browser.collapsed {
  flex: 0 0 auto;
}
.header {
  border-top: 2px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: rgba(0,0,0,0.6);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 2rem;
}
.expand-collapse { 
  flex: 1 1 0%;
}
.expand-collapse .category {
  padding-left: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  padding-top: 2px;
}
.expand-collapse .mdi {
  font-size: 0.75rem;
  transform: rotate(180deg);
  transition: transform 200ms;
}
.archetype-browser.collapsed .header .expand-collapse .mdi {
  transform: rotate(90deg);
}
.header .btn {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  color: rgba(0,0,0,0.6);
  border: none;
  cursor: pointer;
  transition: color 200ms;
}
.header .btn:hover {
  color: rgba(0,0,0,0.8);
}
.header .new-archetype.btn {
  width: 2rem;
  font-size: 1.5rem;
}
.archetype-browser .archetypes {
  overflow-y: auto;
  text-overflow: ellipsis;
  max-height: calc(100% - var(--header-height) - var(--border-width));
}
.archetype-browser .archetypes {
  padding: 0 1rem;
}
.note {
  border: 1px solid #bbb;
  margin: 0.5rem 0;
  padding: 0.5rem;
  cursor: pointer;
}
.note:first-child {
  margin: 1rem 0 0.5rem 0;
}
.note:last-child {
  margin: 0 0 1rem 0;
}
.note h3 {
  margin: 0 0 0.25rem 0;
}
.note p {
  margin: 0;
}
</style>

