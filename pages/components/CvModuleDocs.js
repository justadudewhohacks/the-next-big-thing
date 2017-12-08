/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { FnSignature, Fn, CvModule, CvModuleClassInfo } from '../../types'
import Anchor from './Anchor'

const FnHeading = styled.h4`
`

const FnName = styled.span`
  color: #005cc5;
`

const Code = styled.div`
  background: #fafafa;
  color: #24292e;
  font-size: 12px;
  padding: 5px;
  overflow-x: auto;
`

const CodeLine = styled.div`
  padding-bottom: 2px;
  white-space: nowrap;
`

const CvModuleDocs = styled.ul`
  padding: 10px;
  margin: 0;
`

const ParamName = styled.span`
`

const Type = styled.span`
  color: #d73a49;
`

const renderArrayOrComponent = (arrayDepth, component) => (
  arrayDepth
    ? <span> [ { renderArrayOrComponent(arrayDepth - 1, component) } ] </span>
    : component)


const renderType = ({ type, arrayDepth, numArrayElements }) =>
  renderArrayOrComponent(
    arrayDepth,
    <Type>
      { `${numArrayElements ? `${numArrayElements} ` : ''}${type}` }
    </Type>
  )

const renderJSONFieldWithType = (decl, idx, allTypes) => (
  <span>
    <ParamName> { decl.name } </ParamName>
    <span> { ': ' } </span>
    { renderType(decl) }
    {
      idx < allTypes.length - 1
        ? <span> { ', ' } </span>
        : null
    }
  </span>
)

const renderJSONObject = fields => (
  <span>
    { '{' }
    { fields.map(renderJSONFieldWithType) }
    { '}' }
  </span>
)

const renderReturnValue = returnValues => (
  !returnValues || !returnValues.length
    ? null
    :
    <span>
      {
        returnValues.length < 2
          ? renderType(returnValues[0])
          : renderJSONObject(returnValues)
      }
      { ' : ' }
    </span>
)

const renderDeclaration = (decl, idx, allParams) => (
  <span>
    { renderType(decl) }
    { <ParamName> { decl.name } </ParamName> }
    { decl.defaultValue !== undefined ? <span> { ' = ' } </span> : null }
    { decl.defaultValue !== undefined ? <span> { decl.defaultValue } </span> : null }
    {
      idx < allParams.length - 1
        ? <span> { ', ' } </span>
        : null
    }
  </span>
)

const renderParamList = ({ requiredArgs, optionalArgs }) => (
  <span>
    { requiredArgs.concat(optionalArgs).map(renderDeclaration) }
  </span>
)

const renderSyncFunctionSignature = (signature: FnSignature, fnName: string) => (
  <CodeLine>
    { renderReturnValue(signature.returnValues) }
    { <FnName> { fnName } </FnName> }
    { '(' }
    { renderParamList(signature) }
    { ')' }
  </CodeLine>
)

const renderFunctionSignatures = (fns: Array<Fn>) =>
  fns.map(fn => (
    <li key={fn.fnName}>
      <Anchor name={fn.fnName} />
      <FnHeading> {fn.fnName} </FnHeading>
      <Code>
        { fn.signatures.map(s => renderSyncFunctionSignature(s, fn.fnName)) }
      </Code>
    </li>
  ))

const renderClassInfo = (cvModuleClassInfo: CvModuleClassInfo) => (
  <div>
    <Anchor name={cvModuleClassInfo.className} />
    <h2> { cvModuleClassInfo.className } </h2>
    { renderFunctionSignatures(cvModuleClassInfo.classFns) }
  </div>
)

type Props = {
  cvModule: string,
  cvModuleDocs: CvModule
}

export default ({ cvModule, cvModuleDocs } : Props) => (
  <CvModuleDocs>
    <h1> { cvModule } </h1>
    { cvModuleDocs.cvClasses.map(renderClassInfo) }
    <h2> { `${cvModule} functions` } </h2>
    { renderFunctionSignatures(cvModuleDocs.cvFns) }
  </CvModuleDocs>
)
