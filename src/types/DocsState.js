/* @flow */

import type { CvModuleTreeT } from './CvModuleTree'

export type DocsStateT = {
  apiTreeFilter: string,
  apiTree: Array<CvModuleTreeT>,
  filteredApiTree: Array<CvModuleTreeT>,
  cvModules: any,
  displayedCvModule: string
}
