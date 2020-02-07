import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function resolveRecord(record, archetype) {
  const resolvedRecord = {}
  return record
}

export default new Vuex.Store({
  state: {
    allRecords: [],
    selectedRecord: null,
    loggedIn: false,
    activeMenuTab: 'explorer'
  },
  getters: {
    archetypes(state) {
      return state.allRecords.filter(record => record.archetype)
    },
    archetypeOf: (_state, getters) => instance => resolveRecord(
      instance, 
      getters
      .archetypes
      .find(arch => arch._id === instance.__meta__.archetype)
    ),
    resolved: (_state, getters) => record => resolveRecord(record, getters.archetypeOf(record)),
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
    }
  }
})
