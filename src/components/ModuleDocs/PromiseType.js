/* @flow */

import React from 'react'
import styled from 'styled-components'

import TypeS from './TypeS'

const CompactText = styled.span`
  display: inline-flex;
`

type Props = {
  children: any
}

export default ({ children } : Props) => (
  <CompactText>
    <TypeS> { 'Promise' } </TypeS>
    { '<' }
    { children }
    { '>' }
  </CompactText>
)
