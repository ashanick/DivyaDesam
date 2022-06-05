import Link from 'next/link';

import classes from './footer.module.css'

function FooterSection(){
    return (
        <footer className={classes.footer}>
             <div className={classes.footermenu}> 
                <div className={classes.footercontentabout}>
                    <h2>Acknowledgements</h2>
                    <hr style={{border: '1px solid red'}}/>
                    <ul>
                        <li key="kodavasal">
                            <Link href={'/viewclans/Kodavasal'}>
                                <a>
                                    Kodavasal Family Tree, Mrs. Kumuda and Mr. Seshadri Sreenivasan
                                </a>
                            </Link>
                        </li>
                        <li key="kumbakonam">
                            <Link href={'/viewclans/Kumbakonam'}>
                                <a>
                                    Kumbakonam C.L.Rangaswami Family Tree, Kuppuswamy
                                </a>
                            </Link>
                        </li>
                        <li key="vamsa2">
                            <Link href={'/viewclans/Vamsa2'}>
                                <a>
                                    R.S.Kuppuswamy Family Stories, Babchi Vaidehi
                                </a>
                            </Link>
                        </li>
                        <li key="vamsa1">
                            <Link href={'/viewclans/Vamsa1'}>
                                    <a>
                                        Vazhyutoor Dikshitar Vamsa from 1700
                                    </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.footercontentothers}>
                    <h3>More Info</h3>
                    <hr style={{border: '1px solid red'}}/>
                    <ul>
                        <li key= "contribute">
                            <Link href={'/viewclans/Vamsa2'}>
                                <a>
                                    How to contribute
                                </a>
                            </Link>
                        </li>
                        <li key= "about">
                            <Link href={'/aboutus'}>
                                <a>
                                    About Us
                                </a>
                            </Link>
                        </li>
                        <li key= "contact">
                            <Link href={'/contactus'}>
                                <a>
                                    Contact us
                                </a>
                            </Link>
                        </li>
                    </ul> 
                </div>
                <div className={classes.footercontentothers}>
                    <h3>Resources Used</h3>
                    <hr style={{border: '1px solid red' , marginRight: '2rem'}}/>
                    <ul>
                    <li key= "flaticons">
                            <Link href={'/contactus'}>
                                <a>
                                    Icons from FlatIcons
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.fcopy}> 
            <hr style={{border: '1px solid red', marginRight: '1rem'}}/>
                Copyrights Reserved @Asha Sundararajan
                {/* <hr style={{border: '1px solid red'}}/> */}
            </div>
        </footer>
    )
}

export default FooterSection