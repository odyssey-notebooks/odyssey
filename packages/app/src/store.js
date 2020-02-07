import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    selectedRecord: null,
    loggedIn: false,
    activeMenuTab: 'explorer'
  },
  getters: {
    tags(state) {
      const values = state.records
        .filter(note => state.records.filter(otherNote => otherNote.title === note.title).length === 1)
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
      state.records = records
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
      if (context.state.records.length) return;
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
