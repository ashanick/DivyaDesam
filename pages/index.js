import Head from 'next/head'

import WelcomeBanner from '../components/homepage/welcome'
import NewSearch from '../components/users/new-search'

export default function Home() {
  return (
    <div>
      <Head>
        <title>1000+ Iyengars</title>
        <meta name="description" content="Network of 8+ generations of Iyengars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <WelcomeBanner />
        <NewSearch type = "common"/>
        <div className="lockup" style={{textAlign: 'center'}}>
        <h1>Test 7: Asha Iyengar here Adding Clans IoDash</h1>
        Let us see how to build this new one without deployment error
        </div>     
      </div>
    </div>
  )
}
