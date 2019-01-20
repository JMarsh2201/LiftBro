import axios from 'axios'

export default {
  getMuscleGroups({commit}) {
    axios
      .get('http://localhost:5000/api/muscle_groups')
      .then(data => {
        let muscleGroups = data.data
        commit('SET_MUSCLEGROUPS', muscleGroups)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
