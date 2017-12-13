/* @flow */

import React from 'react'
import styled from 'styled-components'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvModuleT } from '@/types/CvModule'

import ApiTree from './components/ApiTree'
import ModuleDocs from './components/ModuleDocs'

const PageWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: auto;
  left: 0;
  right: 0;
`

const Navbar = styled.div`
`

const MainContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

const MenuIcon = styled.i`
  font-size: 32px;
  padding: 4px;
  margin-right: 4px;
  cursor: pointer;
  display: none;
  @media (max-width: 780px) {
    display: inherit;
  }
`

const ContentHeader = styled.div`
  position: relative;
  font-size: 24px;
  background: #424242;
  color: #ffffff;
  padding: 4px;
  display: flex;
  align-items: center;
`

const Menu = styled.div`
  height: 100%;
  min-width: 260px;
  max-width: 260px;
  overflow-x: hidden;
  background: #fafafa;
  z-index: 1;
  transition: transform 100ms ease-out;
  transform: translate(${props => props.translateX}px);
  @media (max-width: 780px) {
    position: absolute;
    left: 0;
  }
`

type Props = {
  url: {
    query: {
      apiTree: Array<CvModuleTreeT>,
      cvModuleDocs: CvModuleT,
      cvModule: string
    }
  }
}

type State = {
  isMenuVisible: boolean,
  isMobileView: boolean
}

const maxMobileWidth = 780

export default class extends React.Component<Props, State> {
  toggleMenu: Function


  constructor(props: Props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.onWindowResized = this.onWindowResized.bind(this)
  }

  state = {
    isMenuVisible: true,
    isMobileView: false
  }

  componentDidMount() {
    this.onWindowResized();
    window.addEventListener('resize', this.onWindowResized);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResized);
  }

  onWindowResized() {
    if (!this.state.isMobileView && window.innerWidth < maxMobileWidth) {
      this.setState({
        isMobileView: true,
        isMenuVisible: false
      })
    }

    if (this.state.isMobileView && maxMobileWidth <= window.innerWidth) {
      this.setState({
        isMobileView: false
      })
    }
  }

  toggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  render() : any {
    console.log('render')
    const { query } = this.props.url
    return (
      <PageWrapper>
        <PageContainer>
          <Navbar>
            <MenuIcon
              className="material-icons"
              onClick={this.toggleMenu}
            >
              { 'menu' }
            </MenuIcon>
          </Navbar>
          <MainContainer>
            <Menu translateX={this.state.isMenuVisible || !this.state.isMobileView ? 0 : -260}>
              <ApiTree
                apiTree={query.apiTree}
              />
            </Menu>
            <Content>
              <div>
                <ContentHeader>
                  <span> { query.cvModule } </span>
                </ContentHeader>
              </div>
              <ModuleDocs
                cvModuleDocs={query.cvModuleDocs}
                cvModule={query.cvModule}
              />
            </Content>
          </MainContainer>
        </PageContainer>
      </PageWrapper>
    )
  }
}

