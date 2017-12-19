const express = require('express')
const nextjs = require('next')
const path = require('path')
const bodyParser = require('body-parser')

const docsService = require('./services/docsService')

const createApiRouter = require('./api')

const port = parseInt(process.env.PORT, 10) || 3000
const app = nextjs({ dir: './src', dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const publicDir = path.join(__dirname, '/public')

app.prepare()
  .then(() => docsService.connect())
  .then(() => {
    const server = express()
    server.use(express.static(publicDir))
    server.use(bodyParser.json())

    server.use('*', (req, res, next) => {
      console.log('requesting page:', req.originalUrl)
      next()
    })

    server.use('/api', createApiRouter({ Router: express.Router }))

    async function renderDocsPage(req, res) : any {
      try {
        const { cvModule } = req.params
        if (!docsService.hasCvModule(cvModule)) {
          return app.render(req, res, '/error404')
        }

        const data = {
          apiTree: await docsService.getApiTree(),
          cvModuleDocs: await docsService.getCvModuleDocs(cvModule),
          cvModule
        }
        return app.render(req, res, '/docs', data)
      } catch (err) {
        console.error(err)
        return res.status(505).send()
      }
    }

    server.get('/docs', (req, res) => {
      res.redirect('/docs/core')
    })
    server.get('/docs/:cvModule', renderDocsPage)

    server.get('/', (req, res) => {
      res.redirect('/docs')
    })

    server.get('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
