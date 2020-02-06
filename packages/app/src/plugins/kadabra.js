import Vue from "vue";
import VueFeathers from "@vue-feathers/vue-feathers";
import kadabraClient, { feathersClient as feathers } from "@kadabra/client";

const feathersClient = feathers(); // connecting to local server

Vue.prototype.$db = kadabraClient({ feathers: feathersClient })('notes');
Vue.use(VueFeathers, { feathersClient });
