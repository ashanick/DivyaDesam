import ChildImage from "./childImage"

import classes from './childImage.module.css'
function UserDetailChildren(props){

    return (
        <div className={classes.ci__main}>
            {
                props.items.map(cc => 
                    <ChildImage 
                        key={cc.id}
                        id={cc.id}
                        name={cc.name}
                        imageURL={cc.imageURL}
                    />

                )
            }
        </div>
    )
}

export default UserDetailChildren