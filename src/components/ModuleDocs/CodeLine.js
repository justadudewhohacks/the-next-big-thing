import styled from 'styled-components'

export default styled.div`
  padding: ${props => (props.noPadding ? 0 : 5)}px;
  white-space: nowrap;
  margin-bottom: ${props => props.marginBottom || 0}
`
