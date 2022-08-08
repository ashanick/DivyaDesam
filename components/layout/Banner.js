import Image from "next/image"

function Banner() {
  return (
    <div className="relative h-[400px]">
        <Image src="/images/BannerImage.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            />
        <div className="absolute top-1/2 w-full text-center">
            <p className="text-2xl">
                Iyengars Ancetral Villages
            </p>
        </div>
    </div>

  )
}

export default Banner