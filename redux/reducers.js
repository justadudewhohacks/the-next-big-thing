/* @flow */

import { Map } from 'immutable'

import type { DocsStateT } from '@/types/DocsState'
import type { ActionT } from './actions'

import { actionTypes } from './actions'

export const docsInitialState : DocsStateT = {
  apiTree: [],
  cvModules: Map(),
  displayedCvModule: ''
}

export const docsReducer = function (
  state: DocsStateT = docsInitialState,
  action: ActionT
) : DocsStateT {
  switch (action.type) {
    case actionTypes.UPDATE_API_TREE:
      return Object.assign({}, state, { apiTree: action.apiTree })
    case actionTypes.CACHE_CV_MODULE: {
      const newCvModules = state.cvModules.set(action.cvModule, action.cvModuleDocs)
      return Object.assign({}, state, {
        cvModules: newCvModules,
        displayedCvModule: action.cvModule
      })
    }
    default: return state
  }
}
