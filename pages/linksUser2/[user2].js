import { useRouter } from 'next/router';

import SearchForm from '../../components/searches/search-form';

function SecondUser(){
    var router = useRouter()
    const user1 = router.query.user2
    // console.log('In 🤳🤳User 2 : ', user1)

    function getvalues(e){
        const temp = e
        const tt = user1.user1
        // console.log('In Search 2 : U1 : ', user1, 'tempSearch : ', temp)
        const searchValue = `${user1}1000${e}`
        // console.log('Search Value U1', searchValue)
        // console.log('Search Values', searchValue)
        const searchPath = `/search-User2/${searchValue}`
        // console.log('Search Links In Search Links Pages function get values', searchPath)   
        router.push(searchPath)
    }
    return (
        <div>
            <SearchForm type="connections" returnHandler={(e)=>getvalues(e)}/>
            <hr style={{border: '1px solid red'}}/>
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>First User: {user1}, Search for User2</h1>  
            </div>
        </div>
    )
}

export default SecondUser