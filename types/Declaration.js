/* @flow */

import TypeAndName from './TypeAndName'
import type { TypeAndNameT } from './TypeAndName'

export type DeclarationT = TypeAndNameT & {
  arrayDepth?: number,
  numArrayElements?: number
}

const Declaration = {
  ...TypeAndName,
  arrayDepth: { type: Number },
  numArrayElements: { type: Number }
}

module.exports = Declaration
