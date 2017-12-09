/* @flow */

import TypeAndName from './TypeAndName'
import type { TypeAndNameT } from './TypeAndName'

export type ArgT = TypeAndNameT & {
  defaultValue?: string,
  arrayDepth?: number,
  numArrayElements?: number
}

const Arg = {
  ...TypeAndName,
  defaultValue: { type: String },
  arrayDepth: { type: Number },
  numArrayElements: { type: Number }
}

module.exports = Arg
