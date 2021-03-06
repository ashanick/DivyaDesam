import Image from 'next/image';
import Link from 'next/link';

import classes from './user-details.module.css'
import LinkList from '../users/linkList';
import UserDetailChildren from './udetail-children'

function UserDetailTopSection(props) {
    const {dob, name, spouse, imageURL, spouseImageURL, education,
        profession, school, hobby} = props.items[0]
    const parents = props.parents
    const kids = props.kids
    console.log('User top : ', dob)
    var tempdob = '01-01-2022'
    const imagePath=`/${imageURL}`
    const spouseImagePath = `/${spouseImageURL}`
    
    if (!dob){
        tempdob = dob
    }
    const formattedDob = new Date(tempdob).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    var childrenState = false
    var linkPath = `/users/${name}`
    var spouseState = false
    var parentState = false
    
    if (spouse){
        var linkPath = `/users/${spouse}`
        spouseState = true
    }
    if (parents.length > 0){
        parentState = true
    }

    if (kids.length > 0){
        childrenState = true
    }

    return (
        <div className={classes.top}>
           <div className={classes.topleft}>
               <div className={classes.detailsDate}>
                    <h3>Birth</h3> 
                    <p>{formattedDob}</p>
                    <h3>@ </h3> 
                    <p>Chennai</p>
                </div>
                <div className={classes.detailsDate}>
                    {parentState &&
                        <div className={classes.children}>
                            <div>
                                <h3>Parents: </h3>
                                <ul>
                                    {parents.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                {
                    spouseState && 
                    <div className={classes.detailsDate}>
                        <h3>Marriage </h3> 
                        <p>{formattedDob}</p>
                        <h3>@ </h3> 
                        <p>Chennai</p>
                    </div>
                }
      
                <div className={classes.detailsDate}>
                    {
                        childrenState &&
                        <div>
                            <h3>Children</h3>
                            <div className={classes.detailsMarriage}>
                                <UserDetailChildren 
                                    items={kids}
                                />
                            </div>
                        </div>
                    }
                </div>
               
            </div>
           <div className={classes.topmid}>
                <div className={classes.imageborder}>
                    <div className={classes.topmid__image}>
                        <Image
                            src={imagePath}
                            alt={name}
                            width={25}
                            height={25}
                            // width={imagePath.width}
                            // height={imagePath.height}
                            layout='responsive'
                            placeholder='empty'
                        />
                   </div>  
               </div>
               { 
                    spouseState && 
                    <div className={classes.imageborder}>
                        <div className={classes.topmid__image}>
                            <Link href={linkPath}>
                                <a>
                                    <Image
                                        src={spouseImagePath}
                                        alt={spouse}
                                        width={25}
                                        height={25}
                                        layout='responsive'
                                        placeholder='empty'
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
               }
      
           </div>
           <div className={classes.topright}>
                <div className={classes.detailsDate}>
                    <h3>Education </h3>
                    <p>{education}</p>
                </div>
                <div className={classes.detailsDate}>
                    <h3>Profession </h3>
                    <p>{profession}</p>
                </div>
                <div className={classes.detailsDate}>
                    <h3>Hobbies </h3>
                    <p>{hobby}</p>
                </div>
                
           </div>
        </div>
    )
}

export default UserDetailTopSection