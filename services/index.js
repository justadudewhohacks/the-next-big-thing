/* @flow */

const fs = require('fs')
const path = require('path')

// dummy finders
exports.makeFindAllSignatures = (docsDir: string) => () =>
  fs
    .readdirSync(docsDir)
    .map(file => JSON.parse(fs.readFileSync(path.join(docsDir, file)).toString()))

exports.makeFindSignaturesByModule = (docsDir: string) => (cvModule: string) =>
  fs
    .readdirSync(docsDir)
    .map(file => JSON.parse(fs.readFileSync(path.join(docsDir, file)).toString()))
    .filter(signatures => cvModule === signatures.cvModule)
