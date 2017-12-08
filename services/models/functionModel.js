const declarationType = require('./declarationType')

const makeFnSchema = mongoose => new mongoose.Schema({
  fnName: { type: String, required: true },
  cvModule: { type: String, required: true },
  owner: { type: String, required: true },
  hasAsync: { type: Boolean, required: true },
  signatures: [
    {
      returnValues: { type: [declarationType] },
      optionalArgs: { type: [declarationType] },
      requiredArgs: { type: [declarationType] },
      allArgs: { type: String }
    }
  ]
})

module.exports = mongoose => mongoose.model('functions', makeFnSchema(mongoose))
