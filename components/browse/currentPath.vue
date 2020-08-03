<template>
  <div>
    <v-chip
      label
      class="ma-2"
      @click="$emit('changePath', {})"
    >
      Drives
    </v-chip>
    \
    <template v-if="path">
      <span v-for="(item, i) in pathSplitIntoFolders" :key="i">
        <v-chip
          class="ma-2"
          label
          @click="clickEmit(i)"
        >
          {{ item }}
        </v-chip>
        \
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  computed: {
    pathSplitIntoFolders () {
      return this.path.split('\\')
    }
  },
  methods: {
    pathByIndex (index) {
      return this.pathSplitIntoFolders.slice(0, index + 1).join('\\')
    },
    clickEmit (index) {
      this.$emit('changePath', { query: { dir: this.pathByIndex(index) } })
    }
  }
}
</script>

<style>

</style>
