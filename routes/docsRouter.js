/* @flow */

import type { FnMetaData, Fn, FnsByOwner, ModuleTree } from '../types'

const {
  docsFinderService
} = require('../services')

const isClassFunction = s => s.owner !== 'cv'
const isCvFunction = s => !isClassFunction(s)

const extractClasses = function (fns: Array<FnMetaData>) : Array<string> {
  return Array.from(new Set(
    fns.filter(isClassFunction).map(s => s.owner)
  ))
}

const makeGetAPITree = function (
  allModules: Array<string>,
  findAllFunctions: void => Promise<Array<FnMetaData>>
) {
  return async function () : Promise<Array<ModuleTree>> {
    const allFunctions = await findAllFunctions()

    const cvModuleTrees = allModules.map((cvModule) => {
      const functions = allFunctions.filter(s => cvModule === s.cvModule)

      const clazzes = extractClasses(functions).map(c => ({
        className: c,
        fnNames: functions.filter(s => c === s.owner).map(s => s.fnName)
      }))

      return ({
        cvModule,
        clazzes,
        fnNames: functions.filter(isCvFunction).map(s => s.fnName)
      })
    }).filter(m => !!m.clazzes.length || !!m.fnNames.length)

    return cvModuleTrees
  }
}

const makeGetFunctionsByModule = function (findFunctionsByModule: string => Promise<Array<Fn>>) {
  return async function (cvModule: string) : Promise<FnsByOwner> {
    // TODO: figure out how to cast intersection types
    const functionsByModule: Array<any> = await findFunctionsByModule(cvModule)
    const fnsByClasses = extractClasses(functionsByModule).map(c => ({
      className: c,
      fns: functionsByModule.filter(s => c === s.owner)
    }))

    return ({
      fnsByClasses,
      cvFns: functionsByModule.filter(isCvFunction)
    })
  }
}

exports.makeGetAPITree = makeGetAPITree

exports.create = function (
  { Router, app }: { Router: any, app: any, publicDir: string }
) {
  const {
    findAllFunctions,
    findFunctionsByModule
  } = docsFinderService

  const allModules = ['core', 'imgproc', 'calib3d']
  const getAPITree = makeGetAPITree(allModules, findAllFunctions)
  const getFunctionsByModule = makeGetFunctionsByModule(findFunctionsByModule)

  async function renderDocsPage(req, res) {
    try {
      const { cvModule } = req.params
      if (!allModules.some(m => m === cvModule)) {
        app.render(req, res, '/Error404Page')
        return
      }

      const data = {
        apiTree: await getAPITree(),
        cvModuleFns: await getFunctionsByModule(cvModule),
        cvModule
      }
      app.render(req, res, '/DocsPage', data)
    } catch (err) {
      console.error(err)
      res.status(505).send()
    }
  }

  const router = Router();
  router.get('/', (req, res) => res.redirect('/docs/core'))
  router.get('/:cvModule', renderDocsPage)

  return router
}
