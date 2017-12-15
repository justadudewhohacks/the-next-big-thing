import React from 'react'
import Router from 'next/router'

const noAsPath = '#__noAsPath__'

export default ({ children, href, as }) => {
  const handleClick = async (e) => {
    e.preventDefault()

    await Router.push(href, as)

    // jump to anchor tag
    window.location = window.location
    const hashPos = as.indexOf('#')
    if (hashPos !== -1) {
      Router.router.asPath = `${as.substr(0, hashPos)}${noAsPath}`
    }
  }

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

