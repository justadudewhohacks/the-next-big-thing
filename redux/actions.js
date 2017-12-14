/* @flow */

export type ActionTypesT = any

export type ActionT = any & {
  type: string
}

export const actionTypes = {
  UPDATE_API_TREE: 'UPDATE_API_TREE',
  CACHE_CV_MODULE: 'CACHE_CV_MODULE'
}

export const updateApiTree = apiTree => (dispatch) => {
  return dispatch({ type: actionTypes.UPDATE_API_TREE, apiTree })
}

export const cacheCvModule = ({ cvModule, cvModuleDocs }) => (dispatch) => {
  return dispatch({ type: actionTypes.CACHE_CV_MODULE, cvModule, cvModuleDocs })
}

