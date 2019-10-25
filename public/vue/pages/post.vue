<template>
  <div>
    <div v-if="!post.title">
      Loading...
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

      <div class="reply-box" v-for="comment in comments">
        <div class="avatar" :style="`background: ${str2color(comment.owner)}`"></div>
        <div>
          <h3>{{comment.title}}</h3>
          <h5 v-for="line in comment.content.split('\n')">{{line}}</h5>
        </div>
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
      commentContent: ''
    }),
    methods: {
      async submitComment () {
        const c = this.commentContent
        this.commentContent = ''
        this.$refs.comment.disabled = true

        let [title, ...rest] = c.split('\n')

        const data = {
          tags: {
            p: this.$route.params.id
          },
          item: {
            title,
            content: rest.join('\n')
          }
        }

        this.res = await this.$api.postJson(`post`, data)
        this.$refs.comment.disabled = false

        await this.refresh()
      },
      async refresh () {
        let r = [this.$api.json(`post/${this.$route.params.id}`), this.$api.json(`post?p=${this.$route.params.id}`)]
        this.post = await r[0]
        this.comments = await r[1]
      },
      str2color: require('string-to-color')
    },
    async mounted () {
      await this.refresh()
    }
  }
</script>
