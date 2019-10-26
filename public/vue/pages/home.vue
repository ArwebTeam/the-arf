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

    <div @click="goto('/r/' + topic.route)" class="topic-list" v-for="topic in topics">
      <i class="fa fa-3x icon-bulb fa-comment" :style="`background: ${str2col(topic.name)};`"></i>
      <div class="topic-sub">
        <h1>{{topic.name}}</h1>
        <h2>{{topic.description}}</h2>
      </div>
    </div>

    <!-- <topics></topics> -->
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  // import topics from './topics.vue'
  export default {
    name: 'home',
    data: () => ({
      topics: [ // TODO: make this dynamic
        {
          name: 'Demo',
          description: 'Topic for demo',
          route: 'demo'
        }
      ]
    }),
    components: {
      // topics
    },
    methods: {
      str2col: require('string-to-color'),
      goto (url) {
        this.$router.push(url)
      }
    }
  }
</script>
