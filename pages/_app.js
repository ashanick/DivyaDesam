import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Layout from '../components/layout/layout'
import '../styles/global.css'
import Router from 'next/router'
import ProgressBar from "@badrap/bar-of-progress"

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
            <Head>
        <title>DivyaDesam</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
            <Component {...pageProps} />
    </Layout>

  )
}

export default MyApp
