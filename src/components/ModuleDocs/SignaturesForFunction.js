/* @flow */

import React from 'react'

import type { CvFnSignatureT } from 'types/CvFnSignature'

import Code from './Code'
import Type from './Type'
import PromiseType from './PromiseType'
import Result from './Result'
import ResultAlias from './ResultAlias'
import FunctionSignature from './FunctionSignature'

type AsyncFnProps = {
  signature: CvFnSignatureT,
  fnName: string,
  returnTypeComponent: any
}

const AsyncFunctionSignatures = ({ signature, fnName, returnTypeComponent } : AsyncFnProps) => {
  const sharedProps = { signature, fnName }
  return (
    <span>
      <FunctionSignature
        {...sharedProps}
        returnValueComponent={
          <PromiseType>
            { returnTypeComponent || '' }
          </PromiseType>
        }
      />
      <FunctionSignature
        {...sharedProps}
        callbackResultComponent={
          <span>
            { returnTypeComponent }
            <span> {'res'} </span>
          </span>
        }
      />
    </span>
  )
}

type Props = {
  signature: CvFnSignatureT,
  fnName: string,
  hasAsync: boolean
}

export default ({ signature, fnName, hasAsync } : Props) => {
  const { returnValues } = signature
  const hasReturnVal = returnValues && returnValues.length
  const useResultAlias = hasReturnVal && returnValues.length > 2

  const returnTypeComponent = (
    !hasReturnVal
      ? null
      : useResultAlias
        ? <Result />
        : <Type {...returnValues[0]} />
  )

  const syncFunctionSignatureProps = {
    signature,
    fnName,
    returnValueComponent:
      hasReturnVal
        ? <span> { returnTypeComponent }{ ' : ' } </span>
        : returnTypeComponent
  }

  const asyncFunctionSignaturesProps = {
    signature,
    fnName: `${fnName}Async`,
    returnTypeComponent
  }

  return (
    <Code>
      {
        useResultAlias
          ? <ResultAlias returnValues={returnValues} />
          : null
      }
      <FunctionSignature {...syncFunctionSignatureProps} />
      {
        hasAsync
          ? <AsyncFunctionSignatures {...asyncFunctionSignaturesProps} />
          : null
      }
    </Code>
  )
}
