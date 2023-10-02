import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import ru from "vuetify/src/locale/ru.ts";
import en from "vuetify/src/locale/en.ts";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { ru, en },
    current: "ru",
  },
});
