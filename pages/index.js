import Head from 'next/head'

import WelcomeBanner from '../components/homepage/welcome'
import NewSearch from '../components/users/new-search'
import HomePageComponent from '../components/homepage'

export default function Home() {
  return (
    <div>
      <Head>
        <title>1000+ Iyengars</title>
        <meta name="description" content="Network of 8+ generations of Iyengars" />
      </Head>

      <div>
        <WelcomeBanner />
        <NewSearch type = "common"/>
        {/* <div className="lockup" style={{textAlign: 'center'}}> */}
            <HomePageComponent />
        {/* </div>      */}
      </div>
    </div>
  )
}
