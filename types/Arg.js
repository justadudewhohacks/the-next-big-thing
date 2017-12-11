/* @flow */

import Declaration from './Declaration'
import type { DeclarationT } from './Declaration'

export type ArgT = DeclarationT & {
  defaultValue?: string
}

const Arg = {
  ...Declaration,
  defaultValue: { type: String }
}

module.exports = Arg
