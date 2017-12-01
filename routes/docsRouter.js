/* @flow */

const path = require('path')
const {
  makeFindAllSignatures,
  makeFindSignaturesByModule
} = require('../services')

const makeGetAPITree = function (
  findAllSignatures: void =>
    Array<{
      cvModule: string,
      className: string,
      name: string,
      clazz?: string
    }>,
  allModules: Array<string>
) {
  return function () {
    const allSignatures = findAllSignatures()

    return allModules.map((cvModule) => {
      const signatures = allSignatures.filter(s => cvModule === s.cvModule)

      const moduleClasses = new Set(
        signatures.filter(s => !!s.clazz).map(s => s.clazz)
      )
      const clazzes = Array.from(moduleClasses).map(c => ({
        className: c,
        fns: signatures.filter(s => c === s.clazz).map(s => s.name)
      }))

      console.log(moduleClasses)
      console.log(signatures.filter(s => !s.clazz).map(s => s.name))

      return ({
        cvModule,
        clazzes,
        fns: signatures.filter(s => !s.clazz).map(s => s.name)
      })
    }).filter(m => !!m.clazzes.length || !!m.fns.length)
  }
}

exports.makeGetAPITree = makeGetAPITree

exports.create = function (
  { Router, app, publicDir } : { Router : any, app : any, publicDir : string }
) {
  const findAllSignatures = makeFindAllSignatures(path.join(publicDir, '_docs'))
  const findSignaturesByModule = makeFindSignaturesByModule(path.join(publicDir, '_docs'))

  const allModules = ['core', 'imgproc', 'calib3d']
  const getAPITree = makeGetAPITree(findAllSignatures, allModules)

  const handleDocsPage = (cvModule : string, onInvalidModule: () => any) => {
    if (!allModules.some(m => m === cvModule)) {
      return onInvalidModule();
    }

    return ({
      apiTree: getAPITree(),
      cvModuleFns: findSignaturesByModule(cvModule)
    })
  }

  const router = Router();
  router.get('/', (req, res) => res.redirect('/docs/core'))
  router.get('/:cvModule', (req, res) => app.render(req, res, '/DocsPage', handleDocsPage(req.params.cvModule, () => res.send(404))))

  return router
}
