<template>
  <BaseListItem
    title="Copy file path"
    @click.native="action"
  />
</template>

<script>
import copyToClipboard from '@/utils/copyToClipboard.js'
import BaseListItem from '@/components/base/baseListItem.vue'
export default {
  components: {
    BaseListItem
  },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  methods: {
    action () {
      copyToClipboard(this.item.fullPath)
    }
  }
}
</script>

<style>

</style>
