<template>
  <div class="record-browser" :class="{ collapsed }">
    <div class="header">
      <button
        @click="collapsed = !collapsed"
        :title="collapsed ? 'Expand' : 'Collapse'" 
        class="btn expand-collapse"
      >
        <span class="mdi mdi-triangle"/>
        <span class="category">{{ category.plural }}</span>
      </button>
      <button
        @click="newRecord"
        title="Create new record" 
        class="btn new-record"
      >
        <span class="mdi mdi-plus"/>
      </button>
    </div>
    <div class="records" v-if="!collapsed">
      <div
        :key="record._id"
        v-for="record in sortedRecords"
        class="note"
        :class="{ selected: record._id === selectedRecordId }"
        @click="$store.commit('selectRecord', record)"
      >
        <h3 :key="record._id+'-heading'" v-if="record.title" v-html="record.title"/>
        <h3 :key="record._id+'-heading'" v-else v-text="'Untitled'"/>
        <p :key="record._id+'-description'" v-text="record.content.substring(0, 50)+'...'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({
        singular: 'Record',
        plural: 'All Records'
      })
    }
  },
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    records() {
      const records = this.$store.state.records
      return this.category.filter
        ? records.filter(this.category.filter)
        : records
    },
    selectedRecordId() {
      return (this.$store.state.selectedRecord || {})._id
    },
    sortedRecords() {
      return this.records.sort((a, b) => {
        if (a.created === b.created) return 0;
        
        return !(a.created < b.created)
          ? -1
          : 1
      })
    }
  },
  methods: {
    newRecord() {
      this.$db('notes')
        .create({
          title: '', 
          content: '',
          created: (new Date).toISOString()
        })
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
  width: 25vw;
  max-height: 100%;
  display: inline-block;
  overflow: hidden;
  background: rgba(0,0,0,0.1);
}
.record-browser .records {
  overflow-y: auto;
  text-overflow: ellipsis;
  max-height: calc(100% - var(--header-height) - var(--border-width));
}
.record-browser .records {
  padding: 1rem;
}
.header {
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
  justify-content: start;
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
.note {
  border: 1px solid #bbb;
  margin: 0.5rem 0;
  padding: 0.5rem;
  cursor: pointer;
}
.note:first-child {
  margin: 0 0 0.5rem 0;
}
.note h3 {
  margin: 0 0 0.25rem 0;
}
.note p {
  margin: 0;
}
</style>

