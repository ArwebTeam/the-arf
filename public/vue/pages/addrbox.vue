<template>
  <div style="max-width: 669px" class="light-card" v-if="info.address">
    <img src="../../img/arweave.png" alt="Arweave Logo" width="64" style="display: block; position: absolute; margin-top: 48px; filter: opacity(0.6);" />
    <i class="material-icons fa-4x" style="display: block; position: absolute; margin-left: auto; margin-top: 48px; filter: opacity(0.6);">vpn_key</i>
    <h5>Address: <tt>{{info.address}}</tt></h5>
    <h5>Balance: {{info.balanceAr}} AR</h5>
    <h5>Last Transaction: <tt>{{info.lastTXID}}</tt></h5>

    <br>
    <div class="btn btn-secondary" @click="btnClick()"><i :class="icon"></i> {{btnText}}</div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'addrbox',
    props: {
      info: Object,
      btnText: String,
      btnClick: Function,
      icon: String
    },
    data: () => ({ })
  }
</script>
