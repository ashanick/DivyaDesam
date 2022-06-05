import Image from 'next/image'
import Link from 'next/link';

import classes from './villages-item.module.css'

function VillagesItem(props) {
    const {id, name, imageURL} = props
    const imagePath=`/${imageURL}`
    // console.log('Village Grid Item : ', props)
    const linkPath = `/indivVillage/${name}`
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
                            />
                    </div>
                    <h3>{name}</h3>
                </a>
            </Link>
        </li>
    )
}

export default VillagesItem