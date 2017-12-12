/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvModuleT } from '@/types/CvModule'
import type { CvClassWithFnsT } from '@/types/CvClassWithFns'
import type { CvFnT } from '@/types/CvFn'
import type { CvFnSignatureT } from '@/types/CvFnSignature'
import type { CvFnBodyT } from '@/types/CvFnBody'
import type { ConstructorT } from '@/types/Constructor'
import type { DeclarationT } from '@/types/Declaration'

import Anchor from '@/pages/components/Anchor'

const FnHeading = styled.h4`
`

const HLine = styled.div`
  padding: 20px 5px;
  border-bottom: 1px solid #c6c6c6;
`

const Code = styled.div`
  background: #fafafa;
  color: #24292e;
  font-size: 14px;
  padding: 5px;
  margin-bottom: 5px;
  overflow-x: auto;
`

const CodeLine = styled.div`
  padding-bottom: 5px;
  white-space: nowrap;
  margin-bottom: ${props => props.marginBottom || 0}
`

const ModuleDocs = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
`

const ModuleDocsHeader = styled.h3`
  padding: 0 10px;
  background: #424242;
  color: #ffffff;
  margin: 0;
`

const ModuleDocsBody = styled.div`
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
`

const ParamName = styled.span`
`

const FnName = styled.span`
  color: #6f42c1;
`

const ClassType = styled.span`
  color: #005cc5;
  cursor: pointer;
`

const Type = styled.span`
  color: #d73a49;
`

const KeyWord = styled.span`
  color: #d73a49;
`

const Constant = styled.span`
  color: #005cc5;
`

const Result = styled.span`
  color: #d29f04;
`

const renderArrayOrComponent = (arrayDepth, component) => (
  arrayDepth
    ? <span> [ { renderArrayOrComponent(arrayDepth - 1, component) } ] </span>
    : component
)

const isClassType = type => type[0].toUpperCase() === type[0]

const renderTypeOrClassType = (type: string, children = `${type}`) => (
  isClassType(type)
    ? <ClassType> { children } </ClassType>
    : <Type> { children } </Type>
)

const renderType = ({ type, arrayDepth, numArrayElements }) =>
  renderArrayOrComponent(
    arrayDepth,
    renderTypeOrClassType(
      type,
      `${numArrayElements ? `${numArrayElements} ` : ''}${type}`
    )
  )

const renderJSONFieldWithType = decl => (
  <span>
    <ParamName> { decl.name } </ParamName>
    <span> { ': ' } </span>
    { renderType(decl) }
  </span>
)

const appendSeperatingComma = (idx: number, arr: Array<any>) => (
  idx < arr.length - 1
    ? <span> { ', ' } </span>
    : null
)

const renderInlineJSONObject = fields => (
  <span>
    { '{' }
    {
      fields.map((decl, idx, allTypes) => (
        <span>
          { renderJSONFieldWithType(decl) }
          { appendSeperatingComma(idx, allTypes) }
        </span>
      ))
    }
    { '}' }
  </span>
)

const renderResult = () => <Result> { 'Result' } </Result>

const renderDeclaration = (decl, idx, allParams) => (
  <span>
    { renderType(decl) }
    { <ParamName> { decl.name } </ParamName> }
    { decl.defaultValue !== undefined ? <span> { ' = ' } </span> : null }
    { decl.defaultValue !== undefined ? <Constant> { decl.defaultValue } </Constant> : null }
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

const renderSyncFunctionBody = (signature: CvFnBodyT, fnName: string) => (
  <span>
    { <FnName> { fnName } </FnName> }
    { '(' }
    { renderParamList(signature) }
    { ')' }
  </span>
)

const renderCallback = (renderReturnValue: void => any) => (
  <span>
    { 'callback'}
    { '(' }
    <Type> { 'Error' } </Type>
    { renderReturnValue() }
    { ')' }
  </span>
)

const renderCallbackedFunctionSignature = (signature: CvFnBodyT, fnName: string, renderReturnValue: void => any) => (
  <CodeLine>
    { <FnName> { fnName } </FnName> }
    { '(' }
    { renderParamList({ requiredArgs: signature.requiredArgs, optionalArgs: [] }) }
    {
      signature.requiredArgs.length
        ? (<span> { ', ' } </span>)
        : null
    }
    {
      signature.optionalArgs.length
        ? (
          <span>
            <span> { '...opts' } </span>
            <span> { ', ' } </span>
          </span>
        )
        : null
    }
    { renderCallback(renderReturnValue) }
    { ')' }
  </CodeLine>
)

const renderSyncFunctionSignature = (signature: CvFnSignatureT, fnName: string, renderReturnValue: void => any) => (
  <CodeLine>
    { renderReturnValue() }
    { renderSyncFunctionBody(signature, fnName) }
  </CodeLine>
)

const renderFunctionSignature = (signature: CvFnSignatureT, fnName: string, hasAsync: boolean) => {
  const { returnValues } = signature

  const hasReturnVal = returnValues && returnValues.length
  const hasJSONReturnVal = hasReturnVal && returnValues.length > 2
  const renderReturnValueFunc = !hasReturnVal
    ? () => null
    : () => (
      hasJSONReturnVal
        ? renderResult()
        : renderType(returnValues[0])
    )

  return (
    <Code>
      {
        hasJSONReturnVal
          ? (
            <CodeLine marginBottom="5px">
              { renderResult() }
              { ' = ' }
              { renderInlineJSONObject(returnValues)}
            </CodeLine>
            )
          : null
      }
      {
        renderSyncFunctionSignature(
          signature,
          fnName,
          () => (
            <span>
              { renderReturnValueFunc() }
              { hasReturnVal ? ' : ' : null }
            </span>
          )
        )
      }
      {
        hasAsync
          && renderSyncFunctionSignature(
            signature,
            `${fnName}Async`,
            () => (
              hasReturnVal
                ? (
                  <span>
                    <Type> { 'Promise' } </Type>
                    { '<' }
                    { renderReturnValueFunc() }
                    { '>' }
                    { ' : ' }
                  </span>
                  )
                : null
            )
          )
      }
      {
        hasAsync
          && renderCallbackedFunctionSignature(
              signature,
              `${fnName}Async`,
              () => (
                <span>
                  { hasReturnVal ? ', ' : null }
                  { renderReturnValueFunc() }
                </span>
              )
            )
      }
    </Code>
  )
}
const renderFunctions = (fns: Array<CvFnT>) =>
  fns.map(fn => (
    <div key={fn.fnName}>
      <Anchor name={fn.fnName} />
      <FnHeading> {fn.fnName} </FnHeading>
      { fn.signatures.map(s => renderFunctionSignature(s, fn.fnName, fn.hasAsync))}
    </div>
  ))

const Indent = styled.span`
  padding: 0 10px;
