import prisma from "../../db/client";

const getProduct = async (id) => {
  const searchedUser = await prisma.Product.findFirst({
    where: {
      id: +id,
    },
    include: {
      reviews: true,
      province: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          email: true,
          name: true,
          lastName: true,
          image: true,
          socials: true,
        },
      },
    },
  });
  if (!searchedUser) throw new Error("Product doesn't exist");
  return searchedUser;
};

const updateProduct = async (id, name, description, price, stock, images, status, provinceId) => {
  // Validates:
  //Name
  const nameRegex = /^[a-zA-Z0-9\s.,áéíóúÁÉÍÓÚñÑ]*$/;

  if (!nameRegex.test(name)) throw new Error("The must be a normal name...");

  // Description

  //if (description.length <= 10 && !nameRegex.test(description)) throw new Error("The description must contain at least 10 characters.");

  // Price
  if (price <= 0) throw new Error("Price cannot be less than or equal to $0");

  // Stock
  if (stock < 0) throw new Error("Stock cannot be less than 0 units.");


  if (stock === 0) {
    prisma.product.update({
      where: {
        id: +id,
      },
      data: {
        status: "INACTIVE",
      },
    });
  }
  //Image

  const product = await prisma.product.update({
    where: {
      id: +id,
    },
    data: {
      name: name,
      description: description,
      price: price,
      stock: stock,
      image: images,
      status: status,
      provinceId: provinceId,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  const searchedUser = await prisma.Product.findFirst({
    where: {
      id: +id,
    },
  });
  if (!searchedUser) throw new Error("Product doesn't exist");
  const searchIdProd = await prisma.Product.delete({
    where: {
      id: +id,
    },
  });
  return searchIdProd;
};

export { getProduct, deleteProduct, updateProduct };
