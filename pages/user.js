import {useRouter} from "next/dist/client/router"
import useSWR from 'swr'
import Image from "next/image"

import TopLeft from "../components/user/TopLeft"
import DetailBottom from "../components/user/DetailBottom"

const fetcher = async(url) => {
    // console.log('In fetcher : ', url)
    const res = await fetch(url)
    const data = await res.json()
    // console.log('In fetcher ', data)
    if (res.status !== 200) {
        throw new Error(data.message)
    }

    return data
}
function user() {
    const router = useRouter()
    const {membername} = router.query
    // console.log('UserName in User: ', membername)
    
    var memoryState = false
    var photoState = false
    var isLoading = true
    var childrenState = false
    var familyTree = false
    var spouseState = false

    const {data, error} = useSWR(
        ()=> membername && `/api/member/${membername}`,
        fetcher, {
            dedupingInterval: 3600000,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    if (!membername) {
        return (
            <div className="text-center">
                <h2 className="h2">
                    Please send user request with correct credentials
                </h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center">
                <h2 className="h2">
                    Please try again ... Some Error
                </h2>
            </div>
        )
    }

    if (data){
        isLoading = false
    }

    if (isLoading) {
        return (
            <div className="text-xl text-center">
                <h1>Please Wait Images take time .. 🤳🤳 ... Free Database 😎 ... And Large ... 🙌🙌🙌🙌</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div style={{textAlign: 'center', marginTop: '5rem', marginBottom: '5rem'}}>
                <h1>Something went wrong 😢😢😢 Do try again with correct details</h1>
            </div>
        )
    }

    var mname = data.member.member[0].name 
    var totcols = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-5 mt-3"
    if (data.member.member[0].spouse) {
        mname = mname + ' &  ' + data.member.member[0].spouse 
        spouseState = true
        totcols = "grid lg:grid-cols-4 md:grid-cols-2 space-x-5 mt-3"
    }
    spouseState = true

    const imagePath = `/${data.member.member[0].imageURL}`
    const spouseImagePath = `/${data.member.member[0].spouseImageURL}`
     
  return (
    <div className="container">
        <h1 className="h1 text-center">
            {mname}
        </h1>

        <section className={`${totcols}`}>
            <TopLeft className="items-stretch"
                items={data.member.member} 
                parents={data.member.parents}
                kids={data.member.children}
            />
            <div className="flex justify-center my-3">
                <div className="relative h-[320px] w-[320px] border-2 border-blue-500 rounded-lg">
                    <Image src={`${imagePath}`}
                    layout="fill"
                    className="rounded-lg border-2 border-yellow-500"
                    />
                    {/* <p>Hello</p> */}
                </div>
            </div>
            <div className="flex justify-center my-3">
                {
                    spouseState && 
                    <div className="relative h-[320px] w-[320px] border-2 border-red-500 rounded-lg ">
                        <Image src={`${spouseImagePath}`}
                        layout="fill"
                        className="rounded-lg"
                        />
                    </div>
                }
            </div>

            <div className="bordercontainer -mx-3">
                <div className="flex gap-2">
                    <h3 className="h3">Education</h3>
                    <p>{data.member.education}</p>
                </div>
                <div className="flex gap-2">
                    <h3 className="h3">Profession</h3>
                    <p>{data.member.profession}</p>
                </div>
            </div>
        </section>
        
        <section>
            <DetailBottom 
                items={data.member}
                memories={data.memories}
                photoGallery={data.photoGallery}
            />
        </section>
    </div>
  )
}

export default user