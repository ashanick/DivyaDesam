import Image from "next/image"
import {useRouter} from "next/dist/client/router"

function SmallCard({name, imageURL}) {
  const router = useRouter()
  const goToUser= (e, name) =>{
    console.log('Go to User: ', name)
    router.push({
      pathname: "/user",
      query: {
        membername: name
      }
    })
  }
  return (
    <div className="flex items-center m-2
    mt-5 space-x-4 rounded-xl cursor-pointer
    hover:bg-gray-100 hover:scale-105
    transition transform duration-200 ease-out" 
    id={name}
    onClick={(e) => {goToUser(e, name)}}
    >
    <div className="relative h-16 w-14">
        <Image src={imageURL} 
            layout="fill" 
            objectFit="contain"
            className="rounded-lg"
        />
    </div>
    <div>
        <h2 className="font-semibold text-sm">{name}</h2>
    </div>
</div>
  )
}

export default SmallCard