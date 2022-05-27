import dynamic from 'next/dynamic'

const FileViewer = dynamic(()=> import('react-file-viewer'), {
    ssr: false
})

function Vamsa2(){
    // console.log('In Contact Us')
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Apologies, trying to get a better copy ... not very clear</h2>
            <FileViewer key="vamsa1" fileType="pdf" filePath="/pdffiles/Vamsa2.pdf" />
        </div>
    )
}

export default Vamsa2