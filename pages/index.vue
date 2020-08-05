<template>
  <v-row>
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
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
            color="primary"
            nuxt
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

export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-file',
          title: 'Browse',
          to: '/browse'
        },
        {
          icon: 'mdi-music',
          title: 'Media',
          to: '/media'
        },
        {
          icon: 'mdi-link',
          title: 'Open link',
          to: '/link'
        },
        {
          icon: 'mdi-mouse',
          title: 'Move mouse',
          to: '/mouse'
        }
      ]
    }
  }
}
</script>
