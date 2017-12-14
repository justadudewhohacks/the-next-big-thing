/* @flow */

import type { CvModuleT } from './CvModule'
import type { CvModuleTreeT } from './CvModuleTree'

export type DocsStateT = {
  apiTree: Array<CvModuleTreeT>,
  cvModules: any, // TODO immutable Map
  displayedCvModule: string,
  displayedCvModuleDocs: CvModuleT
}
