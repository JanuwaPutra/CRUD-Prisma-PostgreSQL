import { PrismaClient } from "@prisma/client"
import AddProducts from "./addProducts";
import DeleteProducts from "./deleteProducts";
import UpdateProducts from "./updateProducts";
const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div>
      <div className="mb-2">
        <AddProducts brands={brands} />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td className="flex justify-center space-x-1"><UpdateProducts brands={brands} product={product }/>
                <DeleteProducts product={product}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product
