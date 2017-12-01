import React from 'react'
import styled from 'styled-components'
import ApiTree from './components/ApiTree'
import CvModuleDocs from './components/CvModuleDocs'

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

export default ({ url: { query: { apiTree, cvModuleFns } } }) => (
  <PageContainer>
    <ApiTree apiTree={apiTree} />
    <Content>
      <CvModuleDocs fns={cvModuleFns} />
      Lorem isafjdsogjfdiuhgpo odf jg dfj ewuifhdui ohdfui
    </Content>

  </PageContainer>
)
