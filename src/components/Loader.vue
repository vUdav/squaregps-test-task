<template>
  <v-overlay absolute z-index="10000">
    <v-progress-circular :size="70" indeterminate class="primary--text" />
  </v-overlay>
</template>

<script>
export default {
  name: "Loader",
};
</script>
