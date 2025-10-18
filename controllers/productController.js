import Product from "../models/Product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){

 if( ! isAdmin(req)){  //if isAdmin (req) is false meaning req sent is by a user or null

     res.status(403).json({ //unathorized access for user, so forbidden response msg should be shown if it is not an admin
     message:"Forbidden"

    })

    return// function end

 } 


    const product = new Product(req.body); //if function is true and admin sends it , then new product should be created from request body

    product.save().then( //product should be saved in the DB

        ()=>{
            
            res.json({

                message:"Product created successfully" //successful product creation msg should be shown
            })
        }

    ).catch(

        (error)=>{

            res.status(500).json({ //unathorized access for users so response msg showed for user if it is not an admin
            message:"Error creating product",
            error:error.message,

        });

        }
    );
        
}


export async function getAllProducts(req,res){ //get all products available

    try{   //implement async functions to use await funcion to get all products

    if(isAdmin(req)){
    // if(isAdmin(req)){ //if isAdmin request is true

    //     Product.find() .then( //all products should be taken from DB

    //         (products)=>{
    //             res.json(products) //all products should be shown as a response which are available
    //         })
        
    //     .catch((error) => {

    //         res.status(500).json({ //response msg showing database error 
    //         message:"Error fetching products", //error msg should be shown as response
    //         error:error.message
    //          });

    //         });

    const products = await Product.find()

    }else{

         Product.find({isAvailable : true}) .then( //only available products should be shown when user sends request 

            (products)=>{ //products are taken from const
                res.json(products) //if it is not admin, sending the request then only available products should be shown to user/logged in or not
            }
        
        )   
        .catch((error) => {

            res.status(500).json({ //response msg showing database error when fetching products
            message:"Error fetching products",
            error:error.message
             });


        });

}

    }catch(error){
        res.status(500).json({
            message:"Error fetching products",//when any other form of error occurs,a resposne msg is also shown
            error:error,
        });
    }
}


export function deleteProduct(req,res){ //delete products

    if(!isAdmin(req)){ //if isAdmin request is false
        
        res.status(403).json({

            message:"Only admins can delete products" //error response msg showing only admins can delete (forbidden msg)
        })
        
        return //function ends
    }

    const productID= req.params.productID //take product id from request  in the paramaters and delete that id without any json

    Product.deleteOne({productID:productID}) //delete productid from the productid sent in request from the collection in DB

.then(()=> {
    
    res.json({ 

        message:"Product deleted successfully" //successful product deletion msg shown

})
}

)
}


export function updateProduct(req,res){ //update product info

    if(!isAdmin(req)){//if isAdmin request is false
        
        res.status(403).json({

            message:"Only admins can update products"//error response msg showing only admins canupdate (forbidden msg)
        })
        
        return
    }

    const productID= req.params.productID //take product id from request  in the paramaters and update that id without any json

    Product.updateOne({productID:productID},req.body) //show product info in the body from the productid sent in request from the collection in DB

.then(()=> {
    
    res.json({ 

        message:"Product updated successfully" //successful product updation msg

})
}

)
}


export function getProductByID(req,res){

   
    const productID= req.params.productID //take product id from request in the paramaters 

    Product.findOne({productID:productID},req.body) //find productid from the productid sent in request from the collection in DB

.then((product)=> {
    
  if(product == null){ //if product is null

    res.status(404).json({
        message:"Product is not found" //not found response msg should be shown
    })
  }

else{

    if(product.isAvailable){//check if product is avilable

        res.json(product)  //if product is available then send the response of the product
    }else{

        if(isAdmin(req)){ //if it is admin, then send the response of the products not available

            res.json(product)//send the response of product
        
    }else{
        res.status(404).json({
            message:"Product not found" //send response msg if it is user asking for all inclusive(unavailable) products
        })
    }

}

}

}

).catch((error)=>{

    res.status(500).json({
        message:"Error fetching product", //error response msg showing products couldn't be fetched
        error:error.message
    })
}


)

}

// function isAdmin(req,res){

//       if(req.user == null){ //if request sent by user is null meaning not admin
//         res.status(401).json({ //unathorized access message should be shown
//             message:"Forbidden"

//         })

//         return false//stop function if user has not sent any token
//     }

//     if(req.user != "admin"){ //if request sent by user is not admin
//         res.status(403).json({ //unathorized access should be shown
//             message:"Forbidden"

//         })

//         return false
//     }

//     return true

// }


///THE ABOVE FUNCTION IS IN THE userController since it is used more frequently in the project