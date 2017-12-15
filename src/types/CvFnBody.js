/* @flow */

import type { ArgT } from './Arg'

export type CvFnBodyT = {
  optionalArgs: Array<ArgT>,
  requiredArgs: Array<ArgT>
}
