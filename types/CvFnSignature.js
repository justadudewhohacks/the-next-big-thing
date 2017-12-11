/* @flow */

import type { ArgT } from './Arg'
import type { CvFnBodyT } from './CvFnBody'

export type CvFnSignatureT = CvFnBodyT & {
  returnValues: Array<ArgT>,
  allArgs?: string
}
