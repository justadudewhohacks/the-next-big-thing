import CvFn from 'types/CvFn'
import CvClass from 'types/CvClass'

module.exports = mongoose => ({
  FnSchema: mongoose.model('functions', new mongoose.Schema(CvFn)),
  ClassSchema: mongoose.model('classes', new mongoose.Schema(CvClass))
})
