import {useState, useCallback, useEffect} from 'react'

import ConnectionsHome from './connections';
import GenerationRight from './generation-right'
import GenerationLeft from './generation-left'
import HomeIntro from './homeintro';
import VillagesGrid from '../villages/villages-grid';

import classes from './homepage.module.css'
import citiesData from '../../data/cities.json'

function testIsDesktop() {
    if (typeof window === 'undefined') {
        return true;
    }
    return window.innerWidth >= 768;
}

function useIsDesktopSize(){
    const [isDesktopSize, setIsDesktopSize] = useState(testIsDesktop);
    const [windowInnerWidth, setWindowInnerWidth] = useState()
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        function autoResize() {
            setIsDesktopSize(testIsDesktop());
        }
        window.addEventListener('resize', autoResize);
        autoResize();
        return () => window.removeEventListener('resize', autoResize);
    }, [])

    useEffect(()=>{
        let autoResize1 = () => {
            // console.log("Is ? Desktop: " + isDesktopSize);
            // console.log('Window Inner Width', window.innerWidth);
            setWindowInnerWidth(window.innerWidth)
            if(window.innerWidth < 768 ){
                // console.log('Am i in less than')
                setIsDesktopSize(false)
            }else{
                // console.log('You stooopid')
                setIsDesktopSize(true)
            }
        }
        autoResize1()
    })

    return isDesktopSize;
}

function HomePageComponent(){
    const isDesktopSize = useIsDesktopSize();
    // console.log('Before message : ', isDesktopSize)

    const [ancestralVillage, setAncestralVillage] = useState([])
    useEffect(()=> {
        // console.log('in use effect cities data')
        var temp = []
        if (citiesData) {
            temp = citiesData.data.filter(cc => cc.aVillage === "true" && cc.name !== "None")
        }
        // console.log('Temp Villages : ', temp)
        setAncestralVillage(temp)
    }, [citiesData])

    var whatishappening = false
    if (!isDesktopSize) {
        // console.log('Looks like we are here')
        whatishappening = true
    }
    // console.log('What is this stupid value ? : ', isDesktopSize)
    // console.log('What is happening ? : ', whatishappening)
    return (
    <div >
        <div className={classes.main__av}>
            {/* <div>State {isDesktopSize} What is {whatishappening}</div> */}
            <HomeIntro />
            <hr style={{border: '1px solid red'}}/>
            <div className={classes.introtext}>
                <h2>1000+ Iyengars started with the premise that there are no more than 
                5 degrees of seperation between any 2 Iyengars, and we can search connections in the extended network.
                </h2>
            </div>
            <hr style={{border: '1px solid red'}}/>
            {
                isDesktopSize &&
                    <GenerationRight />
            }
            {
                !isDesktopSize &&
                    <GenerationLeft />
            }
            
            <ConnectionsHome />
            
        </div>
        <div className={classes.introvillages}>
            <h2>
            Ancestral Villages & Towns Represented
            </h2>
        </div>
        <div className={classes.villages}>
            {
            ancestralVillage &&
            <VillagesGrid items={ancestralVillage} />
            }
        </div>
    </div>
    )
}

export default HomePageComponent