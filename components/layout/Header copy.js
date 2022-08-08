import Image from "next/image"
import {useState} from 'react'
import {useRouter} from "next/dist/client/router"
import { LinkIcon, SearchCircleIcon } from "@heroicons/react/solid"

const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];

function Header() {
    const router = useRouter()
    const [clickSearch, setClickSearch] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [searchConnections, setSearchConnectons] = useState(false)

  return (
    <header className="sticky top-0 z-50 
        grid grid-cols-3 bg-black shadow-md
        p-5 md:px-10">
        <div className="flex relative items-center h-[64px] 
            cursor-pointer" 
            onClick={()=>router.push('/')}>
            <Image src="/images/Iyengars logo.png" 
                layout="fill" 
                objectFit="contain"
                objectPosition='left'/>
        </div>
        <div className="flex items-left border-2 
            rounded-full py-2 md:shadow-sm hover:scale-110">
                    <button className="items-center flex-grow justify-center text-lg text-semibold text-red-600 
                        px-5 flex space-x-5 md:text-2xl"
                        onClick={()=>setClickSearch(!clickSearch)}>
                        <SearchCircleIcon className="px-2 h-6" /> People & Links
                    </button>
        </div>
        <div>
            Menu
        </div>

        {clickSearch && 
            <div className = "mt-5 flex flex-col col-span-3 mx-auto text-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 space-x-5 ">
                    <input className="text-gray-50 p-2 rounded-full text-center w-15 "
                        type="text" 
                        placeholder="Part or full name"
                        // value={searchInput}
                        onChange={(e)=>setSearchInput(e.target.value)}
                    />
                    <div className="flex space-x-2 itens-start mt-2">
                        <h3 className="h3">Ancestry </h3>
                        <ul className="py-1 " aria-labelledby="dropdown"></ul>
                            {
                                people.map(city => {
                                    return (
                                        <a className="block" key = {city.name} value={city.name}>{city.name}</a>
                                    )
                                })
                            }
                    </div>
                    <div className="flex space-x-2 items-center mt-2">
                        <h3 className="h3">City </h3>
                        <select id='cityname' >
                            {
                                people.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex space-x-2 items-center mt-2">
                        <h3 className="h3">Education </h3>
                        <select id='cityname' >
                            {
                                people.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <h3 className="h3">Profession </h3>
                        <select id='cityname' >
                            {
                                people.map(city => {
                                    return (
                                        <option key = {city.name} value={city.name}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="flex mt-4 justify-center space-x-5">
                    <button className="button border-green-500 border-spacing-5 w-[200px] text-green-500 
                        font-bold text-xl">Search</button>
                    <button className="button border-red-500 border-spacing-5 w-[200px] text-red-500 
                        font-bold text-xl">Reset</button>
                </div>
            </div>
        }
        
    </header>
  )
}

export default Header