import Image from "next/image"
import {useState} from 'react'

function LargeCard({img, title, description, buttonText}) {

  return (
    <section className="relative py-4 cursor-pointer">
        <div className="relative h-[300px] w-[800px] md:w-[800px]  
            lg:w-[600px] lg:h-[400px] xl:w-[900px] xl:h-[500px]">
            <Image 
                src={img} layout="fill" 
                objectFit="cover"
                className="rounded-2xl"
                objectPosition="none"
                />
        </div>
        <div className="absolute top-32 left-12">
            <h3 className="text-4xl mb-3 w-80">{title}</h3>
            <p>{description}</p>
            <button className="text-sm text-white bg-gray-900
                px-4 py-2 rounded-lg mt-5">
                {buttonText}
            </button>
        </div>
    </section>
  )
}

export default LargeCard