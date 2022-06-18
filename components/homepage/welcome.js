import Image from 'next/image';

import classes from './welcome.module.css'

function WelcomeBanner(){
    return (
        <div className = {classes.welcome}>
            <div className={classes.image}>
                <Image
                src={'/images/BannerImage.jpg'}
                alt={"Asha Sundararajan"}
                width={200}
                height={100}
                layout='responsive'
                placeholder='empty'
                />
            </div>
            <div className={classes.welcometext}>
                <h1>Welcome to 1000+ Iyengars</h1>
                <p>A genealogy representing the 1000+ Iyengars across 11 ancestral villages</p>
            </div>
        </div>
    )
}

export default WelcomeBanner