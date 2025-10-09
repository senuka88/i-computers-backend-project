import express from "express" // add the express function from the "express folder"

import mongoose from "mongoose"

// import Student from "./models/student.js"

// import studentRouter from "./routes/studentRouter.js"

import userRouter from "./routes/userRouter.js"

import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js"

const app = express() //variable that declares the whole backend furnished by express from this function

const MongoURI = "mongodb+srv://admin:123@cluster0.lpzi9u3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//This is the key of the MongoDB database cluster as a URL to connect our project with the database

mongoose.connect(MongoURI).then( 
    ()=>{
        console.log("MongoDB Cluster is connected")
    }
    
) //connects MongoDB cluster with our project and it would take some time, then is used to show that if the connection happens then this
  //comment should be printed

// function abc(){

//     console.log("server is running")
// }
// abc();

// app.listen() calling the application to start its work

//  app.listen(3000,abc) //calling the application to start its work on the portn number 3000/5000 , if the app has started its work, then
                         //this function abc should run

app.use(express.json())

// app.get("/",   
    
//  (req,res)=>{

// // console.log(req.body.name)    

// // res.json({
// //     message:" Good Morning " + req.body.name

// Student.find().then(
    
//     (students)=>{

// res.json(students)

// }
// )

// })


// app.post("/",

//     (req,res)=>{

//         // res.json({

//         //     message:"Good Evening" + req.body.name

//             console.log(req.body.name)  //Read data inside the request
            
//             const student = new Student(req.body) //a student with relevant criteria that could be saved in the databse

//             student.save().then(

//                 ()=>{

//                     res.json({
//                         message:"Student Created successfully"
//                     })

//                 }) //save this student in the databse and if successful then display this message for confirmation
 
//         })

//         //})


//         app.put("/",

//     (req,res)=>{

//         res.json({

//             message:"See you soon" + req.body.name
//         })

//         })
    


//     app.delete("/",

//     (req,res)=>{

//         res.json({

//             message:"Goodbye" + req.body.name
//         })

//         })
//creation of an empty middleware that does changes in requests before passing it to other personell but since it is empty it does
        //not pass it to other personell to gain responses but it keeps the request to itself so login does not work

app.use( //irrespective of type of a request,this blue function would run
    (req,res,next)=>{ //req info, res info and next in middleware suggests a function 
        
        const authorizationHeader = req.header("Authorization") //reading the authorization header from the request

        if (authorizationHeader !=null){ //if there is a token in the authroization header

            const token = authorizationHeader.replace("Bearer " , "") //replace bearer and space part that comes with the token

            // console.log(token)

            jwt.verify(token,"secretkey96$2025", //used to decrypt the authorization header by providing token and secret key 

            (error,content)=>{ //error in token and content inside the token should be shown if there is an error in decryption

                if(content==null){ //this means somebody has tried to decrypt with an invalid token

                    console.log("invalid token") //if somebody has used an invalid token

                    res.json({

                        message:"invalid token" //this response should be generated if token cannot be decrypted
                })

           return//return is used to stop the function and not allow access to the next process


                }
                else{
               // console.log(content) // token content should be printed after decryption

                req.user=content //take the request and put the content and label as a user

                next() //send to next personell


            }

        }
        )

    }else{


        next() //allows logged in users to go without auth header token
    }
        }
        //console.log(authorizationheader) //print authorization header

        //console.log("****"); //token is obtained but with "bearer" title in the front

        //next() //when this function is run , the request is obtained and handed to the next personell


)//      
    // app.use("/students", studentRouter) //used to plug the router to the main connection running which is the localhost:5000
    app.use("/users", userRouter)
    app.use("/products",productRouter)
    

app.listen(5000,()=>{

    console.log("server is running") //this is an arrow function ,we can create a function here at once without adding names

})
    