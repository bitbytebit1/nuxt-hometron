<template>
  <v-row>
    <v-col
      cols="12"
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to Hometron
        </v-card-title>
      </v-card>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <div class="text-center">
              <v-icon size="100">
                mdi-file
              </v-icon>
            </div>
            <v-card-title class="text-center1 justify-center">
              <v-btn
                color="primary"
                nuxt
                to="/browse"
              >
                Browse Files
              </v-btn>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <p>Browse files</p>
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                nuxt
                to="/browse"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
