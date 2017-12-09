/* @flow */

import Arg from './Arg'
import type { ArgT } from './Arg'
import TypeAndName from './TypeAndName'
import type { TypeAndNameT } from './TypeAndName'

export type CvClassT = {
  className: string,
  cvModule: string,
  fields: Array<TypeAndNameT>,
  constructors: {
    optionalArgs: Array<ArgT>,
    requiredArgs: Array<ArgT>
  }
}

const CvClass = {
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [TypeAndName],
  constructors: {
    type: [{
      optionalArgs: { type: [Arg] },
      requiredArgs: { type: [Arg] }
    }],
    required: true
  }
}

module.exports = CvClass

