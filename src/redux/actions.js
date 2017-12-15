/* @flow */

import 'isomorphic-fetch'

export type ActionTypesT = any

export type ActionT = any & {
  type: string
}

export const actionTypes = {
  UPDATE_API_TREE: 'UPDATE_API_TREE',
  CACHE_CV_MODULE: 'CACHE_CV_MODULE',
  FETCHING_CV_MODULE: 'FETCHING_CV_MODULE',
  DISPLAY_CV_MODULE: 'DISPLAY_CV_MODULE'
}

export const updateApiTree = apiTree => dispatch =>
  dispatch({ type: actionTypes.UPDATE_API_TREE, apiTree })

export const cacheCvModule = ({ cvModule, cvModuleDocs }) => dispatch =>
  dispatch({ type: actionTypes.CACHE_CV_MODULE, cvModule, cvModuleDocs })


export const displayCvModule = cvModule => dispatch =>
  dispatch({ type: actionTypes.DISPLAY_CV_MODULE, cvModule })


export const fetchCvModule = cvModule => async (dispatch) => {
  dispatch({ type: actionTypes.FETCHING_CV_MODULE, cvModule })
  const { cvModuleDocs } = await (await fetch(`/api/cvModuleDocs/${cvModule}`)).json()
  return cacheCvModule({ cvModuleDocs, cvModule })(dispatch)
}

