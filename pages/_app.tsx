import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../src/client/components/Layout'
import React from 'react'
import '../styles/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
export default MyApp
