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

    <table class="table" v-if="txqueue.length">
      <th>
        <tr>
          <td>ID</td>
          <td>Src</td>
          <td>TX</td>
        </tr>
      </th>
      <tr v-for="q in txqueue">
        <td>{{q.id}}</td>
        <td><tt>{{q.kf}}</tt></td>
        <td><tt style="font-size: 12px">{{JSON.stringify(q.tx)}}</tt></td>
      </tr>
    </table>
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
        info: {},
        txqueue: []
      }
    },
    components: {
      addrbox
    },
    async mounted () {
      this.info = await this.$api.json('a/account/logout')
      this.txqueue = await this.$api.json('a/txqueue')
    },
    methods: {
      async doLogout () {
        await this.$api.postJson('a/info/logout', {})
        await this.$api.userRefetch()
        window.Toast.fire({ type: 'success', title: `Signed out` })
        this.$router.push('/')
      }
    }
  }
</script>
