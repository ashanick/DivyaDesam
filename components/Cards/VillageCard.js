import Image from "next/image"

function VillageCard({id, imageURL, descendants}) {
    const imagePath= `/images/${imageURL}`
    // console.log('Image : ', imagePath)
  return (
    <div className="flex items-center m-2
    mt-5 space-x-4 rounded-xl cursor-pointer 
    hover:bg-gray-100 hover:scale-105
    transition transform duration-200 ease-out">
        {/* <div className="relative h-16 w-16">
            <Image src={imagePath} 
            layout="fill"
            className="rounded-xl"
            />
        </div> */}
        <div>
          <h3 className="h3">{id}</h3>
          <p>Descendants: {descendants}</p>
        </div>
        
    </div>
  )
}

export default VillageCard