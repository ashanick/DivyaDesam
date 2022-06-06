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
    var yy, user1

    const wp = router.asPath.split('?')
    const wpSplit1 = wp[0].split('/')
    var isLoading = true;
    const tempuser = searchPath.split('+')
    user1=tempuser[0] 

    // console.log('U1U2 from query : ', searchPath, 'Temp : ', tempuser, 'User 1 :', user1)
    // console.log('1st Split WP[0]', wp[0], '1st : ', wpSplit1)
    // console.log('WP Split 3rd part : ', wpSplit1[2])


    if (wpSplit1[2] !== null && wpSplit1[2] !== '') {
        const xx =wpSplit1[2].split('+')
        yy = xx[1]+'+'+xx[2]+'+'+ xx[3]+'+'+xx[4]+'+'+xx[5]
        console.log('XX : ', xx, '1st user : ', xx[0])
        // user1 = toString(xx[0])
    }

    console.log('YY What ? ', yy)
    const {data, error} = useSWR(
        ()=> yy && `/api/commonSearch/${yy}`,
        fetcher
    )
    
    // console.log('Kolaveri What happened to Data1 ', data)
    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong .... Please try again</h1>
            </div>
        )
    }

    console.log('User Detail, Part 2', searchPath)
    if (searchPath === null) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                Please send request with correct credentials
            </div>
        )
    }

    var members = []

    members = data
    // console.log('Members asearchlpha ', members)

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong ....There is no Data 😢😢 Please try again</h1>
            </div>
        )
    } 

    if (data){
        isLoading = false;
    }

    if (wpSplit1[2] !== null && wpSplit1[2] !== '') {
        const xx =wpSplit1[2].split('+')
        const yy = xx[1]+'+'+xx[2]+'+'+ xx[3]+'+'+xx[4]+'+'+xx[5]
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