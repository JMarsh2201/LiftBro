<template lang="html">
  <div class="">
    <form class="">
      <input @change='handleFieldChange' type="email" name="email" value="" placeholder="email">
      <input @change='handleFieldChange' type="password" name="password" value="" placeholder="password">
      <button @click='submitNewUser' type="submit" name="button">Sign Up / Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    handleFieldChange(e) {
      this.$store.commit('updateSignInFields', e.target)
    },
    submitNewUser() {
      this.$store.dispatch('SignUpNewUser')
    }
  }
}
</script>

<style lang="css" scoped>
  input {
    margin: 5px
  }

</style>
