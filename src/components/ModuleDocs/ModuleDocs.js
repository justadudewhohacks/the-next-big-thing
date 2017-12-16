/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvModuleT } from 'types/CvModule'
import type { CvClassWithFnsT } from 'types/CvClassWithFns'
import type { CvFnT } from 'types/CvFn'
import type { CvFnSignatureT } from 'types/CvFnSignature'

import joinComponents from './joinComponents'

import Accessors from './Accessors'
import Constructors from './Constructors'
import Type from './Type'
import Declaration from './Declaration'
import Anchor from '../Anchor'
import Comma from './Comma'
import FunctionBody from './FunctionBody'

import Code from './Code'
import CodeLine from './CodeLine'
import TypeS from './TypeS'

const FnHeading = styled.h4`
`

const HLine = styled.div`
  padding: 20px 5px;
  border-bottom: 1px solid #c6c6c6;
`

const ModuleDocs = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
`

const ModuleDocsBody = styled.div`
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
`

const Result = styled.span`
  color: #d29f04;
`

const renderResult = () => <Result> { 'Result' } </Result>

const renderSyncFunctionSignature = (signature: CvFnSignatureT, fnName: string, renderReturnValue: void => any) => (
  <CodeLine>
    { renderReturnValue() }
    <FunctionBody
      signature={signature}
      fnName={fnName}
    />
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
        : <Type {...returnValues[0]} />
    )


  return (
    <Code>
      {
        hasJSONReturnVal
          ? (
            <CodeLine marginBottom="5px">
              { renderResult() }
              { ' = ' }
              { '{' }
              {
                joinComponents(
                  returnValues.map(decl => <Declaration declaration={decl} isJSON />),
                  <Comma />
                )
              }
              { '}' }
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
              <span>
                <TypeS> { 'Promise' } </TypeS>
                { '<' }
                { hasReturnVal ? renderReturnValueFunc() : '' }
                { '>' }
                { ' : ' }
              </span>
            )
          )
      }
      {
        hasAsync
          ? (
            <CodeLine>
              <FunctionBody
                signature={signature}
                fnName={`${fnName}Async`}
                callbackResultComponent={
                  <span>
                    { renderReturnValueFunc() }
                    <span> {'res'} </span>
                  </span>
                }
              />
            </CodeLine>
          )
          : null
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

type ClassDocsProps = {
  cvClassWithFns: CvClassWithFnsT
}

const ClassDocs = ({ cvClassWithFns }: ClassDocsProps) => (
  <div>
    <Anchor name={cvClassWithFns.className} />
    <h2> { cvClassWithFns.className } </h2>
    {
      cvClassWithFns.fields.length
        ? <Accessors {...cvClassWithFns} />
        : null
    }
    {
      cvClassWithFns.constructors.length
        ? (
          <Constructors
            constructors={cvClassWithFns.constructors}
            className={cvClassWithFns.className}
          />
        )
        : null
    }
    {
      cvClassWithFns.classFns.length
        ? <h3> { 'functions' } </h3>
        : null
    }
    { renderFunctions(cvClassWithFns.classFns) }
  </div>
)

type Props = {
  cvModule: string,
  cvModuleDocs: CvModuleT
}

export default ({ cvModule, cvModuleDocs } : Props) => (
  <ModuleDocs>
    <ModuleDocsBody>
      {
        joinComponents(
          cvModuleDocs.cvClasses
            .map(cvClassWithFns => <ClassDocs cvClassWithFns={cvClassWithFns} />),
          <HLine />
        )
      }
      <h2> { `${cvModule} functions` } </h2>
      { renderFunctions(cvModuleDocs.cvFns) }
    </ModuleDocsBody>
  </ModuleDocs>
)
