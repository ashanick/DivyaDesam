import Image from 'next/image';
import Link from 'next/link';

import classes from './generation.module.css'

function GenerationLeft(){
    return (
        <div className={classes.gen}>
            <div className={classes.image}>
                <Image
                src={'/images/GenerationalDetails.jpg'}
                alt={"Asha Sundararajan"}
                width={400}
                height={225}
                layout='responsive'
                placeholder='empty'
                />
            </div>
            <div className={classes.gen__content}>
                <div>
                    <h2>8 Generations</h2>
                    <h4>Individual details, photo, and memory stories</h4>
                    <p>
                    We have a compendium of members from Kodavasal, Kumbakonam, Mannargudi, Sri Rangam, Vaduvoor, Vazhutoor, and Vippodu. 
                    Our oldest member Vijaya Dikshithar also know as Yagna Dikshithar from Vazhuthur can be traced to 1700. 
                    <br></br>
                    <br></br>
                    The Clans page showcases members 5+ generations.
                    </p>
                    <div className={classes.gen__example}>
                        <h4>Example : </h4>
                        <Link href={'/users/R Seshama Kuppuswamy'}>
                            <a>R S Kuppuswamy</a>
                        </Link>
                        <Link href={'/users/Vepodu Krishnaswamy'}>
                            <a>, Vepodu Krishnaswamy</a>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default GenerationLeft
