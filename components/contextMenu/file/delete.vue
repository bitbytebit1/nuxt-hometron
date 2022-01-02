<template>
  <BaseListItem
    title="Delete"
    @click.native="action"
  />
</template>

<script>
import BaseListItem from '@/components/base/baseListItem.vue'
export default {
  components: {
    BaseListItem
  },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  methods: {
    async action () {
      const API_ENDPOINT = '/api/delete'
      const API_QUERY = `?file=${this.item.fullPath}`
      await fetch(`${window.location.origin}${API_ENDPOINT}${API_QUERY}`)
      this.$emit('refreshDir')
    }
  }
}
</script>

<style>

</style>
