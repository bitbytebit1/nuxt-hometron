<template>
  <div>
    <!-- <v-row> -->
    <transition-group name="flip-list" tag="v-row">
      <v-col v-for="(item) in items" :key="item.title" cols="12">
        <v-card>
          <v-card-title>
            {{ item.title }}
          </v-card-title>
          <v-btn
            class="ma-2"
            @click="action('WinSetState', [item.title, '', 6])"
          >
            <v-icon>mdi-window-minimize</v-icon>
            Minimize
          </v-btn>
          <v-btn
            class="ma-2"
            @click="action('WinSetState', [item.title, '', 3])"
          >
            <v-icon>mdi-window-maximize</v-icon>
            Maximise
          </v-btn>
          <v-btn
            class="ma-2"
            @click="action('WinActivate', [item.title])"
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
    <!-- </v-row> -->
    </transition-group>
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.windowListGet()
  },
  methods: {
    async windowListGet () {
      const API_URL = process.client ? window.location.origin + '/api/' : process.env.API_URL
      const API_ENDPOINT = 'autoit/winlist'
      this.items = await this.$axios.get(`${API_URL}${API_ENDPOINT}`).then(item => item.data)
    },
    action (command, params) {
      // can't pass an object to axios because params[]= causes nodejs to not work for some stupid reason
      params = params.map(row => `&params=${row}`).join('')
      const API_URL = window.location.origin
      const API_ENDPOINT = '/api/autoit/exec'
      const API_QUERY = `?command=${command}${params}`
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.$axios.get(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.windowListGet()
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>
