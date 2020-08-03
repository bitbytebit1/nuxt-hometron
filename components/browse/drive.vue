<template>
  <v-list-item
    nuxt
    :to="{name: 'browse', query: {dir: item.fullPath}}"
  >
    <v-list-item-content>
      <v-list-item-title v-text="item.name" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} }
  }
}
</script>

<style>

</style>
