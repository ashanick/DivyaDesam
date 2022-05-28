import GridItem from './grid-item'
import classes from './users-grid.module.css'

function UsersGrid(props) {
    const members = props.items.members
    const listType = props.listType
    const user1 = props.user1
    // console.log('Users List Type ', listType, 'User1', user1)

    if (!members) {
        return (
            <div>Auhhgg Error ... No Members Found Yetttt</div>
        )
    }

    return (
        <ul className={classes.users}>
            {/* <li>testing this whole shit and wondering why it is not wrapping up</li> */}
            {members.map(member => 
                <GridItem
                    key= {member.id}
                    id = {member.id}
                    name={member.name}
                    imageURL={member.imageURL}
                    ecdescription={member.ecdescription}
                    listType={listType}
                    user1={user1}
                />)}
        </ul>
    )
}

export default UsersGrid