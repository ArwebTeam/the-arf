<template>
  <div>
    <center>
      <br>
      <h1>{{ $t('login.title') }}</h1>
      <br>
      <input type="file" id="file" ref="keyfile" accept=".json" @change="onFile">
    </center>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  function readBlob (str) {
    let i = 5 // skip data;

    let mime = ''
    let enc = ''
    let data = ''

    let block = 'mime'

    while (str.length > i) {
      let cur = str[i]

      switch(block) {
        case 'mime': {
          if (cur === ';') {
            block = 'enc'
          } else {
            mime += cur
          }

          i++

          break
        }
        case 'enc': {
          if (cur === ',') {
            block = 'data'
          } else {
            enc += cur
          }

          i++

          break
        }
        case 'data': {
          data += cur
          i++

          break
        }
        default: {
          throw new TypeError('d')
        }
      }
    }

    return {
      encoding: enc,
      mime,
      data
    }
  }

  export default {
    name: 'login',
    data: () => ({}),
    methods: {
      onFile() {
        const file = this.$refs.keyfile.files[0]

        if (!file) {
          return
        }

        const reader = new FileReader()

        reader.onload = async (e) => {
          // console.log(readBlob(reader.result))

          let res = await window.fetch(reader.result)
          res = await res.json()

          console.log(res)
        }

        reader.readAsDataURL(file)
      }
    }
  }
</script>
