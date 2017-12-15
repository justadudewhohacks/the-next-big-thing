/* @flow */

export type TypeAndNameT = {
  type: string,
  name: string
}

const TypeAndName = {
  type: { type: String, required: true },
  name: { type: String, required: true }
}

module.exports = TypeAndName
