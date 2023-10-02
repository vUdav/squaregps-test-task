<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="lang in langList"
        :key="lang.value"
        link
        @click="changeLang(lang.value)"
      >
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import switchLang from "@/mixins/switchLang";

export default {
  mixins: [switchLang],

  name: "SwitchLang",

  data: () => ({
    langList: [
      {
        name: "English",
        value: "en",
      },
      {
        name: "Русский",
        value: "ru",
      },
    ],
  }),

  methods: {
    changeLang(lang) {
      this.switchLang(lang);

      this.$emit("change", lang);
    },
  },
};
</script>

<style></style>
