import { useRouter } from 'next/router';
import useSWR from 'swr'
import UsersGrid from '../../components/users/users-grid'
import classes from '../../styles/indivuser.module.css'

const fetcher = async(url) => {
    // console.log('Search In fetcher')
    const res = await fetch(url)
    const data = await res.json()
    // console.log('In fetcher City Name', data)
    if (res.status !== 200) {
        throw new Error(data.message)
    }

    return data
}

function LinksUser1 (){
    const router = useRouter()
    const searchPath = router.query.user1
    var members = []

    // console.log('Query router Aiyaa', router.query)
    // console.log('In Links User 1', searchPath)
    if (searchPath === null) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                Please send request with correct credentials
            </div>
        )
    }

    // return(
    //     <div>In Links User 1</div>
    // )

    const {data, error} = useSWR(
        ()=> searchPath && `/api/commonSearch/${searchPath}`,
        fetcher
    )

    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong .... Please try again</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}} >
                <h1>Please Wait Fetching Data =🤳🤳 ... Free Database 😎 ... And Large ... 🙌🙌🙌🙌</h1>
            </div>
        )
    }

    // console.log('Kolaveri Data1 ', data)
    members = data

    // console.log('Members asearchlpha ', members)

    return (
        <div style={{textAlign:'center'}}>
            <h1 style={{color: 'red'}}>Please select the first user</h1>
            <div className={classes.users__grid}>
            {members && 
                <UsersGrid listType='connections' items={members.membersData} />
            }
            </div>
        </div>
    )
}

export default LinksUser1