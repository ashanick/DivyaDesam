import dynamic from 'next/dynamic'

const FileViewer = dynamic(()=> import('react-file-viewer'), {
    ssr: false
})

function Vamsa1(){
    // console.log('In Contact Us')
    return (
        <div>
            <FileViewer key="vamsa1" fileType="pdf" filePath="/pdffiles/Vamsa1.pdf" />
        </div>
    )
}

export default Vamsa1