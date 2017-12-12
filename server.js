const express = require('express')
const nextjs = require('next')
const path = require('path')
const {
  docsRouter
} = require('./routes')
const {
  connect
} = require('./services')

const port = parseInt(process.env.PORT, 10) || 3000
const app = nextjs({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const publicDir = path.join(__dirname, '/public')

app.prepare()
  .then(() => connect('justaclient', 'opencv4nodejs'))
  .then(() => {
    const server = express()
    server.use(express.static(publicDir));
    server.use('*', (req, res, next) => {
      console.log('requesting page:', req.originalUrl)
      next()
    })
    server.use('/docs', docsRouter({ Router: express.Router, app }))

    server.get('/', (req, res) => res.redirect('/docs'))

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
