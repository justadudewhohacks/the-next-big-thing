import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-109709749-2"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-109709749-2');
            `
          }} />
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js" />
          {this.props.styleTags}
        </Head>
        <body style={{ margin: 0, padding: 0 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}