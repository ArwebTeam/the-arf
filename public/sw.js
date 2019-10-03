global.DEBUG = true

const arweb = require('arweb')

arweb.sw({
  app: {
    id: 'io.mkg20001.the-arf'
  },
  arweave: {
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  },
  static: {
    /* provider: arweb.static.arweave,
    config: {
      address: 'addr',
      app: 'the-arf'
    } */
    provider: arweb.static.network,
    config: {
      url: ''
    }
  }
  /*,
  api: {
    mainBlock: 'BLOCKID'
  } */
}).then(a => {
  /* require('./generated')(a).then(() => { // generated by "npm run prebuild"

  }) */

  a.route({
    method: 'GET',
    path: '/sw',
    handler: () => 'true'
  })
})
