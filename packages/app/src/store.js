import Vue from 'vue'
import Vuex from 'vuex'
import { resolveRecord } from 'odyssey-core'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allRecords: [],
    selectedRecord: null,
    loggedIn: false,
    activeMenuTab: 'explorer'
  },
  getters: {
    liveRecord(state) {
      const liveRecord = state.selectedRecord
        ? state.allRecords.find(record => record._id === state.selectedRecord._id)
        : {}
      return liveRecord
    },
    archetypes(state) {
      return state.allRecords.filter(record => record.archetype)
    },
    archetypeOf: (_state, getters) => instance => instance 
      && getters.archetypes.find(arch => arch._id === instance.__meta__.archetype)
    ,
    selectedRecordArchetype: (_state, getters) => getters.archetypeOf(getters.liveRecord),
    resolved: (_state, getters) => record => record && resolveRecord(record, getters.archetypeOf(record)),
    selectedRecordResolved: (_state, getters) => getters.resolved(getters.liveRecord),
    instances(state) {
      return state.allRecords.filter(record => !record.archetype)
    },
    tags(state) {
      const values = state.allRecords
        .filter(note => state.allRecords.filter(otherNote => otherNote.title === note.title).length === 1)
      return {
        trigger: '#',
        values,
        selectTemplate(item) {
          return `<mention id="${item.original._id}" title="${item.original.title}"/>`
        },
        menuItemTemplate(item) {
          return '#' + item.original.title;
        },
        lookup(item) {
          return item.title
        },
        allowSpaces: true
      }
    }
  },
  mutations: {
    setRecords(state, records) {
      state.allRecords = records
    },
    resetSelectedRecord(state) {
      state.selectedRecord = null
    },
    selectRecord(state, record) {
      state.selectedRecord = record
    },
    login(state) {
      state.loggedIn = true
    },
    setActiveMenuTab(state, tabName) {
      state.activeMenuTab = tabName
    }
  },
  actions: {
    init(context) {
      if (context.state.allRecords.length) return;
      this.$db = this._vm.$db
      this.$db
      .authenticate({ email: '1', password: '1' })
      .then(() => {
        context.commit('login');
      })
      .then(() => {
        this.$db
          .watch()
          .find({
            query: {
              $limit: '-1'
            }
          })
          .subscribe(records => {
            context.commit('setRecords', records)
          })
      })
    },
    updateRecord(id, newRecord) {
      newRecord.__meta__.updated = (new Date).toISOString()
      this.$db.update(id, newRecord)
    },
    patchRecord(id, patch) {
      const updatedPatch = {
        __meta__: {
          updated: (new Date).toISOString()
        },
        ...patch
      }
      this.$db.patch(id, updatedPatch)
    }
  }
})
