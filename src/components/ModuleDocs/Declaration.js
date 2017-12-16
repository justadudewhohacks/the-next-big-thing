/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { ArgT } from 'types/Arg'

import Type from './Type'

const ParamName = styled.span`
`

const Constant = styled.span`
  color: #005cc5;
`

type Props = {
  declaration: ArgT,
  isJSON?: boolean
}

const Declaration = ({ declaration, isJSON = false }: Props) => {
  const { name, defaultValue } = declaration
  return (
    isJSON
      ? (
        <span>
          <ParamName> { name } </ParamName>
          <span> { ': ' } </span>
          <Type {...declaration} />
        </span>
      )
      : (
        <span>
          <Type {...declaration} />
          { <ParamName> { name } </ParamName> }
          { defaultValue !== undefined ? <span> { ' = ' } </span> : null }
          { defaultValue !== undefined ? <Constant> { defaultValue } </Constant> : null }
        </span>
      )
  )
}

Declaration.defaultProps = {
  isJSON: false
}

export default Declaration
