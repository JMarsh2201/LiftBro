<template lang="html">
  <div class="list-exercises">
    <h1 class="musclegroup" v-for='muscleGroup in muscleGroups' :key='muscleGroup._id'>{{ muscleGroup.name }}
      <input class="" type="checkbox" />
      <p v-for='exercise in muscleGroup.exercises' :key='exercise._id'>{{ exercise.name }}
        <input type="checkbox" />
      </p>
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'ExerciseList',
  mounted() {
    this.$store.dispatch('getMuscleGroups')
  },
  computed: {
    ...mapState([
      'muscleGroups',
      'exercises'
    ])
  }
}
</script>

<style lang="css" scoped>

</style>
