/* @flow */

import React from 'react'
import styled, { css } from 'styled-components'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvClassInfoT } from '@/types/CvClassInfo'

import CollapsibleList from './CollapsibleList'
import SearchField from './SearchField'

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

const ModuleList = styled.ul`
  ${listCss}
  font-size: 14px;
  padding: 0;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

const ApiTree = styled.div`
  width: 260px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
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

type State = {
  searchValue: string
}

export default class extends React.Component<Props, State> {
  getFilteredApiTree: Function
  onSearchValueChanged: Function

  constructor(props: Props) {
    super(props)
    this.getFilteredApiTree = this.getFilteredApiTree.bind(this)
    this.onSearchValueChanged = this.onSearchValueChanged.bind(this)
  }

  state = {
    searchValue: ''
  }

  getFilteredApiTree() : Array<CvModuleTreeT> {
    const filterByFnNameIncludes = fnName =>
      fnName.toLowerCase().includes(this.state.searchValue.toLowerCase())

    const isNotEmpty = arr => !!arr.length

    return this.props.apiTree.map(
      moduleTree => ({
        ...moduleTree,
        cvClasses: moduleTree.cvClasses
          .map(cvClass => ({
            ...cvClass,
            classFnNames: cvClass.classFnNames.filter(filterByFnNameIncludes)
          }))
          .filter(cvClass => isNotEmpty(cvClass.classFnNames)),
        cvFnNames: moduleTree.cvFnNames.filter(filterByFnNameIncludes)
      })
    )
  }

  onSearchValueChanged(searchValue: string) {
    this.setState({ searchValue })
  }

  render() : any {
    const { onModuleRequested } = this.props
    const apiTree = this.getFilteredApiTree()
    return (
      <ApiTree>
        <SearchField
          value={this.state.searchValue}
          onInputChanged={this.onSearchValueChanged}
        />
        <ModuleList>
          {
            apiTree.map(cvModule => (
              <CollapsibleList
                key={cvModule.cvModule}
                renderHeaderText={() => cvModule.cvModule}
                headerCss={moduleListHeaderCss}
                onClickHeaderText={() => onModuleRequested(cvModule.cvModule)}
                itemsCss={moduleListItemsCss}
              >
                { renderClassList(cvModule.cvClasses, () => onModuleRequested(cvModule.cvModule)) }
                { cvModule.cvFnNames.map(fnName => renderFunctionItem(fnName, () => onModuleRequested(cvModule.cvModule))) }
              </CollapsibleList>
            ))
          }
        </ModuleList>
      </ApiTree>
    )
  }
}
