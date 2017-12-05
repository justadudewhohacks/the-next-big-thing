const declType = {
  type: { type: String, required: true },
  name: { type: String, required: true },
  defaultValue: { type: String },
  arrayDepth: { type: Number },
  numArrayElements: { type: Number }
}

const makeFnSchema = mongoose => new mongoose.Schema({
  fnName: { type: String, required: true },
  cvModule: { type: String, required: true },
  owner: { type: String, required: true },
  hasAsync: { type: Boolean, required: true },
  signatures: [
    {
      returnValues: { type: [declType] },
      optionalArgs: { type: [declType] },
      requiredArgs: { type: [declType] },
      allArgs: { type: String }
    }
  ]
})

module.exports = mongoose => mongoose.model('functions', makeFnSchema(mongoose))
