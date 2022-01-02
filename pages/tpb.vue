<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="searchQuery"
        prepend-icon="mdi-magnify"
        placeholder="Search"
        clearable
        @keyup.enter="search(1)"
      >
        <template #append-outer>
          <chooseCategory style="top:-8px" @category="category = $event, search(0)" />
          <sortBy style="top:-8px" @sortBy="sortBy = $event, search(currentPage)" />
        </template>
      </v-text-field>
    </v-card-text>
    <!-- {{ searchMeta }} -->
    <v-data-iterator
      :headers="headers"
      :loading="loading"
      :items="searchResults"
      item-key="id"
      single-expand
      hide-default-footer
      sort-by="seeders"
      sort-desc
    >
      <template #loading>
        <div class="mx-5">
          <v-progress-linear indeterminate />
        </div>
        <div class="ma-5">
          Loading
        </div>
      </template>
      <template #no-data>
        <div class="mx-4">
          No data available
        </div>
      </template>
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-list>
          <div
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item
              @click="addTorrent(item)"
            >
              <!-- {{ item }} -->
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
                <v-list-item-subtitle>
                  {{ item.size }} • {{ item.uploaded }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.categoryFull }} • {{ item.author }}
                  <v-img v-if="item.verified" class="d-inline-block" :src="require('@/static/vip.gif')" height="11" width="11" />
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text><span class="green--text">{{ item.seeders }}</span> / <span class="red--text">{{ item.leechers }}</span></v-list-item-action-text>
                <v-btn icon @click.stop="expand(item, !isExpanded(item))">
                  <v-icon>{{ isExpanded(item) ? 'mdi-chevron-up': 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <div v-if="isExpanded(item)">
              <description :id="item.id" :key="item.id" />
            </div>
          </div>
        </v-list>
      </template>
      <template v-slot:footer>
        <v-row
          class="mt-2 mx-5"
          align="center"
          justify="center"
        >
          <!-- <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->

          <div class="flex-grow-1" />

          <span
            v-if="totalPages"
            class="mr-4
            grey--text"
          >
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <v-btn
            v-if="currentPage > 1"
            dark
            color="blue darken-3"
            class="mr-1"
            @click="search(currentPage - 1)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            v-if="currentPage + 1 <= totalPages"
            dark
            color="blue darken-3"
            class="ml-1"
            @click="search(currentPage + 1)"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import sortBy from '@/components/tpb/sortBy'
import chooseCategory from '@/components/tpb/chooseCategory'
import description from '@/components/tpb/torrentDescription'
export default {
  components: {
    sortBy,
    chooseCategory,
    description
  },
  data () {
    return {
      sortBy: 7,
      category: 0,
      searchQuery: '',
      searchResults: [],
      searchMeta: [],
      totalPages: 0,
      currentPage: 1,
      loading: false,
      itemsPerPageArray: [10, 50, 100],
      itemsPerPage: 100,
      sortDesc: false,
      headers: [
        {
          text: 'Category',
          value: 'category'
        },
        {
          text: 'Author',
          value: 'author'
        },
        // {
        //   text: 'Magnet Link',
        //   value: 'magnetLink'
        // },
        {
          text: 'VIP',
          value: 'verified'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Uploaded',
          value: 'uploaded'
        },
        {
          text: 'Size',
          value: 'size'
        },
        {
          text: 'Leechers',
          value: 'leechers'
        },
        {
          text: 'Seeders',
          value: 'seeders'
        }

      ]
    }
  },
  mounted () {
    this.search(1)
  },
  methods: {
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    async search (page) {
      this.searchResults = []
      this.loading = true
      const API_URL = window.location.origin
      const API_ENDPOINT = '/api/tpb/search'
      const API_QUERY = `?query=${this.searchQuery}&page=${page}&sortBy=${this.sortBy}&category=${this.category}`
      console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      const resp = await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
      this.searchResults = resp.items
      this.searchMeta = resp.meta
      this.currentPage = +resp.meta.currentPage
      this.totalPages = +resp.meta.totalPages
      this.loading = false
    },
    addTorrent (item) {
      const API_URL = window.location.origin
      const API_ENDPOINT = '/api/qbittorrent/add'
      const { magnetlink, name } = item
      console.log({ magnetlink, name })
      this.$axios.post(`${API_URL}${API_ENDPOINT}`, { magnetlink, name })
    }
  }
}
</script>

<style scoped>
.v-list-item__title {
    flex: 1 1 100%;
    overflow: visible;
    text-overflow: initial;
    white-space: normal;
}
</style>
