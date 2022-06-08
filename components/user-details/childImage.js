import Image from 'next/image';
import Link from 'next/link';

import classes from './childImage.module.css'
function ChildImage(props){
    const {name, imageURL, id} = props
    const imagePath=`/${imageURL}`
    var linkPath = `/users/${name}`
    // console.log('Child Image Props : ', imagePath)
    return (
        <div className={classes.ci__image}>
            <Link href={linkPath}>
                <a>
                    <div style={{width: '100%'}}>
                    <Image
                        src={imagePath}
                        alt={name}
                        width={5}
                        height={5}
                        layout='responsive'
                        placeholder='empty'
                    />
                    </div>
                    <div className={classes.image__info}>
                        <p>{name}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ChildImage