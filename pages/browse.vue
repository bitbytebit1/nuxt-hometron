<template>
  <v-card>
    <!-- Chips -->
    <currentPath
      :path="$route.query.dir"
      @changePath="changePath($event)"
    />
    <!-- Drives -->
    <template v-if="isDriveView">
      <template
        v-for="(item, i) in items"
      >
        <drive
          :key="i"
          :item="item"
        />
      </template>
      <v-list-item
        nuxt
        :to="{name: 'tpb'}"
      >
        <v-list-item-content>
          <v-list-item-title>TPB:</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template
      v-else
    >
      <template v-for="(item, i) in items">
        <directory
          v-if="item.isDirectory"
          :key="i"
          :item="item"
          @refreshDir="refreshDir"
        />
        <file
          v-if="item.isFile"
          :key="i"
          :item="item"
          @refreshDir="refreshDir"
        />
      </template>
    </template>
  </v-card>
</template>

<script>

import currentPath from '@/components/browse/currentPath.vue'
import drive from '@/components/browse/drive.vue'
import file from '@/components/browse/file.vue'
import directory from '@/components/browse/directory.vue'

async function fetchDir (API_QUERY) {
  const API_URL = process.client ? window.location.origin + '/api/' : process.env.API_URL
  const ENDPOINT = API_QUERY ? 'browse' : 'drives'
  const data = await fetch(`${API_URL}${ENDPOINT}${API_QUERY}`).then(res => res.json())
  return { items: data }
}

export default {
  components: {
    currentPath,
    directory,
    drive,
    file
  },
  watchQuery: ['dir'],
  asyncData ({ query }) {
    const API_QUERY = 'dir' in query ? `?dir=${query.dir.replace(/\\?$/, '\\')}` : ''
    return fetchDir(API_QUERY)
  },
  data () {
    return {
      items: [],
      query: ''
    }
  },
  computed: {
    isDriveView () {
      return !this.$route.query.dir
    }
  },
  methods: {
    async refreshDir () {
      const API_QUERY = 'dir' in this.$route.query ? `?dir=${this.$route.query.dir.replace(/\\?$/, '\\')}` : ''
      this.items = await fetchDir(API_QUERY).then(({ items }) => items)
    },
    changePath (event) {
      this.$router.push({ name: 'browse', ...event })
    }
  }
}
</script>
