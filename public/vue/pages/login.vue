<template>
  <div>
    <center>
      <br>
      <h1>{{ $t('login.title') }}</h1>
      <br>
      <input type="file" id="file" ref="keyfile" accept=".json" @change="onFile">
      <br>
      <br>
      <addrbox icon="fas fa-check" btn-text="Login" :btn-click="doLogin" :info="info" />
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import addrbox from './addrbox.vue'

  export default {
    name: 'login',
    data: () => ({
      info: {},
      keyfile: {}
    }),
    methods: {
      onFile() {
        this.info = {}
        this.keyfile = {}

        const file = this.$refs.keyfile.files[0]

        if (!file) {
          return
        }

        const reader = new FileReader()

        reader.onload = async (e) => {
          const res = await window.fetch(reader.result)

          this.keyfile = await res.json()

          this.info = await this.$api.postJson('a/keyfile', this.keyfile)
          if (!this.info.lastTXID) { this.info.lastTXID = '<none>' }
        }

        reader.readAsDataURL(file)
      },
      async doLogin() {
        if (this.keyfile) {
          const addr = await this.$api.postJson('a/info/keyfile', this.keyfile, true)
          await this.$api.userRefetch()
          window.Toast.fire({ type: 'success', title: `Signed in as ${addr}` })
          this.$router.push('/')
        }
      }
    },
    components: {
      addrbox
    }
  }
</script>
