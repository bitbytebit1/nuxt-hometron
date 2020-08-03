<template>
  <!-- es-lint-disable/next-line -->
  <v-list-item
    link
  >
    <v-list-item-title>{{ title }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
