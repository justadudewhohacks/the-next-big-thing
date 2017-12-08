/* @flow */

const makeFindAllFunctions = function (functionModel: any) {
  return async function () {
    return functionModel.find({}, null, { sort: { fnName: 1 } })
  }
}

const makeFindFunctionsByModule = function (functionModel: any) {
  return async function (cvModule: string) {
    return functionModel.find({ cvModule }, null, { sort: { fnName: 1 } })
  }
}

const makeFindClassesByModule = function (classModel: any) {
  return async function (cvModule: string) {
    return classModel.find({ cvModule }, null, { sort: { className: 1 } })
  }
}

module.exports = function (
  { functionModel, classModel } : { functionModel: any, classModel: any }
) {
  return ({
    findAllFunctions: makeFindAllFunctions(functionModel),
    findFunctionsByModule: makeFindFunctionsByModule(functionModel),
    findClassesByModule: makeFindClassesByModule(classModel)
  })
}
