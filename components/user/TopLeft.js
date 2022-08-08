import Image from "next/image"
import {useRouter} from "next/dist/client/router"
import { ArrowCircleUpIcon, HeartIcon, StarIcon } from "@heroicons/react/solid"


function TopLeft(props) {
    const router = useRouter()
    const {dob, name, spouse, imageURL, spouseImageURL, education,
        profession, school, hobby} = props.items[0]
    const parents = props.parents
    const kids = props.kids
    const imagePath = `/${imageURL}`
    const spouseImagePath = `/${spouseImageURL}`
    const spouseState = false
    
    // console.log('Image Path : ', imagePath)
    const goToUser=(e)=> {
        const id = e.target.id
        router.push({
            pathname: "/user",
            query: {
              membername: id
            }
          })
    }

    const goToChild=(e)=> {
        // console.log('Child : ', e.target.id)
        const id = e.target.id
        router.push({
            pathname: "/user",
            query: {
              membername: id
            }
          })
    }
    
    var childrenState = false
    var parentState = false

    var tempdob = '01-01-2022'
    if (!dob){
        tempdob = dob
    }
    const formattedDob = new Date(tempdob).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })


    if (parents.length > 0){
        parentState = true
    }

    if (kids.length > 0){
        childrenState = true
    }
  return (
    <div className="bordercontainer px-3">
        <div className="flex space-x-2 py-1 items-center">
            <p className="detailp">Birth</p>
            <p>{formattedDob}</p>
            <p className="detailp">@</p>
            <p>Chennai</p>
        </div>
        {
            parentState && 
            <p className="detailp">Parents</p>
        }
    
        {
            parents?.map(p=>(
                <div className="cursor-pointer hover:scale-105 
                    transform transition duration-200" 
                    key={p.name}
                    >
                    <p className="px-2 flex gap-2 hover:text-blue-500 hover:font-semibold"
                            id={p.name}
                            onClick={(e) => {goToUser(e)}}
                            >
                        <ArrowCircleUpIcon className="h-7 text-red-500"/>{p.name}</p> 
                </div>
            ))
        }
        {
            spouse && (
                <div className="flex gap-2 items-center">
                    <p className="detailp">
                        Marriage
                    </p>
                    <p> {formattedDob} @ Chennai</p>
                </div>
            )
        }
        <div>
            {
                childrenState && <div>
                    <p className="detailp">Children</p>
                    </div>
            }
            <div className="grid grid-cols-4 gap-2 cursor-pointer justify-start pb-2">
                {
                    kids?.map(k=> (
                        <div key={k.name} className="group"  id={k.name} onClick={(e) => {goToChild(e)}}
                            >
                            <div className="relative h-16 w-16 border-[1px]
                                border-red-500 rounded-full hover:scale-110 items-center"
                                >
                                    <Image src="/images/climate-change.png"
                                    layout="fill"
                                    className="rounded-full"/>
                            </div>
                            <p className="invisible group-hover:visible text-red-500 text-md absolute 
                                -mx-5 -my-12 z-50 bg-slate-50 p-2
                                border-2 border-red-500" id={k.name}>
                                {k.name}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TopLeft