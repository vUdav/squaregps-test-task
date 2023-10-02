import Vue from "vue";
import App from "./App.vue";
import store from "./store";

// Plugins
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "./plugins/leaflet";

// Router
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
