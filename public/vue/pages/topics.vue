<template>
  <div>
    <page resource="topic" :tags="{board: this.$route.params.board}" :allowCreate="$user.loggedIn">
      <template slot="header">
        <h1>{{ $t('topics.title') }}</h1>
        <br>
      </template>

      <template slot="elements" scope="t">
        <div class="topic-list" v-for="topic in t.data">
          <i class="fa fa-3x icon-bulb fa-comment" :style="`background: ${str2col(topic.name)};`"></i>
          <div class="topic-sub">
            <h1>{{topic.name}}</h1>
            <h2>{{topic.description}}</h2>
          </div>
        </div>
      </template>

      <template slot="actions" scope="t"> <!-- TODO: fix showing via slot -->
        <div @click="t.link()" class="topic-list add-btn">
          <i class="fa fa-3x icon-bulb fa-plus"></i>
          <div class="topic-sub">
            <h1>Add</h1>
            <h2>Create a new topic</h2>
          </div>
        </div>
      </template>
    </page>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import page from './page.vue'

  export default {
    name: 'topics',
    data: () => ({ }),
    methods: {
      str2col: require('string-to-color')
    },
    components: {
      page
    }
  }
</script>
