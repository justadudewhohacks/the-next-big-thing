/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvFnBodyT } from 'types/CvFnBody'

import joinComponents from './joinComponents'

import Comma from './Comma'
import Declaration from './Declaration'

const FnName = styled.span`
  color: #6f42c1;
`

const FnBody = ({ fnName, children } : { fnName: string, children: any }) => (
  <span>
    { <FnName> { fnName } </FnName> }
    { '(' }
    { children }
    { ')' }
  </span>
)

const Opts = () => <span> { '...opts' } </span>

const Callback = ({ resultComponent } : { resultComponent: any }) => (
  <FnBody fnName="callback">
    {
      joinComponents(
        [{ type: 'Error', name: 'err' }]
          .map(arg => <Declaration declaration={arg} />)
          .concat(resultComponent || []),
        <Comma />
      )
    }
  </FnBody>
)

const getAppendedComponents = (signature: CvFnBodyT, callbackResultComponent?: any = null) => (
  callbackResultComponent
    ? (
      (signature.optionalArgs.length ? [<Opts />] : [])
        .concat(<Callback resultComponent={callbackResultComponent} />)
    )
    : []
)

type Props = {
  signature: CvFnBodyT,
  fnName: string,
  callbackResultComponent?: any
}

const FunctionBody = ({ signature, fnName, callbackResultComponent = null } : Props) => (
  <FnBody fnName={fnName}>
    {
      joinComponents(
        signature.requiredArgs
          .concat(signature.optionalArgs)
          .map(arg => <Declaration declaration={arg} />)
          .concat(getAppendedComponents(signature, callbackResultComponent)),
        <Comma />
      )
    }
  </FnBody>
)

FunctionBody.defaultProps = {
  callbackResultComponent: null
}

export default FunctionBody
