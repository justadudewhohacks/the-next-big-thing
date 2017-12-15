/* @flow */

import docsService from 'services/docsService'

module.exports = function ({ Router } : any) : any {
  const router = Router()

  router.get('/cvModuleDocs/:cvModule', async (req, res) => {
    const { cvModule } = req.params
    if (!docsService.hasCvModule(cvModule)) {
      res.status(404).send({ error: `unkown cvModule: ${cvModule}` })
    }

    const cvModuleDocs = await docsService.getCvModuleDocs(cvModule)
    res.status(202).send({ cvModuleDocs })
  });

  return router
}
