/* @flow */

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const makeDocsFinderService = require('./docsFinderService')
const makeSchemas = require('./schemas')

const connect = (mlabUser: string, mlabPw: string) : Promise<any> =>
  new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${mlabUser}:${mlabPw}@ds125556.mlab.com:25556/opencv4nodejs`)
    const db = mongoose.connection
    db.on('error', err => reject(err))
    db.once('open', res => resolve(res))
  })

exports.docsFinderService = makeDocsFinderService(makeSchemas(mongoose))

exports.connect = connect
