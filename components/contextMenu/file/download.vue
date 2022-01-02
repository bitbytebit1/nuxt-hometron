<template>
  <BaseListItem
    title="Download"
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
    action () {
      const isChrome = navigator.userAgent.toLowerCase().includes('chrome')
      const isSafari = navigator.userAgent.toLowerCase().includes('safari')
      const API_ENDPOINT = '/api/download'
      const API_QUERY = `?file=${this.item.fullPath}`
      console.log(`${window.location.origin}${API_ENDPOINT}${API_QUERY}`)
      const sUrl = `${window.location.origin}${API_ENDPOINT}${API_QUERY}`
      // const data = await fetch(`${window.location.origin}${ENDPOINT}${API_QUERY}`)
      // iOS devices do not support downloading. We have to inform user about this.
      if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device do not support files downloading. Please try again in desktop browser.')
        return false
      }

      // If in Chrome or Safari - download via virtual link click
      if (isChrome || isSafari) {
        // Creating new link node.
        const link = document.createElement('a')
        link.href = sUrl

        if (link.download !== undefined) {
          // Set HTML5 download attribute. This will prevent file from opening if supported.
          const fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length)
          link.download = fileName
        }

        // Dispatching click event.
        if (document.createEvent) {
          const e = document.createEvent('MouseEvents')
          e.initEvent('click', true, true)
          link.dispatchEvent(e)
          return true
        }
      }

      window.open(sUrl, '_self')
    }
  }
}
</script>

<style>

</style>
