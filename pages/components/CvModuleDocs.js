import React from 'react'
import styled from 'styled-components'

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


const renderType = ({ type, arrayDepth, arrayElements }) =>
  renderArrayOrComponent(
    arrayDepth,
    <Type>
      { `${arrayElements ? `${arrayElements} ` : ''}${type}` }
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

const renderSyncFunctionSignature = (signature, fnName) => (
  <CodeLine>
    { renderReturnValue(signature.returnValues) }
    { <FnName> { fnName } </FnName> }
    { '(' }
    { renderParamList(signature) }
    { ')' }
  </CodeLine>
)

export default ({ fns }) => (
  <CvModuleDocs>
    {
      fns.map(fn => (
        <li key={fn.name}>
          <FnHeading> {fn.name} </FnHeading>
          <Code>
            { fn.signatures.map(s => renderSyncFunctionSignature(s, fn.name)) }
          </Code>
        </li>
      ))
    }
  </CvModuleDocs>
)
