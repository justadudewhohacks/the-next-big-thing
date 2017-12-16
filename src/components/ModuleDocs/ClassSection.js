/* @flow */

import React from 'react'

import type { CvClassWithFnsT } from 'types/CvClassWithFns'

import Anchor from '../Anchor'
import AccessorsSection from './AccessorsSection'
import ConstructorsSection from './ConstructorsSection'
import FunctionsSection from './FunctionsSection'

type Props = {
  cvClassWithFns: CvClassWithFnsT
}

export default ({ cvClassWithFns }: Props) => (
  <div>
    <Anchor name={cvClassWithFns.className} />
    <h2> { cvClassWithFns.className } </h2>
    {
      cvClassWithFns.fields.length
        ? <AccessorsSection {...cvClassWithFns} />
        : null
    }
    {
      cvClassWithFns.constructors.length
        ? (
          <ConstructorsSection
            constructors={cvClassWithFns.constructors}
            className={cvClassWithFns.className}
          />
        )
        : null
    }
    {
      cvClassWithFns.classFns.length
        ? <FunctionsSection fns={cvClassWithFns.classFns} heading="functions" />
        : null
    }
  </div>
)
