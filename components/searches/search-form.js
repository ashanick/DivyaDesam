import { useRef } from "react";

import classes from '../users/new-search.module.css'
import Button from '../ui/button'
import citiesData from '../../data/cities.json'
import educationData from '../../data/education.json'
import professionData from '../../data/professionData.json'
import ButtonLarge from "../ui/button-large";

function SearchForm(props) {

    var searchtype = true
    
    var inputRef = useRef()
    var cityInputRef = useRef()
    var ancestryInputRef = useRef()
    var professionInputRef = useRef()
    var educationInputRef = useRef()
    var ancestralVillage = []

    if (props.type === 'connections') {
        searchtype = false
    }

    // console.log('New Search Props : ', searchtype, props.type)
    if (citiesData) {
        ancestralVillage = citiesData.data.filter(cc => cc.aVillage === "true")
        // console.log('Av', ancestralVillage)

    }
    // console.log('Search Form', props)

    function formSubmitHandler(event){
        event.preventDefault()
        const partName = inputRef.current.value
        var citySelected = cityInputRef.current.value
        var ancestry = ancestryInputRef.current.value
        var profession = professionInputRef.current.value
        var education = educationInputRef.current.value

        // console.log('Submit ss: ', partName, strLength, citySelected)
        if (citySelected === "None"){
            citySelected = ""
        }
        if (ancestry === "None"){
            ancestry = ""
        }
        if (citySelected === "None"){
            citySelected = ""
        }
        if (citySelected === "None"){
            citySelected = ""
        }
        const searchPath = `${partName}1000${ancestry}1000${citySelected}1000${education}1000${profession}`
        // console.log('Form submitted : ', searchPath)
        props.returnHandler(searchPath)
    }

    function handleReset(){
        // console.log('Clear all submited options')
        inputRef.current.value=""
        cityInputRef.current.value = ""
        ancestryInputRef.current.value = ""
        professionInputRef.current.value = ""
        educationInputRef.current.value = ""
    }

    return (
        <div>
            
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.wrap__search}>
            <div className={classes.main__query}>
                <h3 className={classes.mq__h3}>
                    Main Query
                </h3>
                <div className={classes.main__query__club}>
                    <div className={classes.control}>
                        <label htmlFor="typename" className={classes.labelinput}>
                            <h3>Name</h3>
                        </label>
                        <input 
                            type="text"
                            id="searchuser"
                            placeholder='Enter 3 letters'
                            aria-label='Enter 3 letters' 
                            ref={inputRef}
                        />
                    </div>  
                    <div className={classes.control}>
                        <label htmlFor="ancestryVillage" className={classes.labelinput}>
                            <h3 >Ancestry</h3>
                        </label>
                        <select id='ancestryVillage' ref={ancestryInputRef}>
                            {
                                ancestralVillage.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div> 
                    <div className={classes.control}>
                        <label htmlFor="cityname" className={classes.labelinput} >
                            <h3 >City</h3>
                        </label>
                        <select id='cityname' ref={cityInputRef}>
                            {
                                citiesData.data.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className={classes.main__query}>
                <h3>Additional filters</h3>
                <div className={classes.main__query__club}>
                    <div className={classes.control}>
                        <label htmlFor="educationName" className={classes.labelinput} >
                            <h3 >Education</h3>
                        </label>
                        <select id='educationName' ref={educationInputRef}>
                            {
                                educationData.data.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="professionName" className={classes.labelinput} >
                            <h3>Profession</h3>
                        </label>
                        <select id='professionName' ref={professionInputRef}>
                            {
                                professionData.data.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            </div>
            {/* <div className={classes.formreset}> */}
                {searchtype && 
                    <div className={classes.formsubmitbutton}>
                        <ButtonLarge >Search any individual criteria in main query or in filters, or combine main with filters </ButtonLarge>
                    </div>
                }
                {!searchtype && 
                    <div className={classes.formsubmitbutton}>
                        <Button >Search Connections -- Between any 2 people</Button>
                    </div>
                }
            {/* </div> */}
        </form>

        <div className={classes.formreset}>
            <div className={classes.formresetbutton}>
                <Button 
                    onClick={handleReset}>
                        Reset Search
                </Button>
            </div>
        </div>
        </div>
    )
}

export default SearchForm