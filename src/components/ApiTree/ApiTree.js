/* @flow */

import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import type { CvModuleTreeT } from 'types/CvModuleTree'
import type { CvClassInfoT } from 'types/CvClassInfo'

import CollapsibleList from '../CollapsibleList'

const listCss = css`
  list-style: none;
  margin: 0;
  padding: 0 0px;
`

const listItemCss = css`
  cursor: pointer;
  a {
    padding: 4px;
    color: inherit;
    text-decoration: none;
    display: block;
  }
`

const classListItemsCss = css`
  ${listCss}
  padding: 0 8px;
`

const classListHeaderCss = css`
  ${listItemCss}
  font-size: 18px;
  font-weight: bold;
`

const moduleListItemsCss = css`
  ${listCss}
`
const moduleListHeaderCss = css`
  ${listItemCss}
  padding: 4px;
  font-size: 18px;
  background: #424242;
  color: #fafafa;
`

const ClassHeader = styled.a`
  flex: 1;
`

const FunctionItem = styled.li`
  ${listItemCss}
`

const ClassList = styled.ul`
  ${listCss}
`

const ApiTree = styled.ul`
  ${listCss}
  font-size: 14px;
  padding: 0;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

const renderFunctionItem = (cvModule: string, fn: string) => (
  <FunctionItem key={fn}>
    <Link
      prefetch
      href={`/docs?cvModule=${cvModule}`}
      as={`/docs/${cvModule}#${fn}`}
    >
      { fn }
    </Link>
  </FunctionItem>
)

const renderClassHeader = (cvModule: string, className: string) => (
  <ClassHeader >
    <Link
      prefetch
      href={`/docs?cvModule=${cvModule}`}
      as={`/docs/${cvModule}#${className}`}
    >
      { className }
    </Link>
  </ClassHeader>
)

const renderClassList = (cvModule: string, clazzes : Array<CvClassInfoT>) => (
  <ClassList>
    {
      clazzes.map(clazz => (
        <CollapsibleList
          key={clazz.className}
          renderHeaderText={() => renderClassHeader(cvModule, clazz.className)}
          headerCss={classListHeaderCss}
          itemsCss={classListItemsCss}
          isCollapsible={clazz.classFnNames.length > 5}
        >
          { clazz.classFnNames.map(fnName => renderFunctionItem(cvModule, fnName)) }
        </CollapsibleList>
      ))
    }
  </ClassList>
)

type Props = {
  apiTree: Array<CvModuleTreeT>
}

export default class extends React.Component<Props> {
  shouldComponentUpdate(props: Props) : boolean {
    const hasChanged = props.apiTree !== this.props.apiTree
    console.log('shouldComponentUpdate ApiTree?', hasChanged)
    return hasChanged
  }

  componentDidUpdate() {
    console.log('componentDidUpdate ApiTree')
  }

  componentDidMount() {
    console.log('componentDidMount ApiTree')
  }

  render() : any {
    console.log('render ApiTree')
    return (
      <ApiTree>
        {
          this.props.apiTree.map(cvModule => (
            <CollapsibleList
              key={cvModule.cvModule}
              renderHeaderText={() => cvModule.cvModule}
              headerCss={moduleListHeaderCss}
              itemsCss={moduleListItemsCss}
            >
              { renderClassList(cvModule.cvModule, cvModule.cvClasses) }
              { cvModule.cvFnNames.map(fnName => renderFunctionItem(cvModule.cvModule, fnName)) }
            </CollapsibleList>
          ))
        }
      </ApiTree>
    )
  }
}
