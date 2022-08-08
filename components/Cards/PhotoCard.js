import Image from "next/image"

function PhotoCard({item}) {
    const {title, imageURL, pdate} = item
    const imagePath = `/${imageURL}`
    console.log('Photo : ', imagePath)
  return (
    <div >
        <div className="relative h-[250px] w-[250px]">
            <Image src={`${imagePath}`}
            layout="fill"
            />
        </div>
   
    </div>
  )
}

export default PhotoCard