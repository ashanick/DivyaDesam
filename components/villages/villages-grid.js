import classes from './villages-grid.module.css'
import VillagesItem from './villages-item'

function VillagesGrid(props){
    const avillages = props.items
    // console.log('VG:', avillages)

    if (!avillages){
        return (
            <div> Achooo Ramaaaa Error</div>
        )
    }
    return (
        <ul className={classes.grid}>
            {avillages.map(av=>
            // <div>Asha</div>
                <VillagesItem
                    key={av.id}
                    name={av.name}
                    imageURL={av.imageURL}
                    items={av}
                />
            )}
        </ul>
    )
}

export default VillagesGrid