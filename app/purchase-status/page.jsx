"use client";
import axios from "axios";
import Link from "next/link";
import ApprovedStatus from "../../components/PurchaseStatus/ApprovedStatus";
import RejectedStatus from "../../components/PurchaseStatus/RejectedStatus";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { multiplied } from "../../store/slice";
import { sendContactForm } from "../../components/lib/api";
import { useRouter } from "next/navigation";

export default function PurchaseStatusComponent() {
  const [products, setProducts] = useState([]);
  const [redirectTimer, setRedirectTimer] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const data = useSession();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  const sendEmail = async () => {
    if (data?.data?.user.email && data?.data?.user.name !== undefined) {
      const totalPrice = products.reduce((accumulator, product) => {
        const productTotal = product.quantity * product.unit_price;
        return accumulator + productTotal;
      }, 0);
      const form = {
        total: totalPrice,
        details: products,
        email: data?.data?.user.email,
        name: data?.data?.user.name,
        status: status,
        type: "purchase",
      };
      await sendContactForm(form);
    }
  };
  const peticionPost = (products) => {
    let customer = "";
    if (data?.data?.user.id !== undefined) {
      customer = data?.data?.user.id;
    }
    products.forEach(async (product) => {
      const url = `/api/sales`;
      const content = {
        productId: product.id,
        sellerId: product.sellerId,
        totalPrice: product.unit_price * product.quantity,
        customerId: customer,
        productQuantity: product.quantity,
      };

      await axios
        .post(url, content)
        .then((response) => {
          console.log("post exitoso", response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };
  if (status === "null") {
    router.push("/");
  }
  useEffect(() => {
    const productsLS = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(productsLS);
    const updatedStockProducts = productsLS.map((product) => ({
      id: product.id,
      stock: product.stock - product.quantity,
    }));

    if (status === "approved") {
      peticionPost(products);
      sendEmail();
      updatedStockProducts.forEach(async (product) => {
        const url = `/api/products/${product.id}`;
        const data = { stock: product.stock };

        await axios
          .put(url, data)
          .then((response) => {
            console.log("put exitoso", response);
          })
          .catch((error) => {
            console.log(error.message);
          });
      });

      if (localStorage) {
        localStorage.removeItem("products");
        dispatch(multiplied([]));
      }
    } else if (status === "in_process" && localStorage) {
      localStorage.removeItem("products");
      dispatch(multiplied([]));
    }
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    const interval = setInterval(() => {
      setRedirectTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [data?.data?.user.email, data?.data?.user.name]);

  return (
    <div className="bg-[var(--primary)] mt-[10vh]">
      <div className="h-[8vh] p-5">
        <Link href={"/"}>
          <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-tl rounded-tr rounded-bl rounded-br shadow-md mr-4 mt-2 mb-2">
            Volver
          </button>
        </Link>
      </div>
      {status === "approved" && (
        <ApprovedStatus redirectTimer={redirectTimer} />
      )}
      {status === "rejected" && (
        <RejectedStatus redirectTimer={redirectTimer} />
      )}
    </div>
  );
}
