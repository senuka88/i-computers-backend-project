//Here we are trying to build the connection between our project and a student collection in the database 

import mongoose from "mongoose" //import mongoose library

const studentSchema = new mongoose.Schema( // constant created for the structure/schema of a student collection which is like a template of what this collection should contain

    {
        name:String,

        age:Number,

        email:String,
    }
)

const Student = mongoose.model("Student",studentSchema) // creating a const connector to call the Student collection name and its schema/blueprint

export default Student //export the connector created 