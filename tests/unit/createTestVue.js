import Vuetify from "vuetify";
import { createLocalVue } from "@vue/test-utils";

import i18n from "@/plugins/i18n";
import router from "@/router";

const createTestVue = () => {
  const localVue = createLocalVue();

  return { localVue, i18n, vuetify: new Vuetify(), router };
};

export default createTestVue;
