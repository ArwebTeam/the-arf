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
        <img src="../../img/arweave.png" alt="Arweave Logo" width="64" style="display: block; position: absolute; margin-top: 16px; filter: opacity(0.6);" />
        <i class="material-icons fa-4x" style="display: block; position: absolute; margin-left: auto; margin-top: 16px; filter: opacity(0.6);">vpn_key</i>
        <h5>Address: <tt>{{info.address}}</tt></h5>
        <h5>Balance: {{info.balanceAr}}</h5>
        <h5>Last Transaction: <tt>{{info.lastTXID}}</tt></h5>
      </div>
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  function readBlob (str) {
    let i = 5 // skip data;

    let mime = ''
    let enc = ''
    let data = ''

    let block = 'mime'

    while (str.length > i) {
      let cur = str[i]

      switch(block) {
        case 'mime': {
          if (cur === ';') {
            block = 'enc'
          } else {
            mime += cur
          }

          i++

          break
        }
        case 'enc': {
          if (cur === ',') {
            block = 'data'
          } else {
            enc += cur
          }

          i++

          break
        }
        case 'data': {
          data += cur
          i++

          break
        }
        default: {
          throw new TypeError('d')
        }
      }
    }

    return {
      encoding: enc,
      mime,
      data
    }
  }

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
          // console.log(readBlob(reader.result))

          let res = await window.fetch(reader.result)
          res = await res.json()

          this.keyfile = res

          this.info = await this.$api.postJson('a/keyfile', res)
        }

        reader.readAsDataURL(file)
      }
    }
  }
</script>
