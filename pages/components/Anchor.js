/* @flow */

/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */

import React from 'react'

type Props = {
  name: string
}

export default ({ name } : Props) => <a name={name} />
