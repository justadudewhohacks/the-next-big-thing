import React from 'react'

import type { CvFnSignatureT } from 'types/CvFnSignature'

import CodeLine from './CodeLine'
import FunctionBody from './FunctionBody'

type Props = {
  signature: CvFnSignatureT,
  fnName: string,
  returnValueComponent?: any,
  callbackResultComponent?: any
}

const FunctionSignature = (props : Props) => (
  <CodeLine>
    { props.returnValueComponent }
    <FunctionBody {...props} />
  </CodeLine>
)

FunctionSignature.defaultProps = {
  returnValueComponent: null,
  callbackResultComponent: null
}

export default FunctionSignature
