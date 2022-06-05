import { useRouter } from 'next/router';
import useSWR from 'swr'
import Head from "next/head"
import Image from 'next/image';

import AllUsersGraph from '../../components/overlayGraph/allusers-graph'
import IndivUser from '../../components/users/indiv-user';
import classes from '../../components/users/indiv-user.module.css'
// import FamilyTree from '../../components/familytree'
import MemoriesGrid from '../../components/memories/memories-grid';
import PhotoGrid from '../../components/memories/photo-grid';
import NewSearch from '../../components/users/new-search';

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
    // console.log('Query router Aiyaa', router.query)
    // console.log('User Detail, Part 1', userName)
    if (userName === null) {
        return (
            <div style={{margin: '2rem', textAlign: 'center'}}>Please send user request with correct credentials</div>
        )
    }

    const {data, error} = useSWR(
        ()=> userName && `/api/users/${userName}`,
        fetcher
    )
    
    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}><h1>😢😢😢 ...Something went wrong .... Please try again with correct details ... 😢😢😢</h1></div>
        )
    }

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Please Wait Images take time .. 🤳🤳 ... Free Database 😎 ... And Large ... 🙌🙌🙌🙌</h1>
            </div>
        )
    }

    // console.log('After fetching Member Data', data.member.member[0].id)

    // console.log('After fetching graph Photo Gallery', data.photoGallery.photoList.length)
    // console.log('Details : ', data.member.member)
    if (data.memories.memories.length > 0) {
        memoryState = true
    } 
    if (data.photoGallery.photoList.length){
        photoState = true
    }

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
            <div className={classes.user__main}> 
                <div className={classes.user}>
                    {data &&
                        <div>
                            <IndivUser key={data.member.member[0].id} 
                                id={data.member.member[0].id}
                                name={data.member.member[0].id} 
                                ecdescrition={data.member.member[0].ecdescription}
                                imageUrl={data.member.member[0].imageURL}
                                items={data.member}
                                spouse={data.member.member[0].spouse}
                                />
                        </div>
                    } 
                </div>
                <div className={classes.indivuser__right}> 
                    {data && 
                    <AllUsersGraph items={data.data} />
                    }
                    {/* <FamilyTree /> */}
                    <div className={classes.user__rightband}>
                        <div className={classes.dateDetails}>
                            <div className={classes.imageicon}>
                                <Image
                                src={'/images/graduation-hat.png'}
                                alt={data.member.member[0].education}
                                width={25}
                                height={25}
                                layout='responsive'
                                placeholder='empty'
                                />
                            </div>
                            <p className={classes.detailpara} style={{margin: '0', padding: '0'}}>Education: - </p>{data.member.member[0].education}
                        </div>
                    </div>
                    
                    <div className={classes.user__rightband}>
                        <div className={classes.dateDetails}>
                            <div className={classes.imageicon}>
                                <Image
                                src={'/images/suitcase.png'}
                                alt={data.member.member[0].education}
                                width={25}
                                height={25}
                                layout='responsive'
                                placeholder='empty'
                                />
                            </div>
                            <p className={classes.detailpara} style={{margin: '0', padding: '0'}}>Profession: -</p>{data.member.member[0].profession}
                        </div>
                        <div className={classes.dateDetails}>
                            <div className={classes.imageicon}>
                                <Image
                                src={'/images/hobbies.png'}
                                alt={data.member.member[0].education}
                                width={25}
                                height={25}
                                layout='responsive'
                                placeholder='empty'
                                />
                            </div>
                            <p className={classes.detailpara} style={{margin: '0', padding: '0'}}>Hobbies: -</p>{data.member.member[0].profession}
                        </div>
                    </div>
                    <div className={classes.user__description}>
                        <h3>Early Description</h3>
                        {data.member.member[0].earlydescription}
                    </div>
                    <div className={classes.user__description}>
                        <h3>Adult Description</h3>
                        {data.member.member[0].adultdescription}
                    </div>
                    
                    {/* {memoryState && 
                        <div> */}
                        <hr style={{border: '1px solid red'}}/>
                            <h2>Memory Photo Stories</h2>
                            <MemoriesGrid items={data.memories} />
                        {/* </div> */}
                    {/* } */}
                    <h2>Photo Gallery</h2>
                    { photoState &&
                        <PhotoGrid items={data.photoGallery} />
                    }
                </div>
            </div>
        </div>
    )

}


export default UserDetailPage