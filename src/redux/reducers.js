/* @flow */

import type { DocsStateT } from 'types/DocsState'

import { actionTypes } from './actions'
import createReducer from './utils'


export const docsInitialState : DocsStateT = {
  apiTree: [],
  cvModules: {},
  displayedCvModule: ''
}

export const docsReducer = createReducer(docsInitialState, {
  [actionTypes.UPDATE_API_TREE]: (state, action) => (
    { apiTree: action.apiTree }
  ),

  [actionTypes.CACHE_CV_MODULE]: (state, action) => ({
    cvModules: { ...state.cvModules, [action.cvModule]: action.cvModuleDocs },
    displayedCvModule: action.cvModule
  }),

  [actionTypes.DISPLAY_CV_MODULE]: (state, action) => ({
    displayedCvModule: action.cvModule
  })

})
