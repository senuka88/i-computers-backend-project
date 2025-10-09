import express from "express"

 import { createUser, loginUser} from "../controllers/userController.js";


const userRouter = express.Router(); //create an empty user department with different http requests to be plugged

userRouter.post("/",createUser)
 userRouter.post("/login",loginUser) //if we put two post requests here , its like giving an address to the same house,
  //so we put the default post request to create user and /login one to login user from same request

export default userRouter