<template>
  <v-list nav flat>
    <v-subheader class="text-h5">{{ $t("map.markers") }}</v-subheader>
    <template v-if="list.length">
      <v-list-item
        v-for="address in list"
        :key="address.id"
        exact
        :to="{ name: 'map', query: { id: address.id } }"
        active-class="primary--text"
        two-line
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ $t("map.marker") }} #{{ address.id }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ address.address }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-alert type="info" v-else>{{ $t("map.addressesListEmpty") }}</v-alert>
  </v-list>
</template>

<script>
export default {
  name: "AddressList",

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
