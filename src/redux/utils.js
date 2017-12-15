/* @flow */

export default function createReducer<S>(initialState: S, actionHandlers: any) : (S, any) => S {
  return (state : S = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    return reduceFn ? Object.assign({}, state, reduceFn(state, action)) : state
  }
}
