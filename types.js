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
  fns: Array<Fn>
}

export type FnsByOwner = {
  fnsByClasses: Array<FnsByClass>,
  cvFns: Array<Fn>
}

export type ModuleClass = {
  className: string,
  fnNames: Array<string>
}

export type ModuleTree = {
  cvModule: string,
  fnNames: Array<string>,
  clazzes: Array<ModuleClass>
}
