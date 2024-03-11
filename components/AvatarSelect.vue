<template>
  <v-select :items="avatars" label="Avatar" outlined @input="handleInput">
    <template #item="{ attrs, on, item }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title class="mb-2">
            <v-img :src="item.avatar" height="35" width="35" class="float-left mr-2" />
            <span class="text-h5">{{ item.name }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #selection="{ attrs, item }">
      <div v-bind="attrs" style="vertical-align: middle;">
        <v-img :src="item.avatar" height="30" width="30" class="float-left mr-2" />
        <span class="text-h5">{{ item.name }}</span>
      </div>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'AvatarSelect',
  data () {
    return {
      avatars: [
        { name: 'Bear', avatar: '/img/avatars/bear.png' },
        { name: 'Orange Bear', avatar: '/img/avatars/bear2.png' },
        { name: 'Cat', avatar: '/img/avatars/cat.png' },
        { name: 'Chicken', avatar: '/img/avatars/chicken.png' },
        { name: 'Cow', avatar: '/img/avatars/cow.png' },
        { name: 'Dog', avatar: '/img/avatars/dog.png' },
        { name: 'Giraffe', avatar: '/img/avatars/giraffe.png' },
        { name: 'Koala', avatar: '/img/avatars/koala.png' },
        { name: 'Lion', avatar: '/img/avatars/lion.png' },
        { name: 'Meerkat', avatar: '/img/avatars/meerkat.png' },
        { name: 'Panda', avatar: '/img/avatars/panda.png' },
        { name: 'Puffer fish', avatar: '/img/avatars/puffer-fish.png' },
        { name: 'Bunny', avatar: '/img/avatars/rabbit.png' },
        { name: 'Sea lion', avatar: '/img/avatars/sea-lion.png' },
        { name: 'Sloth', avatar: '/img/avatars/sloth.png' },
        { name: 'Snake', avatar: '/img/avatars/snake.png' },
        { name: 'Weasel', avatar: '/img/avatars/weasel.png' },
        { name: 'Fox', avatar: '/img/avatars/fox.png' },
        { name: 'Woman', avatar: '/img/avatars/woman.png' },
        { name: 'Gamer', avatar: '/img/avatars/gamer.png' },
        { name: 'Girl', avatar: '/img/avatars/girl2.png' },
        { name: 'Candy', avatar: '/img/avatars/candy.png' },
        { name: 'Singer', avatar: '/img/avatars/singer.png' },
        { name: 'Singer', avatar: '/img/avatars/singer-f.png' },
        { name: 'Elk', avatar: '/img/avatars/elk.png' },
        { name: 'Bunny costume', avatar: '/img/avatars/bunny-costume.png' },
        { name: 'Pegasus', avatar: '/img/avatars/pegasus.png' }
      ]
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value.avatar)
    }
  }
}
</script>
