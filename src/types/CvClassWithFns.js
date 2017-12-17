/* @flow */

import type { CvClassT } from './CvClass'
import type { CategorizedCvFnsT } from './CategorizedCvFns'

export type CvClassWithFnsT = CvClassT & {
  classFnsByCategory: Array<CategorizedCvFnsT>
}
