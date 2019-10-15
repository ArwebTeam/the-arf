<template>
  <div>
    <page resource="topic">
      <template name="header">
        <h1>{{ $t('topics.title') }}</h1>
        <br>
      </template>

      <template name="elements" scope="t">
        <div class="topic-list" v-for="topic in t.data">
          <i class="fa fa-3x icon-bulb fa-comment" :style="`background: ${str2col(topic.name)};`"></i>
          <div class="topic-sub">
            <h1>{{topic.name}}</h1>
            <h2>{{topic.description}}</h2>
          </div>
        </div>
      </slot>

      <template name="actions">
        <div class="topic-list add-btn">
          <i class="fa fa-3x icon-bulb fa-plus"></i>
          <div class="topic-sub">
            <h1>Add</h1>
            <h2>Create a new topic</h2>
          </div>
        </div>
      </slot>
    </page>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  import page from './page.vue'

  export default {
    name: 'post',
    data: () => ({
      topics: [{name: 'test', description: 'test'}, {name: 'test2', description: 'uffffffffff'}]
    }),
    methods: {
      str2col: require('string-to-color')
    },
    components: {
      page
    }
  }
</script>
