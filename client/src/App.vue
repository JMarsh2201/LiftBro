<template>
  <div id="app">
    <h1>LiftBro</h1>
    <h4>do you even?</h4>
    <SignIn />
    <ExerciseList />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  text-align: center;
}

.musclegroup-checkbox, .exercise-checkbox {
  float: right;
  display: inline-block;
}

.list-exercises {
  padding: 2% 5% 5% 0;
  width: 200px;
  margin: 0 auto 0 auto;
  background-color: #ccc
}

p {
  font-size: 8px;
}
</style>
