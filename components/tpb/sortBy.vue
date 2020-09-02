<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        large
        right
        icon
        v-on="on"
      >
        <v-icon>mdi-sort-alphabetical-ascending</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :class="item.active? 'primary white--text' : ''"
        class="pointer"
        hover
        @click="item.cb"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.n }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ item.active ? item.ascending ? 'mdi-arrow-up' : 'mdi-arrow-down' : '' }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data () {
    return {
      showMenu: false,
      model: [],
      items: [
        {
          n: 'Name',
          active: false,
          ascending: false,
          value: 1,
          cb: () => {
            this.toggleItems(0)
            this.emitSort(0)
          }
        },
        {
          n: 'Date',
          active: false,
          ascending: false,
          value: 3,
          cb: () => {
            this.toggleItems(1)
            this.emitSort(1)
          }
        },
        {
          n: 'Size',
          active: false,
          ascending: false,
          value: 5,
          cb: () => {
            this.toggleItems(2)
            this.emitSort(2)
          }
        },
        {
          n: 'Seeds',
          active: true,
          ascending: false,
          value: 7,
          cb: () => {
            this.toggleItems(3)
            this.emitSort(3)
          }
        },
        {
          n: 'Leechers',
          active: false,
          ascending: false,
          value: 9,
          cb: () => {
            this.toggleItems(4)
            this.emitSort(4)
          }
        }
      ]
    }
  },
  methods: {
    emitSort (index) {
      setTimeout(() => {
        const val = this.items[index].ascending ? this.items[index].value : this.items[index].value + 1
        this.$emit('sortBy', val)
      }, 0)
    },
    toggleItems (index) {
      this.items[index].ascending = !this.items[index].ascending
      this.items[index].active = true
      for (let i = 0; i < this.items.length; i++) {
        if (i !== index) {
          this.items[i].ascending = false
          this.items[i].active = false
        }
      }
    }
  }
}
</script>
