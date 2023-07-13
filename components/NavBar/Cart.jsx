'use client'
import Image from 'next/image';
import cart from '../../public/images/cart.svg';
import { useSelector } from 'react-redux';
export default function Cart() {
  const amound = useSelector((state) => state.valores.products)
  return (
<div className="relative">
  <Image src={cart} alt="cart" />
{amound.length>0 &&
  <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-purple-500 rounded-full border-2 border-black">
    <span className="text-white text-xs">{amound.length}</span>
  </div>
  }
</div>
  )
}