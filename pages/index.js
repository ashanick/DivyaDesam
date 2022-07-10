import Head from 'next/head'
import TreeArray from '../components/familytree/treearray'
// import HomePopUp from '../components/homepage/main-popup'
import EnterForm from '../components/layout/enterform'
// import HomePageMain from './homepage'

export default function Home() {
  return (
    <div>
      <Head>
        <title>1000+ Iyengars</title>
        <meta name="description" content="Network of 8+ generations of Iyengars" />
      </Head>

      <div>
          <EnterForm />
      </div>
    </div>
  )
}
