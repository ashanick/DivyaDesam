import Head from "next/head"
import useSWR from "swr"
import UsersGrid from "../components/users/users-grid"
import classes from '../styles/indivuser.module.css'
import NewSearch from "../components/users/new-search"
// import Hero from "../components/homepage/hero"

const fetcher = async(url) => {
    // console.log('in fetcher all clans')
    const res = await fetch(url)
    const data = await res.json()
    if (!data || res.status != 200) {
        throw new Error(data.message)
    }
    // console.log('Fetched Data : ', data)

    return data
}

function ClansPage(){
    console.log('In Clans')
    const {data, error} = useSWR(
        ()=>`/api/allclans`, fetcher
    )
    
    if (!data) {
        return <div style={{textAlign: 'center', margin: '2rem'}}>
            <h3>
            5 Oh Please wait loading IMAGES .... 😎😎 ... It takes a while 😘😘😘 .. Database is free and large  ✔️✔️✔️  
            </h3>
            </div>
    }

    if (error){
        return <div>Apologies Error 😢😢😢😢😢😢 Please try again</div>
    }
    // console.log('=🤳🤳🤳', data, error)
    return (
        <div>
            <Head>
                <title>Iyengars</title>
                <meta 
                    name="description" 
                    content="Find and connect with the greater Iyengars and their extended families" />
            </Head>
            <NewSearch />
             <hr style={{border: '1px solid red'}}/>
            <div className={classes.users__grid}>
                <UsersGrid items={data.membersData} />
            </div>
            
        </div>
    )
}

export default  ClansPage
