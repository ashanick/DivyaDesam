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

    // console.log('U1U2 from query : ', searchPath)
    // console.log('1st Split', wp[0], '1st : ', wpSplit1)
    // console.log('WP Split 3rd part : ', wpSplit1[2])
    var members = []
    var user1 = ''
    // if (searchPath !== null) {
    //     const xx = searchPath.split('+')
    //     const yy = xx[1]+'+'+xx[2]+'+'+ xx[3]+'+'+xx[4]+'+'+xx[5]
    //     const user1 = xx[0]
    // }
    if (wpSplit1[2] !== null && wpSplit1[2] !== '') {
        const xx =wpSplit1[2].split('+')
        const yy = xx[1]+'+'+xx[2]+'+'+ xx[3]+'+'+xx[4]+'+'+xx[5]
        user1 = xx[0]
    }
    
    // console.log('Query router Aiyaa yy', yy )
    // console.log('User Detail, Part 2', searchPath)
    if (searchPath === null) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                Please send request with correct credentials
            </div>
        )
    }

    const {data, error} = useSWR(
        ()=> yy && `/api/commonSearch/${yy}`,
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
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                🙌🙌 Please wait .... Loading ... 🤷‍♀️🤷‍♀️🤷‍♀️  ... Ultra Large Free Database ... ✔️✔️✔️
            </div>
        )
    }

    // console.log('Kolaveri Data1 ', data)
    members = data

    // console.log('Members asearchlpha ', members)

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