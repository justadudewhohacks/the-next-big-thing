/* @flow */

import type { DocsStateT } from 'types/DocsState'
import type { CvModuleTreeT } from 'types/CvModuleTree'

import { actionTypes } from './actions'
import createReducer from './utils'

export const docsInitialState : DocsStateT = {
  apiTree: [],
  apiTreeFilter: '',
  filteredApiTree: [],
  cvModules: {},
  displayedCvModule: ''
}

const getFilteredApiTree = function (
  apiTree: Array<CvModuleTreeT>,
  apiTreeFilter: string
) : Array<CvModuleTreeT> {
  if (!apiTreeFilter) {
    return apiTree
  }

  const nameIncludes = name =>
    name.toLowerCase().includes(apiTreeFilter.toLowerCase())
  const isNotEmpty = arr => !!arr.length

  return apiTree.map(
    moduleTree => ({
      ...moduleTree,
      cvClasses: moduleTree.cvClasses
        .map(cvClass => ({
          ...cvClass,
          classFnNames: cvClass.classFnNames.filter(nameIncludes)
        }))
        .filter(cvClass => nameIncludes(cvClass.className) || isNotEmpty(cvClass.classFnNames)),
      cvFnNames: moduleTree.cvFnNames.filter(nameIncludes)
    })
  )
}

export const docsReducer = createReducer(docsInitialState, {
  [actionTypes.UPDATE_API_TREE]: (state, action) => ({
    apiTree: action.apiTree,
    filteredApiTree: getFilteredApiTree(action.apiTree, state.apiTreeFilter)
  }),

  [actionTypes.CACHE_CV_MODULE]: (state, action) => ({
    cvModules: { ...state.cvModules, [action.cvModule]: action.cvModuleDocs },
    displayedCvModule: action.cvModule
  }),

  [actionTypes.DISPLAY_CV_MODULE]: (state, action) => ({
    displayedCvModule: action.cvModule
  }),

  [actionTypes.UPDATE_API_TREE_FILTER]: (state, action) => ({
    apiTreeFilter: action.apiTreeFilter,
    filteredApiTree: getFilteredApiTree(state.apiTree, action.apiTreeFilter)
  })

})
