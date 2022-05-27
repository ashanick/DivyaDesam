import dynamic from 'next/dynamic'

const FileViewer = dynamic(()=> import('react-file-viewer'), {
    ssr: false
})

function KumbakonamClan(){
    // console.log('In Contact Us')
    return (
        <div>
            <h1>Work in progress</h1>
            {/* <FileViewer key="kodavasal" fileType="pdf" filePath="/pdffiles/Kodavasal-Family.pdf" /> */}
        </div>
    )
}

export default KumbakonamClan