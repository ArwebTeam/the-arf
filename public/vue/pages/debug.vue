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
      <h5>Debugging information about the swarm and the transaction queue</h5>

      <br>
      <h3>Our Peer</h3>

      <div class="peer ipfs-block">
        <h6><span class="ipfs dark">{{peer.id}}</span></h6>
        <span v-for="addr in peer.addrs"><span class="ipfs">{{addr}}</span><br></span>
      </div>

      <br>
      <h3>Peers ({{ peers.length }})</h3>

      <div v-for="p in peers" class="peer ipfs-block">
        <h6><span class="ipfs dark">{{p.id}}</span></h6>
        <span v-for="addr in p.addrs"><span class="ipfs">{{addr}}</span><br></span>
      </div>

      <br>
      <h3>TXQueue ({{ txqueue.length }})</h3>

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
  .ipfs {
    background: #dfdfdf;
    color: #031D2E;
    padding: .314em;
    border-radius: 2px;
  }
  .ipfs.dark {
    color: #64C2CA;
    background: #031D2E;
  }
  .ipfs-block {
    background: #E0F2F3;
    padding: 2em;
  }
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
