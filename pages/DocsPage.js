/* @flow */

import React from 'react'
import styled from 'styled-components'
import ApiTree from './components/ApiTree'
import CvModuleDocs from './components/CvModuleDocs'

import type { ModuleTree, FnsByOwner } from '../../types'


const PageContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
`

type Query = {
  apiTree: Array<ModuleTree>,
  cvModuleFns: FnsByOwner,
  cvModule: string
}

export default ({ url: { query } } : { url: { query: Query } }) => {
  return (
    <PageContainer>
      <ApiTree apiTree={query.apiTree} />
      <Content>
        <CvModuleDocs fns={query.cvModuleFns} cvModule={query.cvModule} />
        Lorem isafjdsogjfdiuhgpo odf jg dfj ewuifhdui ohdfui
      </Content>

    </PageContainer>
  )
}

