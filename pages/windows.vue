<template>
  <div>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card>
          <v-card-title>
            {{ item.title }}
          </v-card-title>
          <v-btn
            class="ma-2"
            @click="action('WinSetState', [item.title, '','@SW_MINIMIZE'])"
          >
            <v-icon>mdi-window-minimize</v-icon>
            Minimize
          </v-btn>
          <v-btn
            class="ma-2"
            @click="action('WinSetState', [item.title, '','@SW_MAXIMIZE'])"
          >
            <v-icon>mdi-window-maximize</v-icon>
            Maximise
          </v-btn>          <v-btn
            class="ma-2"
            @click="action('WinActivate', [item.handle])"
          >
            <v-icon>mdi-flip-to-front</v-icon>
            Activate
          </v-btn>
          <v-btn
            class="ma-2"
            @click="action('WinKill', [item.title])"
          >
            <v-icon>mdi-window-close</v-icon>
            Close
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ query }) {
    const API_URL = process.env.API_URL
    const API_ENDPOINT = 'autoit/winlist'
    console.log(`${API_URL}${API_ENDPOINT}`)
    const data = await fetch(`${API_URL}${API_ENDPOINT}`).then(res => res.json())
    return { items: data }
  },
  methods: {
    action (command, params) {
      // can't pass an object to axios because params[]= causes nodejs to not work for some stupid reason
      params = params.map(row => `&params=${row}`).join('')
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'autoit/exec'
      const API_QUERY = `?command=${command}${params}`
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.$axios.get(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
    }
  }
}
</script>

<style>

</style>
