<template>
  <div>
    <center>
      <br>
      <h1>{{ $t('login.title') }}</h1>
      <br>
      <input type="file" id="file" ref="keyfile" accept=".json" @change="onFile">
      <br>
      <br>
      <div style="max-width: 669px" class="light-card" v-if="info.address">
        <img src="../../img/arweave.png" alt="Arweave Logo" width="64" style="display: block; position: absolute; margin-top: 48px; filter: opacity(0.6);" />
        <i class="material-icons fa-4x" style="display: block; position: absolute; margin-left: auto; margin-top: 48px; filter: opacity(0.6);">vpn_key</i>
        <h5>Address: <tt>{{info.address}}</tt></h5>
        <h5>Balance: {{info.balanceAr}} AR</h5>
        <h5>Last Transaction: <tt>{{info.lastTXID}}</tt></h5>

        <br>
        <div class="btn btn-secondary" @click="doLogin()"><i class="fas fa-check"></i> Login</div>
      </div>
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
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
          window.Toast.fire({ type: 'success', title: `Signed in as ${addr}` })
          this.$router.push('/')
        }
      }
    }
  }
</script>
