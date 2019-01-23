export default {
  SET_MUSCLEGROUPS(state, muscleGroups) {
    state.muscleGroups = muscleGroups
  },
  addSelectedExercises(state, selectedExercise) {
    const isSelected = state.selectedExercises.indexOf(selectedExercise)
    if (isSelected > -1) {
      state.selectedExercises.splice(isSelected, 1)
    } else {
      state.selectedExercises.push(selectedExercise)
    }
  },
  updateSignInFields(state, textfield) {
    if (textfield.name === 'email') {
      this.state.user.email = textfield.value
    } else if (textfield.name === 'password') {
      this.state.user.password = textfield.value
    }
  }
}
