<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        large
        right
        text
        v-on="on"
      >
        {{ items[model].text }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item-group
        v-model="model"
        mandatory
        @change="click"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data () {
    return {
      showMenu: false,
      model: 0,
      items: [
        {
          text: 'All',
          value: 0
        },
        {
          text: 'Audio',
          value: 100
        },
        {
          text: 'Video',
          value: 200
        },
        {
          text: 'Applications',
          value: 300
        },
        {
          text: 'Games',
          value: 400
        },
        {
          text: 'Other',
          value: '00'
        }
      ]
    }
  },
  methods: {
    click () {
      this.$emit('category', this.items[this.model].value)
    }
  }
}
</script>
