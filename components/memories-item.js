import { useRouter } from "next/router";

import { useState } from "react"
import classes from './memories/memories-item.module.css'
import Button from './ui/button'

function MemoriesItem(props) {
    const {id, title, excerpt, imageURL} = props.items
    // console.log('Memories Item : ', imageURL)
    const imagePath = `/${imageURL}`
    // const imagePath='/images/memories/AdityaUpsideDownBhindi.jpg'
    const [openMemory, setOpenMemory] = useState(false)
    var router = useRouter()

    const handleTaggedClick = (e) => {
        console.log('In handle Tagged Click Main')
        const searchPath = `/indivMemory/${id}`
        console.log('Search Path : ', searchPath)
        router.push(searchPath)
    }

    return (
        <li className={classes.post}>
            <div className={classes.content}>
                <div className={classes.title}>
                    <h3>{title}</h3>
                </div>
                <p>{excerpt}</p>
                <div className={classes.content__button} style={{marginTop: '0.5rem'}}>
                    <Button  
                        onClick={(e)=>handleTaggedClick(e)}>Full Story Tags+</Button>
                </div>
            </div>            
        </li>

    )
}

export default MemoriesItem