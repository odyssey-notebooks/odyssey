import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    selectedRecord: null
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
    }
  }
})
