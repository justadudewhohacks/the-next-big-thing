import React from 'react'
import styled from 'styled-components'

import type { ArgT } from 'types/Arg'

import joinComponents from './joinComponents'

import CodeLine from './CodeLine'
import Comma from './Comma'
import Declaration from './Declaration'
import Result from './Result'

const Highlighted = styled.div`
  background: #e0e0e0;
  display: inline;
  padding: 5px;
`

type Props = {
  returnValues: Array<ArgT>
}

export default ({ returnValues } : Props) => (
  <CodeLine marginBottom="5px" noPadding>
    <Highlighted>
      <Result />
      { ' = ' }
      { '{' }
      {
        joinComponents(
          returnValues.map(decl => <Declaration declaration={decl} isJSON />),
          <Comma />
        )
      }
      { '}' }
    </Highlighted>
  </CodeLine>
)
