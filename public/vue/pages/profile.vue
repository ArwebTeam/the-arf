<template>
  <div>
    <br>
    <h1>{{ $t('profile.title') }}</h1>
    <h5>{{ $t('profile.desc') }}</h5>
    <br>

    <h2>{{ $t('profile.name') }}</h2>
    <div class="lower-layer">
      <label>
        <input style="display: inline-block" class="f f-input" type="text" v-model="$user.display">
        <a style="display: inline-block" class="btn btn-outline-secondary no-border" onclick="updateUser('display')"><i class="fas fa-check"></i></a>
      </label>
    </div>

    <h2>{{ $t('profile.email') }}</h2>
    <div class="lower-layer">
      <label>
        <input style="display: inline-block" class="f f-input" type="text" v-model="$user.email">
        <a style="display: inline-block" class="btn btn-outline-secondary no-border" onclick="updateUser('email')"><i class="fas fa-check"></i></a>
      </label>
    </div>

    <center>
      <addrbox icon="fas fa-check" btn-text="Logout" :btn-click="doLogout" :info="info" />
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import addrbox from './addrbox.vue'

  export default {
    name: 'profile',
    data () {
      return {
        info: {}
      }
    },
    components: {
      addrbox
    },
    async mounted () {
      this.info = await this.$api.json('a/account')
    },
    methods: {
      async doLogout () {
        await this.$api.del('a/account')
        await this.$api.userRefetch()
        window.Toast.fire({ type: 'success', title: `Signed out` })
        this.$router.push('/')
      }
    }
  }
</script>
