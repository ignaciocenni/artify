"use client";
import DetailContent from "../../../components/DetailContent";

const dataFetching = async (id) => {
  let product = await fetch(`/api/products/${id}`);
  product = await product.json();
  return product;
};

const Detail = async ({ params }) => {
  const id = params.id;
  const data = await dataFetching(id);
  return (
    <>
      <DetailContent data={data} />
    </>
  );
};
export default Detail;
