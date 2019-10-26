<template>
  <div>
    <div v-if="loading">
      <br>
      <br>
      <br>
      <br>
      <center>
        <i class="fas fa-cog fa-spin fa-4x"></i>
      </center>
    </div>
    <div v-else>
      <br>
      <h1>Debug</h1>
      <h5>This is the debug page, intended for developers and nerds</h5>

      <br>
      <h1>Peers ({{ peers.length }})</h1>

      <table class="table">
        <tr>
          <td>Peer ID</td>
          <td>Peer Addresses</td>
        </tr>
        <tr v-for="p in peers">
          <td>{{p.id}}</td>
          <td><tt>{{p.addrs.join(', ')}}</tt></td>
        </tr>
      </table>

      <br>
      <h1>TXQueue ({{ txqueue.length }})</h1>

      <table class="table">
        <tr>
          <td>ID</td>
          <td>Src</td>
          <td>TX</td>
        </tr>
        <tr v-for="q in txqueue">
          <td>{{q.id}}</td>
          <td><tt>{{q.kf}}</tt></td>
          <td><tt style="font-size: 12px">{{JSON.stringify(q.tx)}}</tt></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'debug',
    data: () => ({
      peer: {},
      peers: [],
      txqueue: [],
      loading: true
    }),
    async mounted () {
      let r = [
        this.$api.json('a/swarm/peer'),
        this.$api.json('a/swarm/peers'),
        this.$api.json('a/txqueue')
      ]

      this.peer = await r[0]
      this.peers = await r[1]
      this.txqueue = await r[2]
      this.loading = false
    },
    methods: {
    }
  }
</script>
