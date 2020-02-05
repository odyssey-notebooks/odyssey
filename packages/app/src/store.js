import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    selectedRecord: null
  },
  mutations: {
    setRecords(state, records) {
      state.records = records
    },
    selectRecord(state, record) {
      state.selectedRecord = record
    }
  }
})
