import React from 'react'
import styled from 'styled-components'

const ToggleIcon = styled.i`
  margin-right: 5px;
`

const CollapsibleListItems = styled.ul`
  ${props => props.css}
`

const CollapsibleListHeader = styled.div`
  display: flex;
  align-items: center;
  ${props => props.css}
`

export default class extends React.Component {
  state = {
    collapsed: false
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { header } = this.props;
    return (
      <li key={header}>
        <CollapsibleListHeader
          css={this.props.headerCss}
          onClick={this.toggle.bind(this)}
        >
          <ToggleIcon className="material-icons">
            {this.state.collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
          </ToggleIcon>
          <span> { header } </span>
        </CollapsibleListHeader>
        {
          this.state.collapsed ? null :
          <CollapsibleListItems css={this.props.itemsCss}>
            { this.props.children }
          </CollapsibleListItems>
        }
      </li>
    )
  }
}
