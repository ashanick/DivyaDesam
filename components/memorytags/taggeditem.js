import classes from './taggeditem.module.css'
import Image from 'next/image';
import Link from 'next/link';

function TaggedItem(props){
    console.log('Pops :', props)
    const {id, imageURL} = props
    const imagePath = `/${imageURL}`
    const linkPath = `/users/${id}`

    return (
        <li id = {id} className={classes.tg__li}>
            <Link href={linkPath}>
                <a>
                <div className={classes.ti__container}>
                    <div className={classes.ti__image}>
                        <Image 
                            id={id}
                            src={imagePath}
                            alt={id}
                            width={5}
                            height={5}
                            layout='responsive'
                            placeholder='empty'
                        />
                    </div>
                    <div className={classes.ti__image__info}>
                        <p>{id}</p>
                    </div>            
                </div>
            </a>
            </Link>
        </li>
            
    )
}

export default TaggedItem