import React from 'react'

export default (components: any, joiningComponent: any) : Array<any> =>
  components.map((c, idx, arr) => ([
    c,
    idx < arr.length - 1
      ? (
        <joiningComponent.type
          {...joiningComponent.props}
          /* eslint-disable react/no-array-index-key */
          key={`jc${idx}`}
          /* eslint-enable react/no-array-index-key */
        />
      )
      : null
  ]))
