import React from 'react'
import styled from 'styled-components'

import type { ConstructorT } from 'types/Constructor'

import FunctionBody from './FunctionBody'
import Type from './Type'

import Code from './Code'
import CodeLine from './CodeLine'

const KeyWord = styled.span`
  color: #d73a49;
`

type Props = {
  constructors: Array<ConstructorT>,
  className: string
}

export default ({ constructors, className } : Props) => (
  <div>
    <h3> { 'constructors' } </h3>
    {
      constructors.map(c => (
        <Code>
          <CodeLine>
            <Type type={c.returnsOther || className} />
            { ' : ' }
            <KeyWord> { 'new' } </KeyWord>
            <FunctionBody
              signature={c}
              fnName={className}
            />
          </CodeLine>
        </Code>
      ))
    }
  </div>
)
