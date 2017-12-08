/* @flow */

import type { FnMetaData, Fn, CvModule, CvModuleClass, ModuleTree } from '../types'

const {
  docsFinderService
} = require('../services')

const isClassFunction = s => s.owner !== 'cv'
const isCvFunction = s => !isClassFunction(s)

function extractClasses(fns: Array<FnMetaData>) : Array<string> {
  return Array.from(new Set(
    fns.filter(isClassFunction).map(s => s.owner)
  ))
}

function makeGetAPITree(
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

function makeGetCvModuleDocs(
  findFunctionsByModule: string => Promise<Array<Fn>>,
  findClassesByModule: string => Promise<Array<CvModuleClass>>
) {
  return async function (cvModule: string) : Promise<CvModule> {
    // TODO: figure out how to cast intersection types
    const functionsByModule: Array<any> = await findFunctionsByModule(cvModule)

    const cvClasses = (await findClassesByModule(cvModule)).map(c => ({
      className: c.className,
      fields: c.fields,
      constructors: c.constructors,
      cvModule,
      classFns: functionsByModule.filter(s => c.className === s.owner)
    }))

    const cvFns = functionsByModule.filter(isCvFunction)

    return { cvClasses, cvFns }
  }
}

exports.makeGetAPITree = makeGetAPITree

exports.create = function (
  { Router, app }: { Router: any, app: any, publicDir: string }
) {
  const {
    findAllFunctions,
    findFunctionsByModule,
    findClassesByModule
  } = docsFinderService

  const allModules = ['core', 'imgproc', 'calib3d']
  const getAPITree = makeGetAPITree(allModules, findAllFunctions)
  const getCvModuleDocs = makeGetCvModuleDocs(findFunctionsByModule, findClassesByModule)

  async function renderDocsPage(req, res) {
    try {
      const { cvModule } = req.params
      if (!allModules.some(m => m === cvModule)) {
        app.render(req, res, '/Error404Page')
        return
      }

      const data = {
        apiTree: await getAPITree(),
        cvModuleDocs: await getCvModuleDocs(cvModule),
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
