/* @flow */

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const makeSchemas = require('./schemas')
const makeQueries = require('./queries')
const makeConnect = require('./connect')
const {
  makeHasCvModule,
  makeGetApiTree,
  makeGetCvModuleDocs
} = require('./service')

const mlabUser = 'justaclient'
const mlabPw = 'opencv4nodejs'

const connect = makeConnect(mongoose, `mongodb://${mlabUser}:${mlabPw}@ds125556.mlab.com:25556/opencv4nodejs`)

const queries = makeQueries(makeSchemas(mongoose))
const allModules = ['core', 'imgproc', 'calib3d', 'face', 'dnn', 'features2d', 'io', 'machinelearning', 'objdetect']
const hasCvModule = makeHasCvModule(allModules)
const getApiTree = makeGetApiTree(
  allModules,
  queries.findAllFunctions,
  queries.findAllClasses
)
const getCvModuleDocs = makeGetCvModuleDocs(
  queries.findFunctionsByModule,
  queries.findClassesByModule
)

module.exports = {
  connect,
  hasCvModule,
  getApiTree,
  getCvModuleDocs
}
