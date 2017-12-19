/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvModuleT } from 'types/CvModule'

import joinComponents from './joinComponents'

import ClassSection from './ClassSection'
import FunctionsSection from './FunctionsSection'

const HLine = styled.div`
  padding: 20px 5px;
  border-bottom: 1px solid #c6c6c6;
`

const ModuleDocs = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
`

type Props = {
  cvModule: string,
  cvModuleDocs: CvModuleT
}

export default class extends React.Component<Props> {
  shouldComponentUpdate(props: Props) : boolean {
    return props.cvModule !== this.props.cvModule
  }

  render() : any {
    const { cvModuleDocs, cvModule } = this.props
    return (
      <ModuleDocs>
        {
          joinComponents(
            cvModuleDocs.cvClasses
              .map(cvClassWithFns => <ClassSection cvClassWithFns={cvClassWithFns} />),
            <HLine />
          )
        }
        {
          cvModuleDocs.cvFns.length ? (
            <FunctionsSection
              fns={cvModuleDocs.cvFns}
              heading={`${cvModule} functions`}
            />
          ) : null
        }
      </ModuleDocs>
    )
  }
}
