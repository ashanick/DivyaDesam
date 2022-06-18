import Link from "next/link";

import classes from './main-header.module.css'

function NavBar(){
    return (
        <nav className={classes.navigation}>
            <ul className={classes.links}>
                <li>
                    <Link href="/clans">Clans</Link>
                </li>
                <li>
                    <Link href="/search-links">Links</Link>
                </li>

                <li> 
                    <Link href="/contactus">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar