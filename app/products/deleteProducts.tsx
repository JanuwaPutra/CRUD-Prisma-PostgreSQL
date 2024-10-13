"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
  };


const DeleteProducts = ({product} : {product:Product}) => { 

    const [isOpen, setIsOpen]= useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handlemodal = () =>{
        setIsOpen(!isOpen)
    }
    
    const handleDelete= async (productId:number) => {
        setIsLoading(true);
        await axios.delete(`/api/products/${productId}`);
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
      };

    return(
        <div>
            <button className="btn btn-error btn-sm" onClick={handlemodal}>Delete</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-boold text lg">Are you sure to delete {product.title}?</h3>
                  
                       
                        
                    <div className="modal-action">
            <button type="button" className="btn" onClick={handlemodal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
                        </div>
                  
                        </div>
                </div>
            </div>

    )
}

export default DeleteProducts