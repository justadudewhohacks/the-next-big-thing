/* @flow */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import { docsInitialState, docsReducer } from './reducers'

module.exports = function (
  initialState : any = {
    docs: docsInitialState
  }
) : any {
  return createStore(
    combineReducers({
      docs: docsReducer
    }),
    initialState,
    composeWithDevTools(process.env.NODE_ENV === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, logger))
  )
}

