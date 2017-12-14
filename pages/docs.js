/* @flow */

import React from 'react'
import styled from 'styled-components'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'

import type { CvModuleTreeT } from '@/types/CvModuleTree'
import type { CvModuleT } from '@/types/CvModule'

import ApiTree from '@/components/ApiTree'
import ModuleDocs from '@/components/ModuleDocs'

import initStore from '@/redux/store'
import { updateApiTree, cacheCvModule } from '@/redux/actions'

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
  apiTree: Array<CvModuleTreeT>,
  displayedCvModule: string,
  displayedCvModuleDocs: CvModuleT,
  isCvModuleCached: string => boolean
}

type State = {
  isMenuVisible: boolean,
  isMobileView: boolean
}

const reduxify = withRedux(
  initStore,
  (state) => {
    const { docs } = state
    const { apiTree, displayedCvModule } = docs
    const cvModules = Map(docs.cvModules)

    return ({
      apiTree,
      displayedCvModule,
      displayedCvModuleDocs: cvModules.get(displayedCvModule)
    })
  },
  dispatch => ({
    updateApiTree: bindActionCreators(updateApiTree, dispatch),
    cacheCvModule: bindActionCreators(cacheCvModule, dispatch)
  })
)

const maxMobileWidth = 780

export default reduxify(class extends React.Component<Props, State> {
  toggleMenu: Function
  onWindowResized: Function

  static getInitialProps({ req, query, store } : any) : Props {
    const isServer = !!req
    const { cvModule } = query
    if (isServer) {
      const { apiTree, cvModuleDocs } = query
      store.dispatch(updateApiTree(apiTree))
      store.dispatch(cacheCvModule({ cvModule, cvModuleDocs }))
      return { apiTree, displayedCvModule: cvModule, cvModuleDocs }
    }

    // TODO
    const isCvModuleCached = Map(store.getState().docs.cvModules).keySeq().some(m => m === cvModule)
    if (isCvModuleCached) {
      console.log('cvModule found in cache:', cvModule)
    } else {
      console.log('cvModule not found in cache:', cvModule)
    }
    return {}
  }

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
    const { apiTree, displayedCvModuleDocs, displayedCvModule } = this.props
    console.log('render')

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
                apiTree={apiTree}
              />
            </Menu>
            <Content>
              <div>
                <ContentHeader>
                  <span> { displayedCvModule } </span>
                </ContentHeader>
              </div>
              <ModuleDocs
                cvModuleDocs={displayedCvModuleDocs}
                cvModule={displayedCvModule}
              />
            </Content>
          </MainContainer>
        </PageContainer>
      </PageWrapper>
    )
  }
})
