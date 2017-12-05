module.exports = mongoose => mongoose.model('classes', mongoose.Schema({
  className: { type: String, required: true, unique: true },
  cvModule: { type: String, required: true },
  fields: { type: mongoose.Schema.Types.Mixed, required: true }
}))
