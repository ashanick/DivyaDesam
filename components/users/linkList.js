import classes from './linkList.module.css'
import Link from "next/link"

function LinkList(props){
    // console.log('Links : ', props)
    const linkPath = `/users/${props.name}`
    return (
        <li className={classes.grid}>
            <Link href={linkPath}>
                <a>
                    {props.name}
                </a>
            </Link>

        </li>
    )
}

export default LinkList