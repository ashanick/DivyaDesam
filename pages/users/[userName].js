import { useRouter } from 'next/router';
import useSWR from 'swr'
import Head from "next/head"


import AllUsersGraph from '../../components/overlayGraph/allusers-graph'
import IndivUser from '../../components/users/indiv-user';
import classes from '../../components/users/indiv-user.module.css'
// import FamilyTree from '../../components/familytree'
import MemoriesGrid from '../../components/memories/memories-grid';
import PhotoGrid from '../../components/memories/photo-grid';
import NewSearch from '../../components/users/new-search';
import UserDetailTopSection from '../../components/user-details/udetail-top';
// import UserDetailChildren from '../../components/user-details/udetail-children';
import UserDescription from '../../components/user-details/user-description';

const fetcher = async(url) => {
    // console.log('In fetcher')
    const res = await fetch(url)
    const data = await res.json()
    // console.log('In fetcher ', data)
    if (res.status !== 200) {
        throw new Error(data.message)
    }

    return data
}

function UserDetailPage () {
    const router = useRouter()
    const userName = router.query.userName
    var memoryState = false
    var photoState = false
    var isLoading = true
    var childrenState = false
    
    // console.log('Query router Aiyaa', router.query)
    // console.log('User Detail, Part 1', userName)
    const {data, error} = useSWR(
        ()=> userName && `/api/users/${userName}`,
        fetcher
    )
    
    if (userName === null) {
        return (
            <div style={{margin: '2rem', textAlign: 'center'}}>Please send user request with correct credentials</div>
        )
    }
    
    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}><h1>😢😢😢 ...Something went wrong .... Please try again with correct details ... 😢😢😢</h1></div>
        )
    }

    if (data){
        isLoading = false
    }

    if (isLoading) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Please Wait Images take time .. 🤳🤳 ... Free Database 😎 ... And Large ... 🙌🙌🙌🙌</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong 😢😢😢 Do try again with correct details</h1>
            </div>
        )
    }

    console.log('After fetching Member Data', data)

    // console.log('After fetching graph Photo Gallery', data.photoGallery.photoList.length)
    console.log('Details : ', data)
    if (data.memories.memories.length > 0) {
        memoryState = true
    } 
    if (data.photoGallery.photoList.length){
        photoState = true
    }
    if (data.member.children.length > 0){
        childrenState = true
    }

    var mname = data.member.member[0].name 
    if (data.member.member[0].spouse) {
        mname = mname + ' &  ' + data.member.member[0].spouse 
    }
    return (
        <div>
            <Head>
                <title>Iyengars</title>
                <meta 
                    name="description" 
                    content="Find and connect with the greater Iyengars and their extended families" />
            </Head>
            <h1 style={{textAlign: 'center'}}>{mname}</h1>
            <div className={classes.user__main}>
                <UserDetailTopSection 
                    items={data.member.member} 
                    parents={data.member.parents}
                    kids={data.member.children}
                    />
            </div>


            
            <div className={classes.user__main}>
                <UserDescription 
                    items={data.member}
                    memories={data.memories}
                    photoGallery={data.photoGallery}
                    />
            </div>
 
        </div>
    )

}

export default UserDetailPage