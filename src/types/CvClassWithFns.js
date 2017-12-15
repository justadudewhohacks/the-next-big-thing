/* @flow */

import type { CvClassT } from './CvClass'
import type { CvFnT } from './CvFn'

export type CvClassWithFnsT = CvClassT & {
  classFns: Array<CvFnT>
}
