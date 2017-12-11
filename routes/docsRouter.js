/* @flow */

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvModuleT } from '@/types/CvModule'
import type { CvClassT } from '@/types/CvClass'
import type { CvFnT } from '@/types/CvFn'

const {
  docsFinderService
} = require('../services')

const isClassFunction = s => s.owner !== 'cv'
const isCvFunction = s => !isClassFunction(s)

function extractClasses(fns: Array<CvFnT>) : Array<string> {
  return Array.from(new Set(
    fns.filter(isClassFunction).map(s => s.owner)
  ))
}

function makeGetApiTree(
  allModules: Array<string>,
  findAllFunctions: void => Promise<Array<CvFnT>>,
  findAllClasses: void => Promise<Array<CvClassT>>
) : void => Promise<Array<CvModuleTreeT>> {
  return async function () : Promise<Array<CvModuleTreeT>> {
    const allFunctions = await findAllFunctions()
    const allClasses = await findAllClasses()

    const cvModuleTrees = allModules.map((cvModule) => {
      const functions = allFunctions.filter(s => cvModule === s.cvModule)
      const classNames = allClasses.filter(s => cvModule === s.cvModule).map(c => c.className)

      const cvClasses = classNames.map(c => ({
        className: c,
        classFnNames: functions.filter(s => c === s.owner).map(s => s.fnName)
      }))

      return ({
        cvModule,
        cvClasses,
        cvFnNames: functions.filter(isCvFunction).map(s => s.fnName)
      })
    })//.filter(m => !!m.cvClasses.length || !!m.cvFnNames.length)

    return cvModuleTrees
  }
}

function makeGetCvModuleDocs(
  findFunctionsByModule: string => Promise<Array<CvFnT>>,
  findClassesByModule: string => Promise<Array<CvClassT>>
) : string => Promise<CvModuleT> {
  return async function (cvModule: string) : Promise<CvModuleT> {
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

exports.makeGetApiTree = makeGetApiTree

exports.create = function (
  { Router, app }: { Router: any, app: any, publicDir: string }
) : any {
  const {
    findAllFunctions,
    findFunctionsByModule,
    findAllClasses,
    findClassesByModule
  } = docsFinderService

  const allModules = ['core', 'imgproc', 'calib3d']
  const getApiTree = makeGetApiTree(allModules, findAllFunctions, findAllClasses)
  const getCvModuleDocs = makeGetCvModuleDocs(findFunctionsByModule, findClassesByModule)

  async function renderDocsPage(req, res) : any {
    try {
      const { cvModule } = req.params
      if (!allModules.some(m => m === cvModule)) {
        app.render(req, res, '/Error404Page')
        return
      }

      const data = {
        apiTree: await getApiTree(),
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
