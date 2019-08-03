import Vue from "vue";
import App from "./App.vue";

import "./plugins/quill";
import "./plugins/kadabra";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
