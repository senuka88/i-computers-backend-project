import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email:{

            type:String,
            required:true,
            unique:true,
        },

       firstName:{

        type:String,
        required:true,

        
       },

       lastName:{

        type:String,
        required:true,  //unique==true is not added in frist and lastnames as many users 
                        //could have the same name
      

       },

       password:{

        type:String,
        required:true,

       },

       role:{

        default:"customer",
        type:String

       },

       isBlocked:{

        type:Boolean,
        default:false,

       },

       isEmailVerified:{

        type:Boolean,
        default:false,

       },

       image:{

        type:String,
        required:true,
        default:"/default.jpg"

       },

        // invalidTries:{ //invalid login 3 times===user locked

        // type:Number,
        // default:0

    //    }

       
       }
    
)


const User = mongoose.model("User", userSchema)

export default User;