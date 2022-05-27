import { useRouter } from "next/router";

import KodavasalClan from "../../components/pdfViewingClans/kodavasalClan";
import KumbakonamClan from '../../components/pdfViewingClans/kumbakonamClan'
import Vamsa2 from "../../components/pdfViewingClans/vamsa2";
import Vamsa1 from "../../components/pdfViewingClans/vamsa1";

function ClanPDF() {
    const router = useRouter();
    // console.log('Clas : ', router.query)
    const clanName = router.query.clanpdf
    if (clanName === null){
        return (
            <div style={{margin: '2rem', textAlign: 'center'}}>
                <h1>Do contact to add details</h1>
            </div>
        )
    }
    var kodavasalState = false
    var Kstate = false
    var vamsa1state = false
    var vamsa2state = false
    if (clanName === 'Kodavasal') {
        kodavasalState = true
    }

    if(clanName === 'Kumbakonam') {
        Kstate = true
    }

    if(clanName === 'Vamsa1') {
        vamsa1state = true
    }

    if(clanName === 'Vamsa2') {
        vamsa2state = true
    }

    return (
        <div>
            {kodavasalState && 
                <KodavasalClan />
            }
            {kodavasalState && 
                <KumbakonamClan />
            }
            {vamsa2state && 
                <Vamsa2 />
            }
            {vamsa1state && 
                <Vamsa1 />
            }
        </div>
    )
}

export default ClanPDF