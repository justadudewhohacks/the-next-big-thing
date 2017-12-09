/* @flow */

import type { CvFnT } from '@/types/CvFn'
import type { CvClassT } from '@/types/CvClass'

const makeFindAllFunctions = function (FnSchema: any) : void => Promise<Array<CvFnT>> {
  return async function () : Promise<Array<CvFnT>> {
    return FnSchema.find({}, null, { sort: { fnName: 1 } })
  }
}

const makeFindFunctionsByModule = function (FnSchema: any) : string => Promise<Array<CvFnT>> {
  return async function (cvModule: string) : Promise<Array<CvFnT>> {
    return FnSchema.find({ cvModule }, null, { sort: { fnName: 1 } })
  }
}

const makeFindClassesByModule = function (ClassSchema: any) : string => Promise<Array<CvClassT>> {
  return async function (cvModule: string) : Promise<Array<CvClassT>> {
    return ClassSchema.find({ cvModule }, null, { sort: { className: 1 } })
  }
}

module.exports = function (
  { FnSchema, ClassSchema } : { FnSchema: any, ClassSchema: any }
) : {
  findAllFunctions: void => Promise<Array<CvFnT>>,
  findFunctionsByModule: string => Promise<Array<CvFnT>>,
  findClassesByModule: string => Promise<Array<CvClassT>>
} {
  return ({
    findAllFunctions: makeFindAllFunctions(FnSchema),
    findFunctionsByModule: makeFindFunctionsByModule(FnSchema),
    findClassesByModule: makeFindClassesByModule(ClassSchema)
  })
}
