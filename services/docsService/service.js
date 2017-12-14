/* @flow */

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvModuleT } from '@/types/CvModule'
import type { CvClassT } from '@/types/CvClass'
import type { CvFnT } from '@/types/CvFn'

const isClassFunction = s => s.owner !== 'cv'
const isCvFunction = s => !isClassFunction(s)

exports.makeHasCvModule = function (allModules: Array<string>) : string => boolean {
  return function (cvModule: string) : boolean {
    return allModules.some(m => m === cvModule)
  }
}

exports.makeGetApiTree = function makeGetApiTree(
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
    })

    return cvModuleTrees
  }
}

exports.makeGetCvModuleDocs = function (
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

