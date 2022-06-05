import Image from 'next/image';
import Link from 'next/link';

import classes from './homeintro.module.css'

function HomeIntro(){
    return (
        <div className={classes.intro}>
            <Link href={'/users/Asha Sundararajan'}>
                <a>
                    <div className={classes.image}>
                        <Image
                        src={'/images/member/AshaSundararajan.JPG'}
                        alt={"Asha Sundararajan"}
                        width={200}
                        height={200}
                        layout='responsive'
                        placeholder='empty'
                        />
                    </div>
                </a>
            </Link>
            <div className={classes.intro__content}>
                <h2>Why 1000+</h2>
                <p>1000+ dreams is my
                    journey of finding joyful and inspirational stories of my ancestors. I grew up in a large extemded family, 
                    but am aware of the inquisitive drive our far-flung next generation has about "Where do I come from?" 
                </p>
                <p>Hi, I am Asha Sundararajan, an educator, entrepreneur, and environmentalist. I wanted to go beyond ancestry and genie or
                    other sites that give you just a family tree, name, a face, and a few details. I wanted to be able to:
                </p>
                <ul className={classes.ultext}>
                    <li>Build a network not a family tree of Iyengars and their families, including our non-iyengar loved ones.</li>
                    <li>Find links between 2 people (Use Connections)</li>
                    <li>Immortalize funny, fascinating, amazing, endearing, and inspiring memories</li>
                    <li>Share stories and tag people</li>
                </ul>
            </div>
        </div>
    )
}

export default HomeIntro