<template>
  <v-menu
    offset-y
    @click.stop.prevent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        icon
        v-on="on"
        @click.prevent
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <download :item="item" />
      <copyFilePath :item="item" />
      <open :item="item" />
      <!-- <preview :item="item" /> -->
    </v-list>
  </v-menu>
</template>

<script>
import download from './download.vue'
import copyFilePath from './copyFilePath.vue'
import open from './open.vue'
// import preview from './preview.vue'
export default {
  components: {
    download,
    open,
    copyFilePath
    // preview,
  },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      items: [{ title: 'wasd' }]
    }
  }
}
</script>

<style>

</style>
