import classes from './card.module.css'

function Card (props) {
    return (
<div className={classes.card} 
    style={props.style}>
        {props.children}
    </div>
    )
}

export default Card