<template>
  <div>
    <div v-if="loading">
      <br>
      <br>

      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
    <div v-else>
      <br>
      <h1>{{post.title}}</h1>
      <h3 v-for="line in post.content.split('\n')">{{line}}</h3>
      <br>

      <div class="reply-box">
        <div @click="submitComment()" class="avatar cmt-send" style="">
          <i style="margin-top: 8px; color: #fff; font-size: 2.5em;" class="fa fa-comment"></i>
        </div>
        <textarea ref="comment" v-model="commentContent" class="f f-textarea" type="text" placeholder="Write your comment..."></textarea>
      </div>

      <div @click="goto('/post/' + comment.id)" class="reply-box" v-for="comment in comments">
        <div class="avatar" :style="`background: ${str2col(comment.owner)}`"></div>
        <!-- <h3 v-if="!comment.title.startsWith('Comment from ')">{{comment.title}}</h3> -->
        <div>
          <h5 v-for="line in comment.content.split('\n')">{{line}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'post',
    data: () => ({
      post: {},
      comments: [],
      commentContent: '',
      loading: true
    }),
    methods: {
      async submitComment () {
        const c = this.commentContent
        this.commentContent = ''
        this.$refs.comment.disabled = true

        const data = {
          tags: {
            p: this.$route.params.id
          },
          item: {
            title: `Comment from ${this.$user.address}`,
            content: c
          }
        }

        this.res = await this.$api.postJson(`post`, data, true)
        this.$refs.comment.disabled = false

        await this.refresh()
      },
      async refresh () {
        this.loading = true
        let r = [this.$api.json(`post/${this.$route.params.id}`), this.$api.json(`post?p=${this.$route.params.id}`)]
        this.post = await r[0]
        this.comments = await r[1]
        this.loading = false
      },
      str2col: require('string-to-color'),
      goto (url) {
        this.$router.push(url)
      }
    },
    async mounted () {
      await this.refresh()
    },
    watch: {
      $route (to, from){
        this.refresh()
      }
    }
  }
</script>
