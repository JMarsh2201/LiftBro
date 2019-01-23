<template lang="html">
  <div class="list-exercises">
    <button @click='createWorkout' type="submit" name="button">Create Workout</button>
    <h1 class="musclegroup" v-for='muscleGroup in muscleGroups' :key='muscleGroup._id'>{{ muscleGroup.name }}
      <p v-for='exercise in muscleGroup.exercises' :key='exercise._id'>{{ exercise }}
        <input @change='toggleSelected' type="checkbox" />
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
  },
  methods: {
    toggleSelected(e) {
      this.$store.commit('addSelectedExercises', e.target.parentNode.innerText)
    },
    createWorkout() {
      
    }
  }
}
</script>

<style lang="css" scoped>

</style>
