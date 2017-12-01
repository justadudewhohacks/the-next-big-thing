const { expect } = require('chai')

const { makeGetAPITree } = require('../routes/docsRouter')

const allModules = ['core', 'imgproc', 'calib3d'];

const makeSignature = (cvModule, name, clazz) => ({
  cvModule,
  clazz,
  name
})

describe('getAPITree', () => {
  describe('no signatures found', () => {
    const findAllSignatures = () => []
    const getAPITree = makeGetAPITree(findAllSignatures, allModules)

    it('no exception', () => {
      expect(() => getAPITree()).to.not.throw()
    })

    it('should return empty array', () => {
      expect(getAPITree()).to.be.an('array').lengthOf(0)
    })
  })

  describe('signatures from multiple modules', () => {
    const findAllSignatures = () => [
      makeSignature('core', 'core-mat-func', 'Mat'),
      makeSignature('core', 'core-func'),
      makeSignature('imgproc', 'imgproc-contours-func', 'Contours'),
      makeSignature('imgproc', 'imgproc-func'),
      makeSignature('calib3d', 'calib3d-func')
    ]
    const getAPITree = makeGetAPITree(findAllSignatures, allModules)

    it('should return a subtree for each found module', () => {
      const apiTree = getAPITree()
      expect(apiTree).to.be.an('array').lengthOf(allModules.length)
      apiTree.forEach((tree) => {
        expect(tree.fns).to.be.an('array')
        expect(tree.clazzes).to.be.an('array')
        tree.clazzes.forEach((c) => {
          expect(c).to.have.property('className').to.be.a('string')
          expect(c).to.have.property('fns').to.be.an('array')
        })
      })
    })

    it('should return module trees in given order', () => {
      getAPITree().forEach((tree, i) => {
        expect(tree.cvModule).to.equal(allModules[i])
      })
    })

    it('should return correct core subtree', () => {
      const core = getAPITree()[0]
      expect(core.cvModule).to.equal('core')
      expect(core.fns).to.have.ordered.members(['core-func'])

      const mat = core.clazzes[0]
      expect(mat.className).to.equal('Mat')
      expect(mat.fns).to.have.ordered.members(['core-mat-func'])
    })

    it('should return correct imgproc subtree with', () => {
      const imgproc = getAPITree()[1]
      expect(imgproc.cvModule).to.equal('imgproc')
      expect(imgproc.fns).to.have.ordered.members(['imgproc-func'])

      const contours = imgproc.clazzes[0]
      expect(contours.className).to.equal('Contours')
      expect(contours.fns).to.have.ordered.members(['imgproc-contours-func'])
    })

    it('should return correct calib3d subtree', () => {
      const calib3d = getAPITree()[2]
      expect(calib3d.cvModule).to.equal('calib3d')
      expect(calib3d.fns).to.have.ordered.members(['calib3d-func'])
      expect(calib3d.clazzes.length).to.equal(0)
    })
  })
})
