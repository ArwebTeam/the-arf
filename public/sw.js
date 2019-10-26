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
    arswarm: {
      swarm: {
        listen: ['/dnsaddr/stardust.mkg20001.io/wss/p2p-stardust/', '/dnsaddr/localhost/tcp/5892/ws/p2p-stardust/'],
        bootstrap: []
      }
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
    },
    user: {
      profile: {
        provider: () => {} // TODO: specify this further
      }
    }
  })

  const arbase = require('./generated')
  await (require('arbase-crud')(a, arbase, {prefix: '/api'}))

  a.router.route({
    method: 'GET',
    path: '/sw',
    handler: (request, h) => h.response(true)
  })

  a.arweave.txqueue.flush()
  a.isReady()
}

main()
