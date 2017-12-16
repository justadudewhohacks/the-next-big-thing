import React from 'react'
import styled from 'styled-components'

import type { DeclarationT } from 'types/Declaration'

import joinComponents from './joinComponents'

import Declaration from './Declaration'
import Type from './Type'
import Code from './Code'
import CodeLine from './CodeLine'
import Comma from './Comma'

const Indent = styled.span`
  padding: 0 4px;
`

type Props = {
  fields: Array<DeclarationT>,
  className: string
}

export default ({ fields, className } : Props) => (
  <div>
    <h3> { 'accessors' } </h3>
    <Code>
      <CodeLine>
        <Type type={className} />
        { ' {' }
      </CodeLine>
      {
        joinComponents(
          fields.map(field => <Declaration declaration={field} isJSON />),
          <Comma />
        )
          .map(c => (
            <CodeLine>
              <Indent />
              { c }
            </CodeLine>
          ))
      }
      <CodeLine>
        { '}' }
      </CodeLine>
    </Code>
  </div>
)
