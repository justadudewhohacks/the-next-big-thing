/* @flow */

import 'isomorphic-fetch'

import type { CvModuleTreeT } from 'types/CvModuleTree'

export type ActionTypesT = any

export type ActionT = any & {
  type: string
}

type DispatchT = ActionT => any

export const actionTypes = {
  UPDATE_API_TREE: 'UPDATE_API_TREE',
  CACHE_CV_MODULE: 'CACHE_CV_MODULE',
  FETCHING_CV_MODULE: 'FETCHING_CV_MODULE',
  DISPLAY_CV_MODULE: 'DISPLAY_CV_MODULE',
  UPDATE_API_TREE_FILTER: 'UPDATE_API_TREE_FILTER'
}

export const updateApiTree = (apiTree: Array<CvModuleTreeT>) => (dispatch: DispatchT) =>
  dispatch({ type: actionTypes.UPDATE_API_TREE, apiTree })

export const cacheCvModule = ({ cvModule, cvModuleDocs } : any) => (dispatch: DispatchT) =>
  dispatch({ type: actionTypes.CACHE_CV_MODULE, cvModule, cvModuleDocs })


export const displayCvModule = (cvModule: string) => (dispatch: DispatchT) =>
  dispatch({ type: actionTypes.DISPLAY_CV_MODULE, cvModule })


export const fetchCvModule = (cvModule: string) => async (dispatch: DispatchT) => {
  dispatch({ type: actionTypes.FETCHING_CV_MODULE, cvModule })
  const { cvModuleDocs } = await (await fetch(`/api/cvModuleDocs/${cvModule}`)).json()
  return cacheCvModule({ cvModuleDocs, cvModule })(dispatch)
}

export const updateApiTreeFilter = (apiTreeFilter: string) => (dispatch: DispatchT) =>
  dispatch({ type: actionTypes.UPDATE_API_TREE_FILTER, apiTreeFilter })

