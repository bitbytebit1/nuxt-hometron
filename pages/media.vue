<template>
  <v-card class="text-center fill-height" height="82vh">
    <v-row class="flex-column1 fill-height" align="center" align-content="center" justify="center">
      <v-col cols="12">
        <v-btn
          x-large
          text
          icon
          @click="send('{LEFT}')"
        >
          <v-icon>mdi-skip-backward</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('{MEDIA_PREV}')"
        >
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('{MEDIA_PLAY_PAUSE}')"
        >
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('{MEDIA_NEXT}')"
        >
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('{RIGHT}')"
        >
          <v-icon>mdi-skip-forward</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-btn
          x-large
          text
          icon
          @mousedown="sendMultiple('{VOLUME_DOWN}')"
          @touchstart="sendMultiple('{VOLUME_DOWN}')"
          @touchend="clearMulitple"
          @mouseup="clearMulitple"
        >
          <v-icon>mdi-volume-minus</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('{VOLUME_MUTE}')"
        >
          <v-icon>mdi-volume-mute</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @mousedown="sendMultiple('{VOLUME_UP}')"
          @touchstart="sendMultiple('{VOLUME_UP}')"
          @touchend="clearMulitple"
          @mouseup="clearMulitple"
        >
          <v-icon>mdi-volume-plus</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="send('f')"
        >
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      volume: 0,
      interval: null
    }
  },
  methods: {
    clearMulitple () {
      clearInterval(this.interval)
    },
    sendMultiple (key) {
      this.send(key)
      this.interval = setInterval(() => {
        this.send(key)
      }, 500)
    },
    async send (key) {
      const API_URL = process.env.API_URL
      const API_QUERY = '?key=' + key
      const ENDPOINT = 'autoit/send'
      console.log(`${API_URL}${ENDPOINT}${API_QUERY}`)
      await fetch(`${API_URL}${ENDPOINT}${API_QUERY}`).then(res => res.json())
    }
  }
}
</script>

<style>

</style>
