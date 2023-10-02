<template>
  <l-map
    ref="map"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
    @click="onClickMap"
    @ready="onReady"
  >
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-marker
      v-for="marker in markers"
      :key="marker.id"
      :lat-lng="marker.coords"
    >
      <l-popup>
        <div>ID: {{ marker.id }}</div>
        <div>{{ marker.address }}</div>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
export default {
  name: "Map",

  props: {
    markers: {
      type: Array,
      default: () => [],
    },

    addMode: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
    };
  },

  methods: {
    onClickMap(e) {
      if (this.addMode) {
        this.$emit("addMarker", e.latlng);
      }
    },

    fitBounds(coords) {
      const map = this.$refs.map.mapObject;
      map.flyTo(coords, this.zoom);
    },

    onReady() {
      this.$emit("ready");
    },
  },
};
</script>
