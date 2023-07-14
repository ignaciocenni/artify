"use client"

import { useEffect, useState } from "react"
import BuyNowButton from "../components/buttons/BuyNowButton"
import CardCart from "../app/cart/cardCart/CardCart"
export default function CartComponent () {
    const [products, setProducts] = useState([])
    //const [price, setPrice] = useState([])
    useEffect(() => {
      const cartProducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(cartProducts)
      
      // const totalPrice = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      // setPrice(prices)
      // console.log(price);
    }, [])
    
    return(
    <div className="flex mx-auto w-full md:w-3/5 lg:w-2/5 xl:w-1/3 items-start justify-center gap-10">
      <div className="flex flex-col p-4 bg-[var(--primary)] rounded-2xl shadow-md shadow-gray-600">
        <h1 className="text-2xl font-medium pb-2  ">Productos</h1>
        {products.length && products.map((product) => (
          <CardCart
            key={product.id}
            id={product.id}
            name={product.title}
            image={product.image}
            price={product.unit_price}
            stock={product.stock}
            quantity={product.quantity}
          />
        ))}
      </div>
      <div className="flex flex-col p-4 bg-[var(--primary)] rounded-2xl shadow-md shadow-gray-600">
        <h1 className="font-bold">{products.price_multiplied}</h1>
      <BuyNowButton/>
      </div>
    </div>
    )
}