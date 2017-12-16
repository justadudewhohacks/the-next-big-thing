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

export default ({ cvClassWithFns }: Props) => {
  const { className, fields, constructors, classFns } = cvClassWithFns
  return (
    <div>
      <Anchor name={className} />
      <h2> { className } </h2>
      {
        fields.length
          ? <AccessorsSection {...cvClassWithFns} />
          : null
      }
      {
        constructors.length
          ? (
            <ConstructorsSection
              constructors={constructors}
              className={className}
            />
          )
          : null
      }
      {
        classFns.length
          ? (
            <FunctionsSection
              anchorHashPrefix={`${className}-`}
              fns={classFns}
              heading="functions"
            />
          )
          : null
      }
    </div>
  )
}
