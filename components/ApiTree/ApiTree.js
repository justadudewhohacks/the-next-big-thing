/* @flow */

import React from 'react'
import styled, { css } from 'styled-components'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvClassInfoT } from '@/types/CvClassInfo'

import CollapsibleList from '../CollapsibleList'
import SearchField from '../SearchField'

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

const ModuleList = styled.ul`
  ${listCss}
  font-size: 14px;
  padding: 0;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

const ApiTree = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const renderFunctionItem = (cvModule: string, fn: string) => (
  <FunctionItem key={fn}>
    <a href={`/docs/${cvModule}#${fn}`}>
      { fn }
    </a>
  </FunctionItem>
)

const renderClassHeader = (cvModule: string, className: string) => (
  <ClassHeader href={`/docs/${cvModule}#${className}`}>
    { className }
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

  shouldComponentUpdate(props: Props) : boolean {
    // TODO
    return props !== this.props
  }

  getFilteredApiTree() : Array<CvModuleTreeT> {
    if (!this.state.searchValue) {
      return this.props.apiTree
    }

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
                itemsCss={moduleListItemsCss}
              >
                { renderClassList(cvModule.cvModule, cvModule.cvClasses) }
                { cvModule.cvFnNames.map(fnName => renderFunctionItem(cvModule.cvModule, fnName)) }
              </CollapsibleList>
            ))
          }
        </ModuleList>
      </ApiTree>
    )
  }
}
