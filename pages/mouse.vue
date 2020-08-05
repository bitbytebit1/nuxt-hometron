<template>
  <v-card
    v-dragged="onDragged"
    class="fill-height"
    height="90vh"
  />
</template>

<script>
export default {
  data () {
    return {
      isDragging: false
    }
  },
  methods: {
    onDragged ({ el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last }) {
      console.log(el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last)
      if (first) {
        this.isDragging = true
        return
      }
      if (last) {
        this.isDragging = false
        return
      }
      const l = +window.getComputedStyle(el).left.slice(0, -2) || 0
      const t = +window.getComputedStyle(el).top.slice(0, -2) || 0
      el.style.left = l + deltaX + 'px'
      el.style.top = t + deltaY + 'px'
      console.log(offsetX, offsetY)
      console.log(el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last)
    },
    action (event) {
      console.log(event)
    }
  }
}
</script>

<style>

</style>
