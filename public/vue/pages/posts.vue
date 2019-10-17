<template>
  <div>
    <page resource="topic" :tags="{board: this.$route.params.board}" :allowCreate="$user.loggedIn">
      <template slot="header">
        <h1>{{ $t('posts.title') }}</h1>
        <br>
      </template>

      <template slot="elements" scope="t">
        <div class="topic-list" v-for="post in t.data">
          <i class="fa fa-3x icon-bulb fa-comment" :style="`background: ${str2col(post.name)};`"></i>
          <div class="topic-sub">
            <h1>{{post.name}}</h1>
            <h2>{{post.description}}</h2>
          </div>
        </div>
      </template>

      <template slot="actions" scope="t"> <!-- TODO: fix showing via slot -->
        <div @click="t.link()" class="topic-list add-btn">
          <i class="fa fa-3x icon-bulb fa-plus"></i>
          <div class="topic-sub">
            <h1>Add</h1>
            <h2>Create a new post</h2>
          </div>
        </div>
      </template>

      <template slot="singleEdit" scope="t">
        <h1>{{ $t('posts.createTitle') }}</h1>
        <br>
        <input class="f f-input" type="text" v-model="t.item.name">
        <textarea class="f f-input" type="text" v-model="t.item.desc"></textarea>
      </template>
    </page>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import page from './page.vue'

  export default {
    name: 'posts',
    data: () => ({ }),
    methods: {
      str2col: require('string-to-color')
    },
    components: {
      page
    }
  }
</script>
