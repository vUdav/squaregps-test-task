<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true" class="d-md-none" />
      <v-toolbar-title class="d-md-none">{{ title }}</v-toolbar-title>

      <v-btn
        v-for="(item, i) in menu"
        :key="i"
        plain
        exact
        :to="{ name: item.route }"
        class="d-none d-md-inline-flex"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ $t(item.title) }}
      </v-btn>

      <v-spacer />

      <SwitchLang @change="changeLang" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary class="d-md-none">
      <v-list nav dense>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          exact-path
          :to="{ name: item.route }"
          active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SwitchLang from "@/components/SwitchLang";
import switchLang from "@/mixins/switchLang";

export default {
  mixins: [switchLang],

  name: "App",

  components: {
    SwitchLang,
  },

  data: () => ({
    drawer: false,

    title: null,

    menu: [
      {
        title: "menu.task",
        icon: "mdi-checkbox-multiple-marked",
        route: "task",
      },
      {
        title: "menu.map",
        icon: "mdi-map",
        route: "map",
      },
    ],
  }),

  watch: {
    $route: {
      handler(route) {
        this.changeTitle(route);
      },
      immediate: true,
    },
  },

  methods: {
    changeTitle(route) {
      const title = this.$t(`menu.${route.name}`);
      this.title = title;
      document.title = `SquareGPS - ${title}`;
    },

    changeLang() {
      this.changeTitle(this.$route);
    },
  },

  created() {
    this.initLang();
  },
};
</script>
