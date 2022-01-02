<template>
  <v-card class="text-center fill-height" height="82vh">
    <v-row class="fill-height" align="center" align-content="center" justify="center">
      <!-- Play controls -->
      <v-col cols="12">
        <v-btn
          x-large
          text
          icon
          @touchstart="sendMultipleInit(modeDictionary[modeCurrent]['skip-backward'])"
          @mousedown="sendMultipleInit(modeDictionary[modeCurrent]['skip-backward'])"
          @touchend="isTouchDown = false"
          @mouseup="isTouchDown = false"
        >
          <v-icon>mdi-skip-backward</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['skip-previous'])"
        >
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['pause'])"
        >
          <v-icon>mdi-pause</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['skip-next'])"
        >
          <v-icon>mdi-skip-next</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @touchstart="sendMultipleInit(modeDictionary[modeCurrent]['skip-forward'])"
          @mousedown="sendMultipleInit(modeDictionary[modeCurrent]['skip-forward'])"
          @touchend="isTouchDown = false"
          @mouseup="isTouchDown = false"
        >
          <v-icon>mdi-skip-forward</v-icon>
        </v-btn>
      </v-col>
      <!-- Volume -->
      <v-col cols="12">
        <v-btn
          x-large
          text
          icon
          @mousedown="sendMultipleInit(modeDictionary[modeCurrent]['volume-minus'])"
          @touchstart="sendMultipleInit(modeDictionary[modeCurrent]['volume-minus'])"
          @touchend="isTouchDown = false"
          @mouseup="isTouchDown = false"
        >
          <v-icon>mdi-volume-minus</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['volume-mute'])"
        >
          <v-icon>mdi-volume-mute</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @mousedown="sendMultipleInit(modeDictionary[modeCurrent]['volume-plus'])"
          @touchstart="sendMultipleInit(modeDictionary[modeCurrent]['volume-plus'])"
          @touchend="isTouchDown = false"
          @mouseup="isTouchDown = false"
        >
          <v-icon>mdi-volume-plus</v-icon>
        </v-btn>
      </v-col>
      <!-- Meta -->
      <v-col cols="12">
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['fullscreen'])"
        >
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="cast"
        >
          <v-icon>mdi-cast</v-icon>
        </v-btn>
        <v-btn
          x-large
          text
          icon
          @click="action(modeDictionary[modeCurrent]['subtitles'])"
        >
          <v-icon>mdi-subtitles</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn
          x-large
          text
          @click="skipIntro"
        >
          Skip intro
        </v-btn>
      </v-col>

      <v-spacer />
      <v-col
        class="mt-auto d-flex justify-space-between"
        style="position:absolute; bottom: 0;"
        cols="112"
        hide-details
      >
        <div class="">
          <v-text-field
            v-model="introLength"
            hide-details
            label="Intro length in seconds"
            type="number"
            step="10"
          />
        </div>
        <div class="">
          <v-select
            v-model="modeCurrent"
            :items="modes"
            label="Solo field"
            solo
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      isTouchDown: false,
      volume: 0,
      introLength: 60,
      interval: null,
      modeCurrent: 'VLC',
      modes: ['VLC', 'Netflix', 'Global'],
      modeDictionary: {
        VLC: {
          'skip-backward': '{LEFT}',
          'skip-previous': '{MEDIA_PREV}',
          pause: '{MEDIA_PLAY_PAUSE}',
          'skip-next': '{MEDIA_NEXT}',
          'skip-forward': '{RIGHT}',
          'volume-plus': '^{UP}',
          'volume-minus': '^{DOWN}',
          'volume-mute': 'm',
          subtitles: 'v',
          fullscreen: 'f'
        },
        Global: {
          'skip-backward': '{LEFT}',
          'skip-previous': '{MEDIA_PREV}',
          pause: '{MEDIA_PLAY_PAUSE}',
          'skip-next': '{MEDIA_NEXT}',
          'skip-forward': '{RIGHT}',
          'volume-plus': '{VOLUME_UP}',
          'volume-minus': '{VOLUME_DOWN}',
          'volume-mute': '{VOLUME_MUTE}',
          subtitles: 'v',
          fullscreen: 'f'
        },
        Netflix: {
          'skip-backward': '{LEFT}',
          'skip-previous': '{MEDIA_PREV}',
          pause: '{MEDIA_PLAY_PAUSE}',
          'skip-next': '{MEDIA_NEXT}',
          'skip-intro': '{MEDIA_NEXT}',
          'skip-forward': '{RIGHT}',
          'volume-plus': '{VOLUME_UP}',
          'volume-minus': '{VOLUME_DOWN}',
          'volume-mute': '{VOLUME_MUTE}',
          fullscreen: 'f'
        }
      }
    }
  },
  methods: {
    async cast () {
      const API_URL = window.location.origin
      const API_ENDPOINT = '/api/autoit/cast'
      await fetch(`${API_URL}${API_ENDPOINT}`).then(res => res.json())
    },
    skipIntro () {
      if (this.modeCurrent === 'Netflix') {
        this.action(this.modeDictionary[this.modeDictionary]['skip-intro'])
      }
      const j = this.introLength / 10
      for (let i = 0; i < j; i++) {
        this.action('{RIGHT}')
      }
    },
    clearMulitple () {
      clearInterval(this.interval)
    },
    sendMultipleInit (key) {
      this.isTouchDown = true
      this.sendMultiple(key)
    },
    sendMultiple (key) {
      this.action(key)
      this.interval = setTimeout(() => {
        if (this.isTouchDown) {
          this.sendMultiple(key)
        }
      }, 400)
    },
    async action (key) {
      const API_URL = window.location.origin
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
