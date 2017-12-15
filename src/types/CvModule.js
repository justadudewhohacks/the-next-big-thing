/* @flow */

import type { CvFnT } from './CvFn'
import type { CvClassWithFnsT } from './CvClassWithFns'

export type CvModuleT = {
  cvClasses: Array<CvClassWithFnsT>,
  cvFns: Array<CvFnT>
}
