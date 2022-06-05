import classes from './photo-item.module.css'
import Image from 'next/image'

function PhotoItem(props) {
    const {id, title, imageURL} = props.items
    // console.log('Photo Item Props', props.items)
    const imagePath = `/${imageURL}`
    return (
        <li className={classes.post}>
            <h3>{title}</h3>
            <div className={classes.image}>
                <Image 
                    src={imagePath}
                    alt={title}
                    width={300}
                    height={300}
                    layout='responsive'
                    placeholder='empty'
                />
            </div>
        </li>
    )
}

export default PhotoItem