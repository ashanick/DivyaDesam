import classes from './search-top.module.css'

function SearchTop(){
    return(
        <div className={classes.maintop}>
            <h3>The searching connections process</h3>  
            <p>Typically, you will find that there are at least 2 connections/links between any 2 Iyengars and their extenced families. This search yields the shotest connection between any two people</p>
            <ul className={classes.maintop__links}>
                <li className={classes.maintop__li}>Use any search option to find the first person</li>
                <li className={classes.maintop__li}>You will get a list of users to choose from</li>
                <li className={classes.maintop__li}>Repeat the process to find the second person</li>    
            </ul>          
        </div>
    )
}

export default SearchTop