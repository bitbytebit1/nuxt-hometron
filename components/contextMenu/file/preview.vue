<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1000"
    >
      <template v-slot:activator="{ on, attrs }">
        <BaseListItem
          title="preview"
          v-bind="attrs"
          @click.native="dialog = true"
        />
      </template>

      <v-card>
        <iframe src="http://localhost:3000/api/download?file=c:\\users\\tribe\\desktop\\a-football-pitch-vector-27142681.jpg" />
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
  data () {
    return {
      dialog: false
    }
  }
}
</script>
