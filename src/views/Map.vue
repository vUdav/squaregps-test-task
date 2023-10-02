<template>
  <Loader v-if="isPending" />

  <v-row v-else no-gutters class="fill-height">
    <Loader v-if="isPendingSetAddress" />

    <v-col md="3" class="d-none d-md-block overflow-auto fill-height">
      <AddressList :list="addressList" />
      <v-bottom-sheet v-model="isShowAddressListSheet">
        <AddressList :list="addressList" />
      </v-bottom-sheet>
    </v-col>

    <v-col cols="12" md="9">
      <Map
        ref="map"
        :markers="addressList"
        :addMode="isAddMarker"
        @addMarker="onAddMarker"
        @ready="onReady"
      />

      <v-btn
        color="primary"
        small
        fixed
        left
        bottom
        fab
        class="d-md-none"
        @click="isShowAddressListSheet = true"
      >
        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn>

      <v-btn
        v-if="!isAddMarker"
        color="success"
        fixed
        right
        bottom
        fab
        @click="isAddMarker = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-else
        color="error"
        fixed
        right
        bottom
        fab
        @click="isAddMarker = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AddressList from "@/components/AddressList";
import Loader from "@/components/Loader";
import Map from "@/components/Map";

export default {
  name: "MapView",

  components: {
    AddressList,
    Loader,
    Map,
  },

  data() {
    return {
      isShowAddressListSheet: false,
      isAddMarker: false,
    };
  },

  watch: {
    "$route.query.id": {
      handler(id) {
        if (id) {
          this.goToMarker(parseInt(id));
        }
      },
    },
  },

  methods: {
    ...mapActions(["getAddresses", "setAddress"]),

    onAddMarker(coords) {
      this.isAddMarker = false;
      this.setAddress({ coords });
      this.$refs.map.fitBounds([coords.lat, coords.lng]);
    },

    goToMarker(id) {
      const marker = this.addressList.find((item) => item.id === id);

      if (marker) {
        this.$refs.map.fitBounds([marker.coords.lat, marker.coords.lng]);
      }
    },

    onReady() {
      if (this.$route.query.id) {
        this.goToMarker(parseInt(this.$route.query.id));
      }
    },
  },

  computed: {
    ...mapState({
      isPending: (state) => state.isPendingGetAddresses,
      isPendingSetAddress: (state) => state.isPendingSetAddress,
      addressList: (state) => state.addressList,
    }),
  },

  created() {
    this.getAddresses();
  },
};
</script>
