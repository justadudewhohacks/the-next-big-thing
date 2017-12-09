/* @flow */

import React from 'react'
import styled, { css } from 'styled-components'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvClassInfoT } from '@/types/CvClassInfo'

import CollapsibleList from './CollapsibleList'

const listCss = css`
  list-style: none;
  margin: 0;
  padding: 0 8px;
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

const renderFunctionItem = (fn: string, onLinkClicked: string => void) => (
  <FunctionItem key={fn}>
    <a
      href={`#${fn}`}
      onClick={onLinkClicked}
    >
      { fn }
    </a>
  </FunctionItem>
)

const renderClassHeader = (cvModule: string, onLinkClicked: string => void) => (
  <a
    href={`#${cvModule}`}
    onClick={onLinkClicked}
  >
    { cvModule }
  </a>
)

const renderClassList = (clazzes : Array<CvClassInfoT>, onLinkClicked: string => void) => (
  <ClassList>
    {
      clazzes.map(clazz => (
        <CollapsibleList
          key={clazz.className}
          renderHeaderText={() => renderClassHeader(clazz.className, onLinkClicked)}
          headerCss={classListHeaderCss}
          itemsCss={classListItemsCss}
        >
          { clazz.classFnNames.map(fnName => renderFunctionItem(fnName, onLinkClicked)) }
        </CollapsibleList>
      ))
    }
  </ClassList>
)

type Props = {
  apiTree: Array<CvModuleTreeT>,
  onModuleRequested: string => void
}

export default ({ apiTree, onModuleRequested }: Props) => (
  <ApiTree>
    {
      apiTree.map(cvModule => (
        <CollapsibleList
          key={cvModule.cvModule}
          renderHeaderText={() => cvModule.cvModule}
          headerCss={moduleListHeaderCss}
          onClickHeaderText={() => onModuleRequested(cvModule.cvModule)}
          itemsCss={moduleListItemsCss}
        >
          {
            renderClassList(cvModule.cvClasses, () => onModuleRequested(cvModule.cvModule))
          }
          { cvModule.cvFnNames.map(fnName => renderFunctionItem(fnName, () => onModuleRequested(cvModule.cvModule))) }
        </CollapsibleList>
      ))
    }
  </ApiTree>
)
