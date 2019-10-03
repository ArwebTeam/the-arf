const api = () => {
  const fetch = window.fetch

  const base = `/api/`

  const API = {
    json: async (url) => {
      const req = await fetch(`${base}${url}`)
      const json = await req.json()

      json._req = req

      return json
    },
    postJson: async (url, body) => {
      const req = await fetch(`${base}${url}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const json = await req.json()

      json._req = req

      return json
    }
  }

  return API
}

export default api
