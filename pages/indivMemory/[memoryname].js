import { useRouter } from "next/router";
import useSWR from 'swr'
import TaggedGrid from "../../components/memorytags/tagsgrid";
import Button from "../../components/ui/button";

import classes from '../../styles/Home.module.css'

const fetcher = async(url) => {
    const res = await fetch(url)
    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.message)
    }

    return data
}

function MemoryDetailPage () {
    const router = useRouter()
    const memoryName = router.query.memoryname

    var isLoading = true

    const handleClick = () => {
        router.back()
    }

    const {data, error} = useSWR(
        ()=>memoryName && `/api/memory/${memoryName}`,
        fetcher
    )
    
    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>😢😢😢 ...Something went wrong .... Please try again with correct details ... 😢😢😢</h1>
            </div>
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

    // console.log('Fetched Data 1: ', data)
    return (
        <div className={classes.im__container}>
            <h1>{data.memory[0].title}</h1>
            <div style={{marginBottom: '1rem'}}>
                <Button onClick={handleClick}>
                    Return to user
                </Button>
            </div>
            <div className={classes.im__main}>
                <div className={classes.im__left}>
                    <TaggedGrid items={data.tags}/>
                </div>
                <div className={classes.im__right}>
                    <h2>{data.memory[0].heading1}</h2>
                    <p>{data.memory[0].description1}</p>
                    <h2>{data.memory[0].heading2}</h2>
                    <p>{data.memory[0].description2}</p>
                    <h2>{data.memory[0].heading3}</h2>
                    <p>{data.memory[0].description3}</p>
                </div>
            </div>
        </div>
    )
}

export default MemoryDetailPage