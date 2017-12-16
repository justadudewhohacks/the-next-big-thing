import React from 'react'

import type { ArgT } from 'types/Arg'

import joinComponents from './joinComponents'

import CodeLine from './CodeLine'
import Comma from './Comma'
import Declaration from './Declaration'
import Result from './Result'

type Props = {
  returnValues: Array<ArgT>
}

export default ({ returnValues } : Props) => (
  <CodeLine marginBottom="5px">
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
  </CodeLine>
)
