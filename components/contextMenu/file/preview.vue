<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="1000"
    >
      <template v-slot:activator>
        <BaseListItem
          title="Preview"
          @click.native="dialog = true"
        />
      </template>

      <v-card>
        <iframe :src="`http://localhost:3000/api/preview?file=${item.fullPath}`" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BaseListItem from '@/components/base/baseListItem.vue'
export default {
  components: {
    BaseListItem
  },
  props: {
    item: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
