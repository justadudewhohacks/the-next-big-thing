const declarationType = require('./declarationType')

const makeClazzSchema = mongoose => new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: [declarationType],
  constructors: {
    type: [{
      optionalArgs: { type: [declarationType] },
      requiredArgs: { type: [declarationType] }
    }],
    required: true
  }
})

module.exports = mongoose => mongoose.model('classes', makeClazzSchema(mongoose))
