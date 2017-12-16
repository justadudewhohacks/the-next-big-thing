/* @flow */

import React from 'react'

import TypeS from './TypeS'

type Props = {
  children: any
}

export default ({ children } : Props) => (
  <span>
    <TypeS> { 'Promise' } </TypeS>
    { '<' }
    { children }
    { '>' }
    { ' : ' }
  </span>
)
