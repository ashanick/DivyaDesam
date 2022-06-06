import Image from 'next/image';
import classes from './connections.module.css'

function ConnectionsHome(){
    return (
        <div className={classes.connect}>
            <div className={classes.image}>
                <Image
                src={'/images/TaggingMemories.jpg'}
                alt={"Asha Sundararajan"}
                width={600}
                height={300}
                layout='responsive'
                placeholder='empty'
                />
            </div>
            <div className={classes.connect__content}>
                <div>
                    <h2>Relations and interconnections</h2>
                    <h4>Search between any 2 members</h4>
                    <p>
                    'In 1953, my uncle Dr. Gopalachari (only child), an only child, married my aunt Saroja (extended family). For years, he was not sure who was related to her,
                and ended up treating patients all calling him,"atimber." '
                    <br></br>
                    <br></br>
                    Truly, if and when you meet another Iyengar, or someone married to an Iyengar, dig deep. There will be no more than 3 degrees
                of seperation between the two of you.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConnectionsHome