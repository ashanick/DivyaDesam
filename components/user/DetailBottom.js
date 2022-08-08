import {useRouter} from "next/dist/client/router"
import { ArrowCircleRightIcon, ArrowCircleUpIcon, PlusCircleIcon, 
    ArrowCircleDownIcon} from "@heroicons/react/solid"
import MemoryCard from "../Cards/MemoryCard"
import PhotoCard from "../Cards/PhotoCard"

function DetailBottom(props) {
    const router = useRouter()
    const {siblings, grandParent, greatGrandParent, grandChildren, greatGreatGrandParent,
        greatGrandChildren, greatGreatGrandChildren, greatGreatGreatGrandChildren,
        greatGreatGreatGrandParent} = props.items
    const {memories} = props.memories
    const {photoList} = props.photoGallery
    // console.log('Data Member : ', props.items)
    const {personal1, personal2, professional1, professional2, additional1, additional2} = props.items.member[0]

    const goToUser = (e) => {
        const id = e.target.id
        router.push({
            pathname: "/user",
            query: {
              membername: id
            }
          })
    }

    var siblingsState = false
    var grandParentState = false
    var greatGrandParentState = false
    var greatGreatGrandParentState = false
    var greatGreatGreatGrandParentState = false
    var grandChildrenState = false
    var greatGrandChildrenState = false
    var greatGreatGrandChildrenState = false
    var greatGreatGreatGrandChildrenState = false
    var rightSection = false
    var leftSection = false
    var siblingsStateLeft = false
    var memoryState = false
    var photoState = false

    if (grandParent.length > 0){
        leftSection = true
    }
    if (siblings.length > 0){
        siblingsState = true
        if (grandParent.length > 0){
            siblingsStateLeft = false
        }
    }
    if (grandParent.length > 0){
        grandParentState = true
    }
    if (greatGrandParent.length > 0){
        greatGrandParentState = true
    }
    if (greatGreatGrandParent.length > 0){
        greatGreatGrandParentState = true
    }
    if (greatGreatGreatGrandParent.length > 0){
        greatGreatGreatGrandParentState = true
    }
    if (grandChildren.length > 0){
        grandChildrenState = true
        rightSection = true
    }
    if (greatGrandChildren.length > 0){
        greatGrandChildrenState = true
    }
    if (greatGreatGrandChildren.length > 0){
        greatGreatGrandChildrenState = true
    }
    if (greatGreatGreatGrandChildren.length > 0){
        greatGreatGreatGrandChildrenState = true
    }
    if (memories.length > 0){
        memoryState = true
    }
    if (photoList.length){
        photoState = true
    }

    var totcols
    if (rightSection){
        totcols = "grid grid-cols-1 lg:grid-cols-[minmax(750px,_1fr)_380px] mt-3 space-x-5"
    }
    if (leftSection){
        totcols = "grid lg:grid-cols-[380px_minmax(750px,_1fr)] mt-3 space-x-5"
    }
    if (rightSection && leftSection){
        totcols = "grid lg:grid-cols-[380px_minmax(750px,_1fr)_380px] mt-3 space-x-5"
    }
    console.log('States : ', siblingsStateLeft, )
  
    if (memories.length > 0){
        memoryState = true
    }
    if (photoList.length){
        photoState = true
    }
  
    return (
    <div className={`${totcols}`}>
        {leftSection &&
            <div className="bordercontainer px-3">
                {siblingsState && 
                    <div >
                        <h3 className='h3'>Siblings:</h3>
                            {siblings?.map(s=>(
                                <div key={s.name} className="listitems"
                                >
                                    <ArrowCircleRightIcon className="h-7 text-red-500" />
                                    <p id={s.name} onClick={(e)=>{goToUser(e)}}>{s.name}</p>
                                </div>
                            )) }
                    </div>
                }
                {grandParentState && 
                    <div>
                        <h2 className="h2 mt-2">Ancestors</h2>
                        <div className="flex">
                            <ArrowCircleUpIcon className="h-7 text-red-500" />
                            <h3 className='h3 mt-1'>Grandparents:</h3>
                        </div>
                        {grandParent?.map(s=>(
                                <div key={s.name} className="listitems"
                                >
                                    <PlusCircleIcon className = "h-4 text-red-500" />
                                    <p id={s.name} onClick={(e)=>{goToUser(e)}}>{s.name}</p>
                                </div>
                            )) }
                    </div>
                }
                {greatGrandParentState && 
                    <div>
                        <div className="flex">
                            <ArrowCircleUpIcon className="h-7 text-red-500" />
                            <ArrowCircleUpIcon className="h-7 text-red-500" />
                            <h3 className='h3 mt-1'>Great Grandparents:</h3>
                        </div>
                        {greatGrandParent?.map(s=>(
                                <div key={s.name} className="listitems"
                                >
                                    <PlusCircleIcon className = "h-4 text-red-500" />
                                    <p id={s.name} onClick={(e)=>{goToUser(e)}}>{s.name}</p>
                                </div>
                            )) }
                    </div>
                }
                    {greatGreatGrandParentState && 
                    <div>
                        <div className="flex">
                            <ArrowCircleUpIcon className="h-7 text-red-500" />
                            <ArrowCircleUpIcon className="h-7 text-red-500" />
                            <h3 className='h3 mt-1'>Great Great Grandparents:</h3>
                        </div>
                        {greatGreatGrandParent?.map(s=>(
                                <div key={s.name} className="listitems"
                                >
                                    <PlusCircleIcon className = "h-4 text-red-500" />
                                    <p 
                                        id={s.name} onClick={(e)=>{goToUser(e)}}>{s.name}</p>
                                </div>
                            )) }
                    </div>
                }
                
            </div>
        }

        {/* Middle portion common to all */}
        <section className="bordercontainer px-3">
            <h3 className="h3 mt-1">Personal</h3>
                { personal1 && 
                    <div>
                        <p>{personal1}</p>
                        <p>{personal2}</p>
                    </div>

                    
                }
            <h3 className="h3 mt-1">Professonal</h3>
                { personal1 && 
                    <div>
                        <p>{professional1}</p>
                        <p>{professional2}</p>
                    </div>
                }
                {additional1 && 
                    <div>
                        <p>{additional1}</p>
                        <p>{additional2}</p>
                    </div>
                }
                {
                    memoryState && 
                    <div>
                        <h2 className="h2">Memories</h2>
                        <div className="grid grid-cols-2  lg:grid-cols-3
                                xl:grid-cols-4 mt-3 space-x-5">
                        {
                                memories?.map(m=>(
                                    <MemoryCard 
                                    key={m.id}
                                    id={m.id}
                                    item={m}/>
                                ))
                        }
                        </div>
                    </div>
                }
                {
                    photoState && 
                    <div className="mt-2 mb-2">
                        <h2 className="h2 mb-2">Photo Gallery</h2>
                        <div className="grid grid-cols-2  lg:grid-cols-3
                            xl:grid-cols-4 mt-3 space-x-5">
                            {
                                photoList?.map(m=>(
                                    <PhotoCard 
                                    key={m.title}
                                    id={m.title}
                                    item={m}/>
                                ))
                            }
                        </div>
                    </div>

                }
        </section>
        {
            rightSection && 
            <section className="bordercontainer px-3 -mx-3">
                {
                siblingsStateLeft && 
                    <div>
                        <h3>Siblings</h3>
                        {siblings?.map(s => (
                            <div key={s.name} className="listitems">
                                <ArrowCircleRightIcon className="h-7 text-red-500" />
                                <p id={s.name} onClick={(e)=>{goToUser(e)}}>{s.name}</p>
                            </div>
                        ))}
                    </div>
                }
                <h2 className="h2">Descendants</h2>
                {
                    grandChildrenState &&
                    <div>
                        <div className="flex">
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <h3 className="h3">Grand Children</h3>
                        </div>
                            {grandChildren.map((gc)=> (
                                <div key = {gc.name} className="listitems">
                                    <p  id = {gc.name} className="p"
                                        onClick={(e)=>{goToUser(e)}}>
                                        {gc.name}
                                    </p>
                                </div>
                            ))
                            }
                    </div>
                }
                {
                    greatGrandChildrenState &&
                    <div>
                        <div className="flex">
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <h3 className="h3">Great Grand Children</h3>
                        </div>
                            {greatGrandChildren.map((gc)=> (
                                <div key = {gc.name} className="listitems">
                                    <p  id = {gc.name} className="p"
                                        onClick={(e)=>{goToUser(e)}}>
                                        {gc.name}
                                    </p>
                                </div>
                            ))
                            }
                    </div>
                }
                                {
                    greatGreatGrandChildrenState &&
                    <div>
                        <div className="flex">
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <ArrowCircleDownIcon className="h-7 text-red-500" />
                            <h3 className="h3">Great Great Grand Children</h3>
                        </div>
                            {greatGreatGrandChildren.map((gc)=> (
                                <div key = {gc.name} className="listitems">
                                    <p  id = {gc.name} className="p"
                                        onClick={(e)=>{goToUser(e)}}>
                                        {gc.name}
                                    </p>
                                </div>
                            ))
                            }
                    </div>
                }
            </section>
        }
    </div>
  )
}

export default DetailBottom