import Link from "next/link";
import Image from "next/image";

import classes from './main-header.module.css'

function MainHeader(){
    return (
        <header className={classes.header}>
            <div className={classes.headermenu}>
                <Link href="/">
                    <a>
                        <div className={classes.image}>
                            <Image  
                                src={'/images/Iyengars logo.png'}
                                alt="1000+ Iyengars"
                                width={200}
                                height={150}
                                layout='responsive'
                            />
                            {/* Funny For image to show, we need this para */}
                           <p style={{color: 'white'}}>Compendium of Iyengars
                            </p>                         
                        </div>
                    </a>
                </Link>

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
            </div>
        </header>
    )
}

export default MainHeader