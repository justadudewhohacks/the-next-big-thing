/* @flow */

import Arg from './Arg'
import type { CvFnSignatureT } from './CvFnSignature'

export type CvFnT = {
  fnName: string,
  cvModule: string,
  owner: string,
  hasAsync: boolean,
  category?: string,
  signatures: Array<CvFnSignatureT>
}

const CvFn = {
  fnName: { type: String, required: true },
  cvModule: { type: String, required: true },
  owner: { type: String, required: true },
  hasAsync: { type: Boolean, required: true },
  category: { type: String },
  signatures: [
    {
      returnValues: { type: [Arg] },
      optionalArgs: { type: [Arg] },
      requiredArgs: { type: [Arg] },
      allArgs: { type: String }
    }
  ]
}

module.exports = CvFn
