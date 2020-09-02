<template>
  <transition name="slide-fade">
    <v-card v-if="loaded" class="ma-5 pa-2 grey darken-3">
      <!-- eslint-disable-next-line -->
    <div style="white-space: pre-wrap;">{{ description }}</div>
    </v-card>
  </transition>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      description: '',
      loaded: false
    }
  },
  mounted () {
    this.getDescription()
  },
  methods: {
    async getDescription () {
      // this.loaded = false
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'tpb/id'
      const API_QUERY = `?id=${this.id}`
      const resp = await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
      this.description = resp.description
      this.loaded = true
    }
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
