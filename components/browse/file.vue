<template>
  <v-list-item
    @click="action"
  >
    <v-list-item-icon>
      <v-icon>
        mdi-file
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="item.fullName" />
    </v-list-item-content>
    <v-list-item-action>
      <contextMenu
        :item="item"
        v-on="$listeners"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import contextMenu from '@/components/contextMenu/file/contextMenu.vue'
export default {
  components: {
    contextMenu
  },
  props: {
    item: { type: Object, default: () => {} }
  },
  methods: {
    async action () {
      const ENDPOINT = 'open'
      const API_QUERY = `?file=${this.item.fullPath}`
      await fetch(`${process.env.API_URL}${ENDPOINT}${API_QUERY}`)
    }
  }
}
</script>

<style scoped>
.v-list-item__title{
  overflow: visible;
  text-overflow: initial;
  white-space: normal;
  word-break: break-all;
}
/* .file .v-list-item__title{
  overflow: visible;
  text-overflow: initial;
  white-space: normal;
} */
</style>
