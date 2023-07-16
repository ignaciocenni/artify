import { useDispatch } from "react-redux";
import { multiplied } from "../../store/slice";

export default function ButtonCloseCart({id,setProducts}) {

  const dispatch = useDispatch();

  const cartList = JSON.parse(localStorage.getItem("products"));
  
  const handlerClick = async (id) => {

  const newCartList = cartList.filter(item=>item.id != id)
  localStorage.setItem("products", JSON.stringify(newCartList));
  setProducts(newCartList)

  const newList = await JSON.parse(localStorage.getItem("products"));
  if(newCartList.length === 0){
    dispatch(multiplied([]))
  }
  const quantityProducts = newList.map((product) => product.quantity);
  
  dispatch(multiplied(quantityProducts))
  
}
 
    return (
    <button onClick={()=> handlerClick(id)}
    className="px-3  py-1 rounded-r-lg hover:bg-[var(--background-sec)] hover:text-black text-white font-bold bg-[var(--detail)]  flex content-center items-center shadow-xl transition-colors ">
      X
    </button>
  )
}
