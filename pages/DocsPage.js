/* @flow */

import React from 'react'
import Router from 'next/router';
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

const makeOnModuleRequested = (cvModule: string) =>
  (requestedModule: string) => {
    if (cvModule !== requestedModule) {
      Router.push(`/docs/${requestedModule}`)
    }
  }

export default ({ url: { query } } : { url: { query: Query } }) => {
  return (
    <PageContainer>
      <ApiTree
        apiTree={query.apiTree}
        onModuleRequested={makeOnModuleRequested(query.cvModule)}
      />
      <Content>
        <CvModuleDocs
          fns={query.cvModuleFns}
          cvModule={query.cvModule}
        />
      </Content>

    </PageContainer>
  )
}