`

const renderAccessors = (fields: Array<DeclarationT>, className: string) => (
  <div>
    <h3> { 'accessors' } </h3>
    <Code>
      <CodeLine>
        { renderTypeOrClassType(className) }
        { ' {' }
      </CodeLine>
      {
        fields.map((f, idx, arr) => (
          <CodeLine>
            <Indent />
            { renderJSONFieldWithType(f) }
            { appendSeperatingComma(idx, arr) }
          </CodeLine>
        ))
      }
      <CodeLine>
        { '}' }
      </CodeLine>
    </Code>
  </div>
)

const renderConstructors = (constructors: Array<ConstructorT>, className: string) => (
  <div>
    <h3> { 'constructors' } </h3>
    {
      constructors.map(c => (
        <Code>
          <CodeLine>
            <span>
              { renderTypeOrClassType(c.returnsOther || className) }
              { ' : ' }
              <KeyWord> { 'new' } </KeyWord>
              { renderSyncFunctionBody(c, className) }
            </span>
          </CodeLine>
        </Code>
      ))
    }
  </div>
)

const renderClassInfo = (cvClassWithFns: CvClassWithFnsT) => (
  <div>
    <Anchor name={cvClassWithFns.className} />
    <h2> { cvClassWithFns.className } </h2>
    {
      cvClassWithFns.fields.length
        && renderAccessors(cvClassWithFns.fields, cvClassWithFns.className)
    }
    {
      cvClassWithFns.constructors.length
        && renderConstructors(cvClassWithFns.constructors, cvClassWithFns.className)
    }
    { cvClassWithFns.classFns.length ? <h3> { 'functions' } </h3> : null }
    { renderFunctions(cvClassWithFns.classFns) }
  </div>
)

type Props = {
  cvModule: string,
  cvModuleDocs: CvModuleT
}

export default ({ cvModule, cvModuleDocs } : Props) => (
  <ModuleDocs>
    <ModuleDocsHeader>
      { cvModule }
    </ModuleDocsHeader>
    <ModuleDocsBody>
      {
        cvModuleDocs.cvClasses
          .map(renderClassInfo)
          .map(el => (
            <div>
              { el }
              <HLine />
            </div>
          ))
      }
      <h2> { `${cvModule} functions` } </h2>
      { renderFunctions(cvModuleDocs.cvFns) }
    </ModuleDocsBody>
  </ModuleDocs>
)
