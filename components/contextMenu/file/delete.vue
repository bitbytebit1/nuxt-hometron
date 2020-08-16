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
      const ENDPOINT = 'delete'
      const API_QUERY = `?file=${this.item.fullPath}`
      await fetch(`${process.env.API_URL}${ENDPOINT}${API_QUERY}`)
      this.$emit('refreshDir')
    }
  }
}
</script>

<style>

</style>
