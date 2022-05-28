import { useRouter } from "next/router";

import SearchForm from "../searches/search-form";

function NewSearch(){
    var router = useRouter()

    function getvalues(e){
        const searchPath = `/search-path/${e}`
        // console.log('Search Links In Search Links Pages function get values', searchPath)   
        router.push(searchPath)
    }

    return (
        <div>
            <SearchForm type="common" returnHandler={(e)=>getvalues(e)}/>
        </div>
    )
   
}

export default NewSearch