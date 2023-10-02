export default {
  data() {
    return {
      langList: [
        { name: "English", value: "en" },
        { name: "Русский", value: "ru" },
      ],
    };
  },

  methods: {
    switchLang(lang) {
      localStorage.setItem("lang", lang);
      this.$vuetify.lang.current = lang;
      this.$i18n.locale = lang;
    },

    initLang() {
      const lang = localStorage.getItem("lang");
      if (lang) {
        this.switchLang(lang);
      }
    },
  },
};
