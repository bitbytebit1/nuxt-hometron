<template>
  <v-list-item
    nuxt
    :to="{name: 'browse', query: {dir: item.fullPath}}"
  >
    <v-list-item-content>
      <v-list-item-title v-text="item.name" />
      <v-list-item-subtitle>
        {{ formatBytes(item.spaceAvailable) }} of {{ formatBytes(item.spaceUsed) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} }
  },
  methods: {
    formatBytes (a, b) {
      if (a === 0) {
        return '0 Bytes'
      }
      const c = 1024
      const d = b || 2
      const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const f = Math.floor(Math.log(a) / Math.log(c))
      return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`
    }
  }
}
</script>

<style>

</style>
