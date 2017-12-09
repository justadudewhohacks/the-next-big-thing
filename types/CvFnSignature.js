/* @flow */

import type { ArgT } from './Arg'

export type CvFnSignatureT = {
  returnValues: Array<ArgT>,
  optionalArgs: Array<ArgT>,
  requiredArgs: Array<ArgT>,
  allArgs?: string
}
