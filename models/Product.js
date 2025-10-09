
import mongoose from "mongoose"

const productSchema = new mongoose.Schema( //create product schema

{

    productID:{ //give unique identification for each product through product id

        type:String,
        required:true, //required suggests this property needs to definitely be there 
        unique:true
    },

    name:{
        type:String,
        required:true

    },

    altNames:{ // other names that can be given apart from same name
        type:[String] // means a string array which can have different names
        ,default:[] //string array will be store empty if no names are given
    },

    description:{

        type:String,
        required:true,
    },

    price:{ //original price

        type:Number,
        required:true
    },

    labelledPrice:{ //labelled/discounted price
        type:Number,
        required:true
    },

    images:{
        type:[String], //images array with image links
        required:true
    },

    category:{ //product category

        type:String,
        required:true
    },

    brand:{

        type:String,
        required:true,
        default:"no brand" // default will be saved if no brand is given

    },

    stock:{

        type:Number,
        required:true,
        defualt:0 //defualt stock is saved as 0

    },

    isAvailable:{ //if product is available or not

        type:Boolean,
        default:true

    }


}


)

const Product = mongoose.model("Product",productSchema) // creating a const connector to call the Product collection name in the DB and its schema/blueprint

export default Product //export the connector