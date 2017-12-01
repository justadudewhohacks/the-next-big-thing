const express = require('express')
const nextjs = require('next')
const path = require('path')
const {
  docsRouter
} = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const app = nextjs({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const publicDir = path.join(__dirname, '/public')

app.prepare().then(() => {
  const server = express()
  server.use(express.static(publicDir));

  server.use('/docs', docsRouter({ Router: express.Router, app, publicDir }))

  server.get('/b', (req, res) => app.render(req, res, '/a', req.query))

  server.get('/posts/:id', (req, res) => app.render(req, res, '/posts', { id: req.params.id }))

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
