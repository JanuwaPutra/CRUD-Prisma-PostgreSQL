"use client"
import { useState, SyntheticEvent } from "react"
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddProducts = ({brands} : {brands:Brand[]}) => { 
    const [title, setTitle]= useState("")
    const [price, setPrice]= useState("")
    const [brand, setBrand]= useState("")
    const [isOpen, setIsOpen]= useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handlemodal = () =>{
        setIsOpen(!isOpen)
    }
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/products", {
          title: title,
          price: Number(price),
          brandId: Number(brand),
        });

        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
        setIsLoading(false);
      };

    return(
        <div>
            <button className="btn" onClick={handlemodal}>Add New</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-boold text lg">Add new Products</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Products Name</label>
                            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className="input input-bordered" placeholder="Products Name"/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="number"  value={price} onChange={(e)=> setPrice(e.target.value)} className="input input-bordered" placeholder="Price"/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select  value={brand} onChange={(e)=> setBrand(e.target.value)} className="select selected-bordered">
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
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
                        </div>
                    </form>
                   
                </div>
            </div>
        </div>
    )
}

export default AddProducts