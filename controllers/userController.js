import User from "../models/User.js";

import bcrypt from "bcrypt" //bcrpt is used for hashing passwords which turns plain passwords to hashed ones using hashing algorithms

import jwt from "jsonwebtoken" // jsonwebtoken is used as a library to obtain encryption tokens

export function createUser(req,res){

    const data = req.body //reading the json data provided by the client

    const hashedPassword =  bcrypt.hashSync(data.password , 10) //turn the plain password of a user to a hashed version using 10 salt rounds meaning 
                                                                  //the password is hashed 10 times, time after time
  res.json({hashedPassword})
    
     const user = new User({

    email:data.email,
    firstName :data.firstName,
    lastName:data.lastName,
    password: hashedPassword , // A new user created with these details from the User model/schema created according to the given path at the top
    role : data.role,
     })

    user.save().then(
         ()=>{
             res.json({
               message: "User created successfully" //user has been created and sent to the front-end
           })
        }
    )
    
 }

 export function loginUser(req,res){

    const email = req.body.email //get email from the request body
    const password = req.body.password //get password from the request body

     User.find({email : email}).then( // find a user with the provided email , if yes

       (users)=>{ // user list of current users are provided here

      //   console.log(users)
            if(users[0]==null){ // if users array / users are empty
                 res.json({
                    message: "User is not found"
                 });

             }else{
                const user = users[0]
                
               //    if(user.invalidTries>=3){ //if user invalid tries when adding passwords are greater than 3 then user's account would be temporarily blocked

               //    res.json({

               //      message:"Your account is temporarily locked"
               //    });

               //     return;
               //   }
                
                
                // first one in the user array available in the array list

                 const isPasswordCorrect =  bcrypt.compareSync(password,user.password) //compare user password and password of user present in the
                                                                                        //  database as a hashed version if it is same
                 
               if(isPasswordCorrect){

                  const payload={ //all required user content are created in a json format as a constant to be used to be encrypted as a token

                     email:user.email,
                     firstName:user.firstName,
                     lastName:user.lastName,
                     role:user.role,
                     isEmailVerified:user.isEmailVerified,
                     image:user.image

                  };

                  const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"150hrs"}) //we put the user content from payload and add a unique secret key to generate a token and expiration time of token

                  //the secret key is like a signature that cannot be read and only the payload/content after decryption from token can be read
                     res.json({

                       //matching:isPasswordCorrect---- //true or false response would be provided if password is similar or not

                       message:"Login Successful", //in the future, a token would be provided to each customer

                       token:token,
                        //separate token is generated as an identity if login is successful to the user with all user information/content

                       role:user.role,

                     });

                  }else{
                     //  User.updateOne(  //if password is wrong
                     //     {email:email},
                     //     { invalidTries : user.invalidTries + 1 } //then user's invalid tries increases by 1 , once it hits 3 , the account would be temporarilt blocked
                     //  ).then(()=>{
                        res.status(401).json({ //status code saying 401 means unauthorized for access if password is wrong

                           message:"Invalid password", //invalid password should be shown as a msg when user has invalidtries
                        })
                     //  })

                   }
                  
                }
         });

 }


 export function isAdmin(req){

      if(req.user == null)
         { //if request sent by user is null meaning not admin
        return false;//stop function if user has not sent any token
    }

    if(req.user.role != "admin"){ //if request sent by user is not admin

        return false;
    }

    return true;
                               //no need to return json response msg bcz it is 
}