import Student from "../models/Student.js";

export function getStudents(req,res){

    // Student.find().then((students)=>{

    //     res.json(students);

    // });

   if(req.user == null){ //if token is null/empty then message should be shown

    res.status(401).json({ //status code saying 401 means unauthorized for access if token is empty or null 
        message: "cannot find user please try again " //response msg saying user is not found
    })

    return //stop the function as user is not found
   }

     if(req.user.role !="admin"){ //if command showing admins are only allowed to view students

        res.status(403).json({ //status code 403 saying that except admins , access is forbidden to view students
        message: "only admins can view students " //response msg saying admins can only view students
    })

    return //stop the function as user is not found
   }

   Student.find().then((students) =>{

    res.json(students);

   });

   }


export function createStudent(req,res){

//Reads the data inside the request

console.log(req.body);

const student = new Student(req.body);

student.save().then(() =>{
    
    res.json({

        message:"Student created successfully"
    });
});

}

export function deleteStudent(req,res){

    res.json({

        message:"Goodbye" + req.body.name

    });

}

export function updateStudent(req,res){

    res.json({

        message: "See you soon " + req.body.name
    })
}