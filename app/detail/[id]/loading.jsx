import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex flex-col justify-center items-center">
        <Image src="https://i.pinimg.com/originals/ea/b7/e1/eab7e1120c9dd628d3bb39a20a94927d.gif" alt="cargando.." width={400} height={400} />
        <h1 className="font-bold text-xl">Cargando...</h1>
    </div>
  }