import classes from './user-details.module.css'
import LinkList from '../users/linkList'

import MemoriesGrid from '../memories/memories-grid'
import PhotoGrid from '../memories/photo-grid'


function UserDescription(props){
    // console.log('Descripton Props : ', props)
    const {siblings, grandParent, greatGrandParent, grandChildren, greatGreatGrandParent,
        greatGrandChildren, greatGreatGrandChildren, greatGreatGreatGrandChildren,
        greatGreatGreatGrandParent} = props.items
    const {memories} = props.memories
    const {photoList} = props.photoGallery
    // console.log('Photo Description : ', photoList)
    const {personal1, personal2, professional1, professional2, additional1, additional2} = props.items.member[0]

    var siblingsState = false
    var grandParentState = false
    var greatGrandParentState = false
    var greatGreatGrandParentState = false
    var greatGreatGreatGrandParentState = false
    var grandChildrenState = false
    var greatGrandChildrenState = false
    var greatGreatGrandChildrenState = false
    var greatGreatGreatGrandChildrenState = false
    var rightSection = false
    var leftSection = false
    var siblingsStateLeft = false
    var memoryState = false
    var photoState = false

    if (grandParent.length > 0){
        rightSection = true
    }
    if (siblings.length > 0){
        siblingsState = true
        if (grandParent.length > 0){
            siblingsStateLeft = false
        }
    }
    if (grandParent.length > 0){
        grandParentState = true
    }
    if (greatGrandParent.length > 0){
        greatGrandParentState = true
    }
    if (greatGreatGrandParent.length > 0){
        greatGreatGrandParentState = true
    }
    if (greatGreatGreatGrandParent.length > 0){
        greatGreatGreatGrandParentState = true
    }
    if (grandChildren.length > 0){
        grandChildrenState = true
        leftSection = true
    }
    if (greatGrandChildren.length > 0){
        greatGrandChildrenState = true
    }
    if (greatGreatGrandChildren.length > 0){
        greatGreatGrandChildrenState = true
    }
    if (greatGreatGreatGrandChildren.length > 0){
        greatGreatGreatGrandChildrenState = true
    }
    if (memories.length > 0){
        memoryState = true
    }
    if (photoList.length){
        photoState = true
    }

    return (
        <div className={classes.top}>
            {
                rightSection &&
                <div className={classes.topleft}>
                {
                    siblingsState &&
                    <div className={classes.children}>
                        <h3>Siblings: </h3>
                        <ul className={classes.children}>
                            {siblings.map((gc, index)=> 
                                <LinkList key = {gc.name}
                                    name={gc.name} 
                                    listIndex={index}
                                />)
                            }
                        </ul>
                    </div>
                }

                {grandParentState && 
                    <div>
                        <h2>Ancestors</h2>
                        <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                        <div className={classes.children}>
                            <div>
                                <h3>Grand Parents</h3>
                                <ul className={classes.children}>
                                    {grandParent.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div>
                        </div>   
                        {greatGrandParentState && 
                            <div className={classes.children}>
                                <div>
                                    <h3>Great Grand Parents</h3>
                                    <ul className={classes.children}>
                                        {greatGrandParent.map((gc, index)=> 
                                            <LinkList key = {gc.name}
                                                name={gc.name} 
                                                listIndex={index}
                                            />)
                                        }
                                    </ul>
                                </div>
                            </div>  
                        }
                        {greatGreatGrandParentState && 
                            <div className={classes.children}>
                                <div>
                                    <h3>Great Great Grand Parents</h3>
                                    <ul className={classes.children}>
                                        {greatGreatGrandParent.map((gc, index)=> 
                                            <LinkList key = {gc.name}
                                                name={gc.name} 
                                                listIndex={index}
                                            />)
                                        }
                                    </ul>
                                </div>
                            </div>  
                        }
                        {greatGreatGreatGrandParentState && 
                            <div className={classes.children}>
                                <div>
                                    <h3>Third Great Grand Parents</h3>
                                    <ul className={classes.children}>
                                        {greatGreatGreatGrandParent.map((gc, index)=> 
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
                }
            </div>
            }
            
            <div className={classes.bottommid}>
                <h3>Personal</h3>
                { personal1 && 
                    <div>
                        <p>{personal1}</p>
                        <p>{personal2}</p>
                    </div>
                }
                <h3>Professonal</h3>
                { personal1 && 
                    <div>
                        <p>{professional1}</p>
                        <p>{professional2}</p>
                    </div>
                }
                {additional1 && 
                    <div>
                        <p>{additional1}</p>
                        <p>{additional2}</p>
                    </div>
                }
{/* style={{backgroundColor: '#e8f3db'}} */}
                {
                    memoryState && 
                    <div style={{border: '1px solid green'}}>
                        <div className={classes.user__mem_photo} >
                            <h2 style={{color: 'green'}}>Evergreen Stories & Special Memories</h2>
                        </div>
                        <div className={classes.user__main}>   
                            <MemoriesGrid items={props.memories} />
                        </div>
                    </div>
                }
                {   photoState &&
                    <div>
                        {/* <hr style={{border: '1px solid red'}}/> */}
                        <div className={classes.user__mem_photo}>
                            <h2>Photo Gallery</h2>
                        </div>
                        <div className={classes.user__main}>
                            <PhotoGrid items={props.photoGallery} />
                        </div>
                    </div>
                    }  
            </div>
            {
                leftSection &&
                <div className={classes.topright}>
                    { 
                        siblingsStateLeft && 
                            <div className={classes.children}>
                                <h3>Siblings: </h3>
                                <ul className={classes.children}>
                                    {siblings.map((gc, index)=> 
                                        <LinkList key = {gc.name}
                                            name={gc.name} 
                                            listIndex={index}
                                        />)
                                    }
                                </ul>
                            </div> 
                    }
                    <h2>Descendants</h2>
                    <hr style={{border: '1px solid red', marginBottom: '10px'}}/>
                    {
                        grandChildrenState &&
                        <div>
                            <h3>Grand Children</h3>
                            <ul className={classes.children}>
                                {grandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                    {
                        greatGrandChildrenState && 
                        <div>
                            <h3>Great Grand Children</h3>
                            <ul className={classes.children}>
                                {greatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                    {
                        greatGreatGrandChildrenState && 
                        <div>
                            <h3>Great Great Grand Children</h3>
                            <ul className={classes.children}>
                                {greatGreatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                    {
                        greatGreatGreatGrandChildrenState && 
                        <div>
                            <h3>Third Great Grand Children</h3>
                            <ul className={classes.children}>
                                {greatGreatGreatGrandChildren.map((gc, index)=> 
                                    <LinkList key = {gc.name}
                                        name={gc.name} 
                                        listIndex={index}
                                    />)
                                }
                            </ul>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default UserDescription