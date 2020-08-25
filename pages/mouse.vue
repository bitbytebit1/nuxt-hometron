<template>
  <v-card
    id="mouse"
    height="80vh"
    @click="click('left')"
    @contextmenu="click('right')"
  />
</template>

<script>
export default {
  mounted () {
    const box = document.getElementById('mouse')
    const useThrottle = true
    const offset = { x: 0, y: 0 }
    let throttle = 0
    let touchDown = false
    box.addEventListener('touchstart', (e) => {
      // e.preventDefault()
      // Set offset to initial touch position
      offset.x = e.targetTouches[0].pageX
      offset.y = e.targetTouches[0].pageY
      throttle = 0
      touchDown = true
    })
    box.addEventListener('touchend', (e) => {
      // e.preventDefault()
      touchDown = false
    })
    box.addEventListener('touchmove', (e) => {
      // e.preventDefault()
      throttle += 1
      if (useThrottle && throttle % 3 !== 0) {
        return
      }
      const x = e.targetTouches[0].pageX - offset.x
      const y = e.targetTouches[0].pageY - offset.y
      if (touchDown) {
        this.action(Math.round(x / 2), Math.round(y / 2))
      }
    })
  },
  methods: {
    async action (x, y) {
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'autoit/mouse'
      const API_QUERY = `?x=${x}&y=${y}`
      // console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
    },
    async click (button) {
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'autoit/click'
      const API_QUERY = `?button=${button}`
      // console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
    }
  }
}
</script>

<style>

</style>
