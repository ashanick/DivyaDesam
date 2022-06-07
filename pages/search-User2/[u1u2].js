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

function SearchUser2 (){
    const router = useRouter()
    const searchPath = router.query.u1u2
    const wp = router.asPath.split('?')
    const wpSplit1 = wp[0].split('/')
    console.log('WP from Query :', wp, ' Split : ', wpSplit1)
    const xx =wpSplit1[2].split('1000')
    const yy = xx[1]+'1000'+xx[2]+'1000'+ xx[3]+'1000'+xx[4]+'1000'+xx[5]
    var user1
    var isLoading = true
    var members = []

    console.log('XX value : ', xx)
    const {data, error} = useSWR(
        ()=> yy && `/api/commonSearch/${yy}`,
        fetcher
    )

    if (searchPath === null) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h2>Please send request with correct credentials</h2>
            </div>
        )
    }

    members = data
    if (data){
        isLoading = false
        user1 = xx[0].replace(/%20/g, ' ')
    }

    if (isLoading) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h2>
                🙌🙌 Please wait .... Loading ... 🤷‍♀️🤷‍♀️🤷‍♀️  ... Ultra Large Free Database ... ✔️✔️✔️
                </h2>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong .... Please try again</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Resend with valid request .... Please try again</h1>
            </div>
        )
    }

    // console.log('Kolaveri Data1 ', data)

    return (
        <div classame={classes.u1u2__main}>
            <div style={{textAlign: 'center', marginTop: '2rem', marginBottom: '2rem', color: 'green'}}>
                <h2>User 1: {user1}, Pick to select User 2</h2>
            </div>
            <div className={classes.users__grid}>
                {members && 
                    <UsersGrid  listType='user2' user1 ={user1}
                        items={members.membersData} />
                }
            </div>

        </div>
    )
}

export default SearchUser2