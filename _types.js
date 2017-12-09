/* @flow */

export type FnMetaData = {
  cvModule: string,
  fnName: string,
  owner: string
}

export type FnSignature = {
  returnValues: Array<any>,
  optionalArgs: Array<any>,
  requiredArgs: Array<any>
}

export type Fn = FnMetaData & {
  signatures: Array<FnSignature>
}

export type FnsByClass = {
  className: string,
  classFns: Array<Fn>
}

export type CvModuleClass = {
  className: string,
  cvModule: string,
  fields: Array<any>,
  constructors: Array<FnSignature>
}

export type CvModuleClassInfo = CvModuleClass & {
  classFns: Array<Fn>
}

export type CvModule = {
  cvClasses: Array<CvModuleClassInfo>,
  cvFns: Array<Fn>
}

export type CvModuleClassFunctions = {
  className: string,
  fnNames: Array<string>
}





export type ModuleTree = {
  cvModule: string,
  fnNames: Array<string>,
  clazzes: Array<CvModuleClassFunctions>
}
