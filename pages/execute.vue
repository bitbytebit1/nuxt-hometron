<template>
  <v-card class="text-center fill-height" height="82vh">
    <v-row class="flex-column1 fill-height mx-12" align="center" align-content="center" justify="center">
      <v-col cols="12" class="mx-12">
        <v-text-field v-model="item" label="Enter link" @keyup.enter="action">
          <!-- <template #append-outer>
            <v-btn color="success" @click="action">
              Open
            </v-btn>
          </template> -->
        </v-text-field>
      </v-col>
      <v-col cols="12" class="mx-12">
        <v-btn color="success" block @click="action">
          Open
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      item: ''
    }
  },
  methods: {
    async action () {
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'open'
      const API_QUERY = '?file=' + this.item
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
    }
  }
}
</script>

<style>

</style>
