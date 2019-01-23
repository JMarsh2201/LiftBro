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
        err.json()
      })
  },
  SignUpNewUser() {
    axios
      .post('http://localhost:5000/api/account/signup', {
        username: 'test',
        email: this.state.user.email,
        password: this.state.user.password
      })
      .then(data => {
        data.json()
      })
      .catch(err => {
        err.json()
      })
  }
}
