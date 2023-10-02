import Vue from "vue";
import VueI18n from "vue-i18n";
const ru = require("../lang/ru.json");
const en = require("../lang/en.json");

Vue.use(VueI18n);

const messages = {
  en,
  ru,
};

const i18n = new VueI18n({
  locale: "ru",
  messages,
});

export default i18n;
