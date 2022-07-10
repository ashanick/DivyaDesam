import TaggedItem from './taggeditem'
import classes from './tagsgrid.module.css'

function TaggedGrid(props){
    const members = props.items
    console.log('Tagged Members : ', members)
    return (
        <div className={classes.tags}>
            <h2>Tagged Members</h2>
            <div className={classes.tag__grid}>
                <ul>
                    { members.map (member => 
                    <TaggedItem
                        key={member.name}
                        id={member.name}
                        imageURL={member.imageURL} />
                        )}
                </ul>
            </div>
        </div>
    )
}

export default TaggedGrid