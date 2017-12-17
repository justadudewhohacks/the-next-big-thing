/* @flow */

import React from 'react'

import type { CategorizedCvFnsT } from 'types/CategorizedCvFns'
import type { CvClassWithFnsT } from 'types/CvClassWithFns'

import Anchor from '../Anchor'
import AccessorsSection from './AccessorsSection'
import ConstructorsSection from './ConstructorsSection'
import FunctionsSection from './FunctionsSection'

const FunctionCategory = ({ categorizedFns, anchorHashPrefix } : { categorizedFns: CategorizedCvFnsT, anchorHashPrefix: string }) => (
  <FunctionsSection
    anchorHashPrefix={anchorHashPrefix}
    fns={categorizedFns.fns}
    heading={categorizedFns.category === 'default' ? 'functions' : categorizedFns.category}
  />
)

type Props = {
  cvClassWithFns: CvClassWithFnsT
}

export default ({ cvClassWithFns }: Props) => {
  const { className, fields, constructors, classFnsByCategory } = cvClassWithFns
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
        classFnsByCategory.map(categorizedFns => (
          categorizedFns.fns.length
            ? (
              <FunctionCategory
                categorizedFns={categorizedFns}
                anchorHashPrefix={`${className}-`}
              />
            )
            : null
        ))
      }
    </div>
  )
}
