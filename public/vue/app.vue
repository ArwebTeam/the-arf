<template>
  <div id="app" :class="'ui ui-' + ($ui.dark ? 'dark' : 'light')">
    <nav :class="'navbar ' + ($ui.dark ? 'navbar-dark bg-dark' : 'navbar-light bg-light')">
      <a style="font-size: 28px" class="navbar-brand" href="/"><img src="../img/icon.svg" height="40" alt="The ARF" /> <b>arf</b></a>

      <div>
        <a style="border: none !important;" href="https://github.com/mkg20001/the-arf" class="btn btn-outline-dark">
          <i class="fa fa-bug"></i>
        </a>
        <a style="border: none !important;" href="/settings" class="btn btn-outline-dark">
          <i class="fas fa-cog"></i>
        </a>
        <a v-if="$user.loggedIn" style="border: none !important;" href="/profile" class="btn btn-outline-secondary">
          <i class="fa fa-user-circle"></i> {{$user.address}} ({{balance}} AR)
        </a>
        <a v-else href="/login" class="btn btn-outline-dark">
          <i class="fa fa-user-circle"></i> {{ $t('login.title') }}
        </a>
      </div>
    </nav>

    <div class="content">
      <div v-if="$ui.loading">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>

      <div v-else class="page-margin">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return { }
  },
  methods: {
  },
  computed: {
    balance: function () {
      const e = 100

      const b = parseFloat(this.$user.balanceAr, 10)
      const b2 = (b - (b % (1 / e))) * e
      return Math.round(b2) / e
    }
  }
}
</script>

<style lang="css"></style>
