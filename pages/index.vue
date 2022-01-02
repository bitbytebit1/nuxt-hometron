<template>
  <v-row>
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="6"
      md="6"
    >
      <v-card>
        <div class="text-center">
          <v-icon size="100">
            {{ item.icon }}
          </v-icon>
        </div>
        <v-card-title class="justify-center">
          <v-btn
            nuxt
            outlined
            :to="item.to"
          >
            {{ item.title }}
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { routes } from '@/constants/routes.js'
export default {
  data () {
    return {
      items: routes
    }
  }
}
</script>
<style>

</style>
