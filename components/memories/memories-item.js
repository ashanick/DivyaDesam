import Link from "next/link"
import classes from './memories-item.module.css'
import Image from 'next/image'

function MemoriesItem(props) {
    const {id, title, excerpt, imageURL} = props.items
    // console.log('Memories Item : ', imageURL)
    const imagePath = `/${imageURL}`
    // const imagePath='/images/memories/AdityaUpsideDownBhindi.jpg'
    
    return (
        <li className={classes.post}>
            <div className={classes.image}>
                <Image 
                    src={imagePath}
                    alt={title}
                    width={150}
                    height={150}
                    Layout='responsive'
                />
            </div>
            <div className={classes.content}>
                <h4>{title}</h4>
                <p>{excerpt}</p>
            </div>
        </li>

    )
}

export default MemoriesItem