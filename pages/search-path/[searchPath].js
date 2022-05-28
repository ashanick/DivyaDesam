import Head from "next/head"
import NewSearch from "../../components/users/new-search"
import { useRouter } from 'next/router';
import useSWR from 'swr'
import UsersGrid from '../../components/users/users-grid'
import classes from '../../styles/indivuser.module.css'

const fetcher = async(url) => {
    // console.log('Common Search In fetcher', url)
    const res = await fetch(url)
    const data = await res.json()
    console.log('In fetcher Common Search', data)
    if (res.status !== 200) {
        console.log('In Fetcher Error')
        return error
    }

    return data
}

function SearchAll (){
    const router = useRouter()
    const searchPath = router.query.searchPath
    // console.log('Search Path Common Search : ', searchPath)
    const {data, error} = useSWR(
        ()=> searchPath && `/api/commonSearch/${searchPath}`,
        fetcher
    )

    if (error) {
        return (
            <div><h1>Something went wrong .... Please try again ... error</h1></div>
        )
    }

    if (!data) {
        return (
            <div>Please wait 🙌🙌 Ultra large database 💥💥💥 Free too Yupeeeeeee 🤳🤳🤳🤳</div>
        )
    }
    
    var searchText = 'Searched Criteria'
    if(searchPath){
        const xx = searchPath.split('+')
        // console.log('XX ', xx[0], xx[1], xx[2], xx[3], xx[4])
        if (xx[0] ){
            searchText = searchText + ' -- Name contains: ' + xx[0] 
        }
        if (xx[1] && xx[1] !== 'None'){
            searchText = searchText + ' -- Ancestry contains: ' + xx[1] 
        }
        if (xx[2] && xx[2] !== 'None'){
            searchText = searchText + ' -- City contains: ' + xx[2] 
        }
        if (xx[3] && xx[3] !== 'None'){
            searchText = searchText + ' -- Education contains: ' + xx[3] 
        }
        if (xx[4] && xx[4] !== 'None'){
            searchText = searchText + ' -- Profession contains: ' + xx[4] 
        }
    }

    // console.log('Query router Aiyaa', router.query)
    // console.log('User Detail, Part 2', searchPath)
    if (searchPath === null) {
        return (
            <div>Please send city request with correct credentials</div>
        )
    }

    // console.log('Kolaveri Data1 ', data)
    var members = []
    members = data

    // console.log('Members asearchlpha ', members)

    return (
        <div>
             <Head>
                <title>Advanced Search</title>
                <meta 
                    name="description" 
                    content="Find and connect with the greater Iyengars and their extended families" />
            </Head>
            <NewSearch />
             <hr style={{border: '1px solid red'}}/>
             <div style={{textAlign: 'center', color: 'red'}}>
                <h3>{searchText}</h3>
             </div>
             
            <div className={classes.users__grid}>
                {members && 
                    <UsersGrid  
                        items={members.membersData} />
                }
                {!members &&
                    <div>Sorry Something awfully wrong </div>
                }
            </div>
        </div>
    )
}

export default SearchAll