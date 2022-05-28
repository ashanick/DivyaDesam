import Image from 'next/image'
import Link from 'next/link';
import classes from './grid-item.module.css'

function GridItem(props) {
    const {id, name, imageURL, listType, user1} = props

    const imagePath=`/${imageURL}`
    // console.log('Grid Item : ', props)

    var linkPath = `/users/${name}`
    if (listType === 'connections'){
        linkPath = `/linksUser2/${name}`
    }
    if (listType === 'user2'){
        linkPath = `/search-connections/${user1}+${name}`
    }

    return (
        <li className={classes.grid}>
            <Link href={linkPath}>
                <a>
                    <div className={classes.image}>
                        <Image  
                            src={imagePath}
                            alt={name}
                            width={150}
                            height={150}
                            layout='responsive'
                            placeholder='empty'
                            />
                    </div>
                    <div className={classes.content}>
                        <h3>{name}</h3>
                    </div>
            </a>
            </Link>
        </li>
    )
}

export default GridItem