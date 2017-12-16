/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvFnT } from 'types/CvFn'

import Anchor from '../Anchor'
import SignaturesForFunction from './SignaturesForFunction'

const FnHeading = styled.h4`
`

type PropFn = {
  fns: Array<CvFnT>,
  heading: string,
  anchorHashPrefix?: string
}

const FunctionsSection = ({ fns, heading, anchorHashPrefix } : PropFn) => (
  <div>
    <h3> { heading } </h3>
    {
      fns.map(fn => (
        <div key={fn.fnName}>
          <Anchor name={`${anchorHashPrefix}${fn.fnName}`} />
          <FnHeading> {fn.fnName} </FnHeading>
          {
            fn.signatures.map(s => (
              <SignaturesForFunction
                signature={s}
                fnName={fn.fnName}
                hasAsync={fn.hasAsync}
              />
            ))
          }
        </div>
      ))
    }
  </div>
)

FunctionsSection.defaultProps = {
  anchorHashPrefix: ''
}

export default FunctionsSection
