<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="searchQuery"
        prepend-icon="mdi-magnify"
        placeholder="Search"
        clearable
        @keyup.enter="search"
      />
    </v-card-text>
    <!-- {{ items }} -->
    <v-list>
      <v-data-iterator
        :headers="headers"
        :loading="loading"
        :items="items"
        :items-per-page="100"
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
        <template v-slot:item="{ item }">
          <v-list-item
            @click="click(item)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
              <v-list-item-subtitle>
                {{ item.uploaded }} • {{ item.author }}
                <v-img v-if="item.verified" class="d-inline-block" :src="require('@/static/vip.gif')" height="11" width="11" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text><span class="green--text">{{ item.seeders }}</span> / <span class="red--text">{{ item.leechers }}</span></v-list-item-action-text>

              <!-- <span class="green--text"> -->
              <!-- {{ item.seeders }} -->
              <!-- </span> -->
              <!-- <span class="red--text">{{ item.leechers }}</span> -->
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-data-iterator>
    </v-list>
  </v-card>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      searchQuery: '',
      // items: [{ verified:true, category: 'Video > Movies', name: 'Tenet 2020 BluRay REMUX HEVC DTS-HD MA TrueHD Atmos-FGT', uploaded: '2020-08-24', magnetLink: 'magnet:?xt=urn:btih:3BE42D4A258AB595D653A561E57922B1A00BB9D2&dn=Tenet%202020%20BluRay%20REMUX%20HEVC%20DTS-HD%20MA%20TrueHD%20Atmos-FGT&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '744.01 MiB', seeders: 208, leechers: 613, author: 'CupidKills' }, { category: 'Video > Movies', name: 'Tenet 2020 [720p] [WEBRip] [YTS MX]', uploaded: '2020-08-24', magnetLink: 'magnet:?xt=urn:btih:119E5882D2A5B26F8BA0BB36BCA4F78A23825978&dn=Tenet%20%202020%20%5B720p%5D%20%5BWEBRip%5D%20%5BYTS%20MX%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '744.01 MiB', seeders: 101, leechers: 117, author: 'CupidKills' }, { category: 'Video > Movies', name: 'Tenet.2020.[WEBRip] [1080p] [YTS.LT]', uploaded: '2020-08-24', magnetLink: 'magnet:?xt=urn:btih:6846AA32F9665E11352E7C808E3B50E187AB933F&dn=Tenet.2020.%5BWEBRip%5D%20%5B1080p%5D%20%5BYTS.LT%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '743.91 MiB', seeders: 72, leechers: 78, author: 'Anonymous' }, { category: 'Video > Movies', name: 'Tenet 2020 BluRay x264 HD-AMIABLE', uploaded: '2020-08-24', magnetLink: 'magnet:?xt=urn:btih:21E7C0257D9CE0FA76204C0F667EA8551C251AC2&dn=Tenet%202020%20BluRay%20x264%20HD-AMIABLE&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '745.23 MiB', seeders: 45, leechers: 34, author: 'CupidKills' }, { category: 'Video > Movies', name: 'Tenet [2020] 1080p HDrip H264 AAC Omikron', uploaded: '2020-08-24', magnetLink: 'magnet:?xt=urn:btih:6B2979594A9ACEE81DE40D6F718EE96FB2B64C4B&dn=Tenet%20%20%5B2020%5D%201080p%20HDrip%20H264%20AAC%20Omikron&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '702.69 MiB', seeders: 10, leechers: 26, author: 'CupidKills' }, { category: 'Audio > Music', name: '[djurassic] Tenet - Discography', uploaded: '2010-02-04', magnetLink: 'magnet:?xt=urn:btih:258A583CDC47EC34FBB85A973325E147D344DE83&dn=%5Bdjurassic%5D%20Tenet%20-%20Discography&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '90.2 MiB', seeders: 0, leechers: 5, author: 'djurassic' }, { category: 'Audio > Music', name: 'Tenet - Sovereign - 2009', uploaded: '2014-02-04', magnetLink: 'magnet:?xt=urn:btih:53BFF5126097DC87DFE7EE3433E3218A4F14C26A&dn=Tenet%20-%20Sovereign%20-%202009&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce', size: '78.95 MiB', seeders: 0, leechers: 24, author: 'CoenV' }],
      items: [],
      loading: false,
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
  methods: {
    async search () {
      this.items = []
      this.loading = true
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'tpb'
      const API_QUERY = `?q=${this.searchQuery}`
      // console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      this.items = await fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`).then(res => res.json())
      this.loading = false
    },
    click (item) {
      const API_URL = process.env.API_URL
      const API_ENDPOINT = 'open'
      const API_QUERY = `?file=${item.magnetLink}`
      // console.log(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
      fetch(`${API_URL}${API_ENDPOINT}${API_QUERY}`)
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
