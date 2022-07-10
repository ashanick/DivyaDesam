import Link from "next/link"
import Button from "../ui/button"

import classes from './enterform.module.css'

function EnterForm(){

    return (
        <div className={classes.enter__main}>
            <Link href="/homepage">
                <a>
                    <h1>Welcome to 1000+ Iyengars</h1>
                    <p>A compendium of Iyengars, including non-Iyengars and non-Indians married or born to an Iyengar</p>

                    <div>
                        <ul className={classes.enter__ul}>
                            <li>&rarr; 8+ generations from 1700 AD</li>
                            <li>&rarr; Individal details</li>
                            <li>&rarr; Tagged memory and photo stories</li>
                            <li>&rarr; Clans of 5+ generations </li>
                            <li>&rarr; Search connections between any 2 people</li>
                        </ul>
                    </div>

                    <Button>Enter DivyaDesam</Button>
                </a>
            </Link>
        </div>

    )
}   

export default EnterForm