<template>
  <v-list-item
    nuxt
    :to="{name: 'browse', query: {dir: item.fullPath}}"
    exact
  >
    <v-list-item-icon>
      <v-icon>
        mdi-folder
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
</style>
