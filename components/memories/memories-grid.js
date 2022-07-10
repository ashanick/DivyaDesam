import  classes from './memories-grid.module.css'
import MemoriesItem from '../memories-item'

function MemoriesGrid(props){
    const {memories} = props.items
    // console.log('Memories Grid : ', memories)

    if (!memories){ 
        return(
        <div>
            <h4>Please add memories</h4>
        </div>
        )
    }
    return (
        <ul className={classes.grid}>
            {
                memories.map((memory)=> (
                    <MemoriesItem items={memory} key={memory.id}/>
                ))
            }
        </ul>
    )
}

export default MemoriesGrid