<template>
  <div>
    <br>
    <br>

    <center>
      <h1 style="font-size: 4em">{{ $t('home.welcome') }}</h1>
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'home',
    data: () => ({
      isLive: !module.hot
    }),
  }
</script>
