<template>
  <v-card-actions>
    <v-btn ref="playpause" icon @click.stop.prevent="">
      <v-icon>mdi-skip-previous</v-icon>
    </v-btn>
    <v-btn ref="next" icon @click.stop.prevent="">
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <v-btn ref="prev" icon @click.stop.prevent="">
      <v-icon>mdi-skip-next</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {

}
</script>
