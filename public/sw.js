global.DEBUG = true

const arweb = require('../../arweb/src')

async function main () {
  const a = await arweb.sw({
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
  })

  await require('./generated')(a)

  a.route({
    method: 'GET',
    path: '/sw',
    handler: (request, h) => h.response(true)
  })

  a.isReady()
}

main()
