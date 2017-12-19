/* @flow */

import React from 'react'
import styled, { css } from 'styled-components'

import type { CvModuleTreeT } from 'types/CvModuleTree'
import type { CvClassInfoT } from 'types/CvClassInfo'

import CollapsibleList from '../CollapsibleList'
import HashableLink from '../HashableLink'

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

const ClassHeader = styled.div`
  flex: 1;
`

const FunctionItem = styled.li`
  ${listItemCss}
`

const CategoryHeader = styled.li`
  ${listItemCss}
  margin-top: 5px;
  font-weight: bold;
  cursor: default;
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

const renderFunctionItem = (cvModule: string, fn: string, onLinkClicked: void => void, anchorHashPrefix?: string = '') => (
  <FunctionItem key={fn}>
    <HashableLink
      href={`/docs?cvModule=${cvModule}`}
      as={`/docs/${cvModule}#${anchorHashPrefix}${fn}`}
      onClick={onLinkClicked}
    >
      { fn }
    </HashableLink>
  </FunctionItem>
)

const renderClassHeader = (cvModule: string, className: string, onLinkClicked: void => void) => (
  <ClassHeader >
    <HashableLink
      href={`/docs?cvModule=${cvModule}`}
      as={`/docs/${cvModule}#${className}`}
      onClick={onLinkClicked}
    >
      { className }
    </HashableLink>
  </ClassHeader>
)

const renderClassList = (cvModule: string, clazzes : Array<CvClassInfoT>, onLinkClicked: void => void) => (
  <ClassList>
    {
      clazzes.map(clazz => (
        <CollapsibleList
          key={clazz.className}
          renderHeaderText={() => renderClassHeader(cvModule, clazz.className, onLinkClicked)}
          headerCss={classListHeaderCss}
          itemsCss={classListItemsCss}
          isCollapsible={clazz.classFnNamesByCategory.reduce((numFns, fns) => numFns + fns.classFnNames.length, 0) > 5}
        >
          {
            clazz.classFnNamesByCategory.map(categorizedFns => (
              <div>
                <CategoryHeader>
                  { categorizedFns.category === 'default' ? 'functions' : categorizedFns.category }
                </CategoryHeader>
                {
                  categorizedFns.classFnNames.map(fnName =>
                    renderFunctionItem(cvModule, fnName, onLinkClicked, `${clazz.className}-`)
                  )
                }
              </div>
            ))
          }
        </CollapsibleList>
      ))
    }
  </ClassList>
)

type Props = {
  apiTree: Array<CvModuleTreeT>,
  onLinkClicked: void => void
}

export default class extends React.Component<Props> {
  shouldComponentUpdate(props: Props) : boolean {
    return props.apiTree !== this.props.apiTree
  }

  render() : any {
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
              { renderClassList(cvModule.cvModule, cvModule.cvClasses, this.props.onLinkClicked) }
              { cvModule.cvFnNames.map(fnName => renderFunctionItem(cvModule.cvModule, fnName, this.props.onLinkClicked)) }
            </CollapsibleList>
          ))
        }
      </ApiTree>
    )
  }
}
