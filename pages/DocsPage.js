/* @flow */

import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvModuleT } from '@/types/CvModule'

import ApiTree from './components/ApiTree'
import ModuleDocs from './components/ModuleDocs'

const PageContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 100%;
  max-width: 680px;
  overflow-y: auto;
`

type Query = {
  apiTree: Array<CvModuleTreeT>,
  cvModuleDocs: CvModuleT,
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
        <ModuleDocs
          cvModuleDocs={query.cvModuleDocs}
          cvModule={query.cvModule}
        />
      </Content>

    </PageContainer>
  )
}

