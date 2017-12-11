/* @flow */

import Arg from './Arg'
import TypeAndName from './TypeAndName'
import type { TypeAndNameT } from './TypeAndName'
import type { ConstructorT } from './Constructor'


export type CvClassT = {
  className: string,
  cvModule: string,
  fields: Array<TypeAndNameT>,
  constructors: Array<ConstructorT>
}


const CvClass = {
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [TypeAndName],
  constructors: {
    type: [{
      optionalArgs: { type: [Arg] },
      requiredArgs: { type: [Arg] },
      returnsOther: String
    }],
    required: true
  }
}

module.exports = CvClass

