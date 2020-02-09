<template>
  <div class="record-browser" :class="{ collapsed: isCollapsed }">
    <div class="header">
      <button
        @click="isCollapsed = !isCollapsed"
        :title="isCollapsed ? 'Expand' : 'Collapse'" 
        class="btn expand-collapse"
      >
        <span class="mdi mdi-triangle"/>
        <span class="category">{{ this.archetype.namePlural }} ({{ records.length }})</span>
      </button>
      <button
        @click="createNewRecord"
        title="Create new record" 
        class="btn new-record"
      >
        <span class="mdi mdi-plus"/>
      </button>
    </div>
    <div class="records" v-if="!isCollapsed && records.length">
      <div
        :key="record._id"
        v-for="record in sortedRecords"
        class="note"
        :class="{ selected: record._id === selectedRecordId }"
        @click="$store.commit('selectRecord', record)"
      >
        <h3 :key="record._id+'-heading'" v-html="record.title || record.name || 'Untitled'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { generateRecord } from 'odyssey-core'

export default {
  props: {
    archetype: {
      type: Object,
      required: true
    },
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
    records() {
      return this.$store.getters.instances.filter(record => record.__meta__.archetype === this.archetype._id)
    },
    selectedRecordId() {
      return (this.$store.state.selectedRecord || {})._id
    },
    sortedRecords() {
      return this.records.sort((a, b) => {
        if (a.__meta__.created === b.__meta__.created) return 0;
        
        return !(a.__meta__.created < b.__meta__.created)
          ? -1
          : 1
      })
    }
  },
  methods: {
    createNewRecord() {
      this.$db
        .create(generateRecord(this.archetype))
        .then(record => {
          this.$store.commit('selectRecord', record)
        })
    }
  },
};
</script>

<style scoped>
.record-browser {
  --border-width: 1px;
  --header-height: 2rem;
  width: 100%;
  max-height: 100%;
  display: inline-block;
  overflow: hidden;
  background: rgba(0,0,0,0.1);
  flex: 0 1 auto;
}
.record-browser.collapsed {
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
.record-browser.collapsed .header .expand-collapse .mdi {
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
.header .new-record.btn {
  width: 2rem;
  font-size: 1.5rem;
}
.record-browser .records {
  overflow-y: auto;
  text-overflow: ellipsis;
  max-height: calc(100% - var(--header-height) - var(--border-width));
}
.record-browser .records {
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

