import classes from './indivmemory.module.css'

function IndivMemory(props) {
    console.log('In Indiv Memory : ', props)
    const handleClick=(event)=>{
        event.preventDefault()
        console.log('In Popup HandleClick', event.target.id)
        props.handlePopupClick(event.target.id)
    }

    return (
        <div className={classes.im__container}>
            <div className={classes.im__return}>
                <button 
                    id='close' onClick={(e)=>handleClick(e)}>
                        x
                </button>
            </div>
            <div className={classes.im__topbar}>
                <div className={classes.im__title}>
                        <h2>{props.item.title}</h2>
                </div>
 
           </div>
        </div>
    )
}

export default IndivMemory