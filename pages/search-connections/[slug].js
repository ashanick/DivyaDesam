import { useRouter } from 'next/router';
import useSWR from 'swr'
import AllUsersGraph from '../../components/overlayGraph/allusers-graph';
import classes from '../../styles/indivuser.module.css'
import UsersGrid from '../../components/users/users-grid';

const fetcher = async(url) => {
    // console.log('Search In fetcher U1 U2', url)
    const res = await fetch(url)
    const data = await res.json()
    // console.log('In fetcher U1 U2', data)
    if (res.status !== 200) {
        throw new Error(data.message)
    }

    return data
}

function SearchConnections(){
    const router = useRouter()
    const searchPath = router.query.slug
    // console.log('Search Connections Api : ', searchPath)
    
    const {data, error} = useSWR(
        ()=> searchPath && `/api/userconnection/${searchPath}`,
        fetcher
    )
    var isLoading = true
    var tempData 
    if(searchPath === null){
        return(
            <div>Please send good request</div>
        )
    }


    if (error){
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
               <h2> 💥💥 Alas Something went wrong 💥 Sorry 💥💥</h2>
            </div>
        )
    }
    // console.log('Data in Slug', data)

    if (data){
        isLoading = false
        tempData = data.membersData
        // console.log('Members : ', data, 'Temp Data : ', tempData)
        // console.log ('Gently .. comin in OR NOT:', data.membersData)
    }

    if (isLoading){
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
               <h2> Please wait loading 🤳🤳💥💥💥💥💥</h2>
            </div>
        )
    }
    // console.log('Temp Data', tempData)
    if (tempData.members.length === 0){
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h2>Intriguing ... I could not find any connection 😘 😘 😘 Oh My Hypo ??? </h2>
                <br></br>
                💥💥🙌🤳🤳  .... Try other people ... Better yet CONTACT TO UPDATE our database  .... 🤳🤳🙌💥💥
            </div>
        )
    }

    return (
        <div className={classes.slug__main}>
            <div className={classes.users__grid}>
                
               {  
                   <UsersGrid items={tempData} />
               } 
            </div>
            <div className={classes.slug__graph}>
                {data && 
                <AllUsersGraph items={data.data} />
                }
            </div>
        </div>
    )
}

export default SearchConnections