/* @flow */

import Arg from './Arg'
import Declaration from './Declaration'
import type { DeclarationT } from './Declaration'
import type { ConstructorT } from './Constructor'

export type CvClassT = {
  className: string,
  cvModule: string,
  fields: Array<DeclarationT>,
  constructors: Array<ConstructorT>
}


const CvClass = {
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [Declaration],
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

