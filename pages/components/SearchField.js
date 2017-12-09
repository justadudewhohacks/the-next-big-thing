/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string,
  onInputChanged: string => any
}

const SearchField = styled.div`
  display: flex;
  padding: 5px;

  input {
    flex: 1;
  }

  i {
    margin-left: 5px;
  }
`

export default ({ value, onInputChanged } : Props) => (
  <div>
    <SearchField>
      <input
        placeHolder="Search"
        value={value}
        onChange={e => onInputChanged(e.target.value)}
      />
      <i className="material-icons"> {'search'} </i>
    </SearchField>
  </div>
)
