import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import CollapsibleList from './CollapsibleList'

const listCss = css`
  list-style: none;
  margin: 0;
  padding: 0 8px;
`

const listItemCss = css`
  padding: 4px;
  cursor: pointer;
  a {
    color: inherit;
    text-decoration: none;
    display: block;
  }
`

const classListItemsCss = css`
  ${listCss}
`

const classListHeaderCss = css`
  ${listItemCss}
  font-size: 18px;
  padding: 4px;
`

const moduleListItemsCss = css`
  ${listCss}
`
const moduleListHeaderCss = css`
  ${listItemCss}
  font-size: 18px;
  padding: 4px;
  background: #424242;
  color: #fafafa;
`

const FunctionItem = styled.li`
  ${listItemCss}
`

const ClassList = styled.ul`
  ${listCss}
`

const ApiTree = styled.ul`
  ${listCss}
  font-size: 12px;
  padding: 0;
  width: 250px;
  min-width: 250px;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

const renderFunctionItem = fn => (
  <FunctionItem key={fn}>
    <Link href={`#${fn}`}>
      { fn }
    </Link>
  </FunctionItem>
)

const renderClassList = clazzes => (
  <ClassList>
    {
      clazzes.map(clazz => (
        <CollapsibleList
          key={clazz.className}
          header={clazz.className}
          headerCss={classListHeaderCss}
          itemsCss={classListItemsCss}
        >
          { clazz.fns.map(renderFunctionItem) }
        </CollapsibleList>
      ))
    }
  </ClassList>
)

export default ({ apiTree }) => (
  <ApiTree>
    {
      apiTree.map(cvModule => (
        <CollapsibleList
          key={cvModule.cvModule}
          header={cvModule.cvModule}
          headerCss={moduleListHeaderCss}
          itemsCss={moduleListItemsCss}
        >
          { renderClassList(cvModule.clazzes) }
          { cvModule.fns.map(renderFunctionItem) }
        </CollapsibleList>
      ))
    }
  </ApiTree>
)
