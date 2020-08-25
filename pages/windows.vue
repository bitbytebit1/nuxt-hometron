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
          </v-btn>          <v-btn
            class="ma-2"
            @click="action('WinActivate', [item.title])"
          >
            <v-icon>mdi-flip-to-front</v-icon>
            Activate
          </v-btn>
          <v-btn
            class="ma-2"
            @click="action('WinClose', [item.title])"
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
async function fetchWindows () {
  const API_URL = process.env.API_URL
  const API_ENDPOINT = 'autoit/winlist'
  console.log(`${API_URL}${API_ENDPOINT}`)
  const data = await fetch(`${API_URL}${API_ENDPOINT}`).then(res => res.json())
  return data
}
export default {
  async asyncData () {
    const data = await fetchWindows()
    return { items: data }
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    async refreshWindows () {
      const data = await fetchWindows()
      this.items = data
    },
    action (command, params) {
      // can't pass an object to axios because params[]= causes nodejs to not work for some stupid reason
      params = params.map(row => `&params=${row}`).join('')
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'autoit/exec'
      const API_QUERY = `?command=${command}${params}`
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.$axios.get(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.refreshWindows()
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>
