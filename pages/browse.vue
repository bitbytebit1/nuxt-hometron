<template>
  <v-card>
    <currentPath
      :path="$route.query.dir"
      class="mb-2"
      @changePath="changePath($event)"
    />
    <template v-if="isDriveView">
      <template
        v-for="(item, i) in items"
      >
        <drive
          :key="i"
          :item="item"
        />
      </template>
    </template>
    <template
      v-else
    >
      <template v-for="(item, i) in items">
        <directory
          v-if="item.isDirectory"
          :key="i"
          :item="item"
        />
        <file
          v-else
          :key="i"
          :item="item"
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
export default {
  components: {
    currentPath,
    directory,
    drive,
    file
  },
  watchQuery: ['dir'],
  async asyncData ({ query }) {
    const API_URL = process.env.API_URL
    const API_QUERY = 'dir' in query ? `?dir=${query.dir.replace(/\\?$/, '\\')}` : ''
    const ENDPOINT = API_QUERY ? 'browse' : 'drives'
    console.log(`${API_URL}${ENDPOINT}${API_QUERY}`)
    const data = await fetch(`${API_URL}${ENDPOINT}${API_QUERY}`).then(res => res.json())
    return { items: data }
  },
  computed: {
    isDriveView () {
      return !this.$route.query.dir
    }
  },
  methods: {
    changePath (event) {
      this.$router.push({
        name: 'browse',
        ...event
      })
    }
  }
}
</script>

<style>

</style>
