import express from "express"

import { getAllProducts , createProduct , deleteProduct, updateProduct, getProductByID} from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/" ,getAllProducts)

productRouter.get("/:trending",(req,res)=>{

    res.json(
        {message:"trending products endpoint"} // this would not work bcz in our second get request we say anything that comes after / should eb taken as a 
         // a value, so this is also a similar request like that to show trending requests as after "/" , the trending products msg should be shown , but since the second get request runs before this one, the current get request wouldn't run so we have to put those
         //type of requests with ids taken as parameters below theese type of ones
    )

})

productRouter.get("/:productID",getProductByID)

productRouter.post("/" ,createProduct)

productRouter.delete("/:productID" ,deleteProduct) // in this delete request,after the / , the productid should be provided as a value , anything after that / , is taken as the product value and will be deleted

productRouter.put("/:productID",updateProduct)  // in this update request,after the / , the productid should be provided as a value , anything after that / , is taken as the product value and will be updated



export default productRouter