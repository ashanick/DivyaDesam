import { useRouter } from "next/router";
import VillageBlog from "../../components/villages/village-blog";
import data from '../../data/villagesBlog.json'

function IndivVillagePage() {
    const router = useRouter()
    const villageName = router.query.villageName
    var ancestralVillage = ""
    if (villageName === null) {
        return (
            <div>
                Please send valid request
            </div>
        )
    }
    // console.log('Data', data.data)
    if (data) {
        ancestralVillage = data.data.find(cc => cc.name === villageName)
        // console.log('Av', ancestralVillage)
    }

    if (!ancestralVillage) {
        return (
            <div style={{marginTop: '3rem', marginBottom: '3rem' ,textAlign: 'center'}}>
                <h1>Please contact to contribute for  : {villageName}</h1>
            </div>
        )
    }
    
    return (
        <div>
            
            <VillageBlog items= {ancestralVillage} name={ancestralVillage.name}/>
        </div>
    )
}

export default IndivVillagePage