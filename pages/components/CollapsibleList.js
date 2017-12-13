import React from 'react'
import styled from 'styled-components'

const ToggleIcon = styled.i`
  padding: 4px;
`

const ListItems = styled.ul`
  ${props => props.css}
`

const HeaderText = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
`

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  ${props => props.css}
`

type Props = {
  header: string,
  renderHeaderText: void => any,
  isCollapsible?: boolean
}

type State = {
  collapsed: boolean
}

export default class extends React.Component<Props, State> {
  toggle: Function

  static defaultProps = {
    isCollapsible: true
  }

  constructor(props: Props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  state = {
    collapsed: false
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() : any {
    const { header, renderHeaderText } = this.props
    return (
      <li key={header}>
        <ListHeader
          css={this.props.headerCss}
        >
          <HeaderText
            onClick={this.props.onClickHeaderText}
          >
            { renderHeaderText() }
          </HeaderText>
          {
            this.props.isCollapsible
            ? (
              <ToggleIcon
                onClick={this.toggle}
                className="material-icons"
              >
                {this.state.collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
              </ToggleIcon>
            )
            : null
          }
        </ListHeader>
        {
          this.state.collapsed ? null :
          <ListItems css={this.props.itemsCss}>
            { this.props.children }
          </ListItems>
        }
      </li>
    )
  }
}
