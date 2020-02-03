import Vue from "vue";
import App from "./App.vue";

import "tributejs/dist/tribute.css";

import "./plugins/kadabra";
import store from './store'

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
