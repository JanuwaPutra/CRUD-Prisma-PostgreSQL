"use client"
import { useState, SyntheticEvent } from "react"
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
  };

const UpdateProducts = ({brands,product} : {brands:Brand[];product:Product}) => { 
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);
    const [isOpen, setIsOpen]= useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handlemodal = () =>{
        setIsOpen(!isOpen)
    }
    
    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/products/${product.id}`, {
          title: title,
          price: Number(price),
          brandId: Number(brand),
        });
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
      };

    return(
        <div>
            <button className="btn btn-info btn-sm" onClick={handlemodal}>edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-boold text lg">Update {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Products Name</label>
                            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="input input-bordered" placeholder="Products Name"/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="number"   value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input input-bordered" placeholder="Price"/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select  value={brand} onChange={(e)=> setBrand(Number(e.target.value))} className="select selected-bordered">
                                <option value="" disabled>Select a Brand</option>
                                {brands.map((brand)=>(
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="modal-action">
              <button type="button" className="btn" onClick={handlemodal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
                        </div>
                    </form>
                   
                </div>
            </div>
        </div>
    )
}

export default UpdateProducts