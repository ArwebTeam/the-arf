<template>
  <div>
    <!-- <center>
      <br>
      <span class="main-page-btn">
        <a v-if="$user.p.admin && !isLive" href="/admin/pad">
          <button type="button" class="btn btn-danger bmd-btn-fab">
            <i class="fas fa-list"></i>
          </button>
        </a>
        <a v-else-if="!isLive" href="/pad">
          <button type="button" class="btn btn-danger bmd-btn-fab">
            <i class="far fa-sticky-note"></i>
          </button>
        </a>
        <a href="/tasks">
          <button type="button" class="btn btn-success bmd-btn-fab">
            <i class="fas fa-check-circle"></i>
          </button>
        </a>
        <a href="/projects">
          <button type="button" class="btn btn-purple bmd-btn-fab">
            <i class="fas fa-project-diagram"></i>
          </button>
        </a>
        <a v-if="!isLive" href="/protokolle">
          <button type="button" class="btn btn-warning bmd-btn-fab" style="color: white">
            <i class="fas fa-archive"></i>
          </button>
        </a>
        <a href="/settings">
          <button type="button" class="btn btn-info bmd-btn-fab">
            <i class="fas fa-cog"></i>
          </button>
        </a>
      </span>
    </center> !-->

    <br>
    <h2>{{ $t('home.welcome') }}</h2>

    <br>
    <br>

    <h1>Topics</h1>
    <br>

    <div class="topic-list" v-for="topic in topics">
      <i class="fa fa-3x icon-bulb fa-comment" :style="`background: ${str2col(topic.name)};`"></i>
      <div class="topic-sub">
        <h1>{{topic.name}}</h1>
        <h2>{{topic.description}}</h2>
      </div>
    </div>

    <div class="topic-list add-btn">
      <i class="fa fa-3x icon-bulb fa-plus"></i>
      <div class="topic-sub">
        <h1>Add</h1>
        <h2>Create a new topic</h2>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'home',
    data: () => ({
      isLive: !module.hot,
      topics: [{name: 'test', description: 'test'}, {name: 'test2', description: 'uffffffffff'}]
    }),
    methods: {
      str2col: require('string-to-color')
    }
  }
</script>
