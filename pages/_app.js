import '../styles/globals.css'
import '../styles/design-tokens.css'
import '../styles/utilities.css'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Genius</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />)
    </Layout>
  )
}

export default MyApp
