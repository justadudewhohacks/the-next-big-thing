/* @flow */

export type CvClassInfoT = {
  className: string,
  classFnNamesByCategory: Array<{
    category: string,
    classFnNames: Array<string>
  }>
}
