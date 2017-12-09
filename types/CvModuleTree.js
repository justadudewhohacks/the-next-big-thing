/* @flow */

import type { CvClassInfoT } from './CvClassInfo'

export type CvModuleTreeT = {
  cvModule: string,
  cvFnNames: Array<string>,
  cvClasses: Array<CvClassInfoT>
}
