<template>
  <div>
    <br>
    <h1>{{ $t('peers.title') }}</h1>
    <h5>{{ $t('peers.desc') }}</h5>
    <br>

    <table class="table">
      <tr>
        <td>Peer ID</td>
        <td>Peer Addresses</td>
      </tr>
      <tr v-for="p in peers">
        <td>{{p.id}}</td>
        <td><tt>{{p.addr.join(', ')}}</tt></td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'peers',
    data () {
      return {
        peers: []
      }
    },
    components: {
    },
    async mounted () {
      this.peer = await this.$api.json('a/swarm/peer')
      this.peers = await this.$api.json('a/swarm/peers')
    },
    methods: {
    }
  }
</script>
