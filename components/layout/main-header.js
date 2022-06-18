import Link from "next/link";
import Image from "next/image";

import classes from './main-header.module.css'
import NavBar from "./navbar";

function MainHeader(){
    return (
        <div className={classes.header}>
            <div className={classes.headermenu}>
                <Link href="/homepage">
                    <a>
                        <div className={classes.image}>
                            <Image  
                                src={'/images/Iyengars logo.png'}
                                alt="1000+ Iyengars"
                                width={200}
                                height={150}
                                layout='responsive'
                            />
                            
                           <p style={{color: 'white', opacity: '100'}}>Compendium of Iyengars
                            </p>                         
                        </div>
                    </a>
                </Link>

                <nav className={classes.navigation}>
                    <NavBar />
                </nav>
            </div>
        </div>
    )
}

export default MainHeader