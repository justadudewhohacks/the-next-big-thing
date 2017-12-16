/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvFnSignatureT } from 'types/CvFnSignature'

import Code from './Code'
import CodeLine from './CodeLine'
import Colon from './Colon'
import Void from './Void'
import Type from './Type'
import PromiseType from './PromiseType'
import Result from './Result'
import ResultAlias from './ResultAlias'
import FunctionBody from './FunctionBody'

type AsyncFnProps = {
  signature: CvFnSignatureT,
  fnName: string,
  returnTypeComponent: any
}

const AsyncFunctionSignatures = ({ signature, fnName, returnTypeComponent } : AsyncFnProps) => {
  const sharedProps = { signature, fnName }
  return (
    <span>
      <CodeLine>
        <FunctionBody
          {...sharedProps}
        />
      </CodeLine>
      <CodeLine>
        <FunctionBody
          {...sharedProps}
          callbackResultComponent={
            <span>
              { returnTypeComponent }
              <span> {'res'} </span>
            </span>
          }
        />
      </CodeLine>
    </span>
  )
}

type Props = {
  signature: CvFnSignatureT,
  fnName: string,
  hasAsync: boolean
}

const FlexContainer = styled.div`
  display: flex;
`

const ReturnValue = styled.span`
  display: flex;
  justify-content: space-between;
`

export default ({ signature, fnName, hasAsync } : Props) => {
  const { returnValues } = signature
  const hasReturnVal = returnValues && returnValues.length
  const useResultAlias = hasReturnVal && returnValues.length > 2

  const returnTypeComponent = (
    !hasReturnVal
      ? <Void />
      : useResultAlias
        ? <Result />
        : <Type {...returnValues[0]} />
  )

  const syncFunctionSignatureProps = {
    signature,
    fnName
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
      <FlexContainer>
        <div>
          <CodeLine>
            {
              <ReturnValue>
                { returnTypeComponent }
                <Colon />
              </ReturnValue>
            }
          </CodeLine>
          {
            hasAsync
            ? ([
              <CodeLine>
                <ReturnValue>
                  <PromiseType>
                    { returnTypeComponent }
                  </PromiseType>
                  <Colon />
                </ReturnValue>
              </CodeLine>,
              <CodeLine>
                {
                  <ReturnValue>
                    <Void />
                    <Colon />
                  </ReturnValue>
                }
              </CodeLine>
            ]) : null
          }
        </div>
        <div>
          <CodeLine>
            <FunctionBody {...syncFunctionSignatureProps} />
          </CodeLine>
          {
            hasAsync
              ? <AsyncFunctionSignatures {...asyncFunctionSignaturesProps} />
              : null
          }
        </div>
      </FlexContainer>
    </Code>
  )
}
