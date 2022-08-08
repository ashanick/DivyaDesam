import Image from "next/image"
import {useRouter} from "next/dist/client/router"

function SampleCard({id, imageURL, excerpt}) {
    const router = useRouter()
    const goToUser= (e, id) =>{
      console.log('Go to User: ', id)
      router.push({
        pathname: "/user",
        query: {
          membername: id
        }
      })
    }
  return (
    <div className="border-2 border-red-500  
    min-w-[250px] hover:scale-x-105 transform transition duration-300 ease-out
    mt-5  items-center cursor-pointer" 
    id={id}
      onClick={(e) => {goToUser(e, id)}}>
        <div className="relative h-[200px] ">
            <Image src={imageURL}
            layout="fill"
            />
        </div>
        
        <h3 className="text-center text-semibold text-xl py-2">{id}</h3>
        <p className="text-sm px-3 pb-1">{excerpt}</p>
    </div>
  )
}

export default SampleCard