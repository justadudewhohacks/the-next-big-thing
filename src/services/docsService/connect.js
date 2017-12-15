/* @flow */

module.exports = function (mongoose: any, endpoint: string) : void => Promise<any> {
  return function () : Promise<any> {
    return new Promise((resolve, reject) => {
      mongoose.connect(endpoint)
      const db = mongoose.connection
      db.on('error', err => reject(err))
      db.once('open', res => resolve(res))
    })
  }
}
