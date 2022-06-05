import classes from './photo-grid.module.css'
import PhotoItem from './photo-item'

function PhotoGrid (props) {
    const {photoList} = props.items
    // console.log('In Photo Grid: See ' , props)

    if (!photoList) {
        return(
            <div>
                <h4>Please add photos</h4>
            </div>
        )
    }

    return (
        <ul className={classes.grid}>
            {
                photoList.map((p)=>(
                    <PhotoItem items={p} key={p.title} />
                ))
            }
        </ul>
    )
}

export default PhotoGrid