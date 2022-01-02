<template>
  <client-only>
    <simpleKeyboard @onKeyPress="action" />
  </client-only>
</template>

<script>
import simpleKeyboard from '@/components/simple-keyboard.vue'
export default {
  components: {
    simpleKeyboard
  },
  methods: {
    async action (key) {
      const API_URL = process.client ? window.location.origin + '/api/' : process.env.API_URL
      const API_ENDPOINT = '/api/autoit/send'
      const API_QUERY = '?key=' + key
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
    }
  }
}
</script>

<style>

</style>
