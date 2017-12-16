/* @flow */

import React from 'react'
import styled from 'styled-components'

import TypeS from './TypeS'

const ClassType = styled.span`
  color: #005cc5;
  cursor: pointer;
`

const renderArrayOrComponent = (arrayDepth?: number, component: any) => (
  arrayDepth
    ? <span> [ { renderArrayOrComponent(arrayDepth - 1, component) } ] </span>
    : component
)

const isClassType = type => type[0].toUpperCase() === type[0]

const renderTypeOrClassType = (type: string, children: any = `${type}`) => (
  isClassType(type)
    ? <ClassType> { children } </ClassType>
    : <TypeS> { children } </TypeS>
)

export type TypeProps = {
  type: string,
  arrayDepth?: number,
  numArrayElements?: number
}

export default ({ type, arrayDepth, numArrayElements } : TypeProps) =>
  renderArrayOrComponent(
    arrayDepth,
    renderTypeOrClassType(
      type,
      `${numArrayElements ? `${numArrayElements} ` : ''}${type}`
    )
  )
