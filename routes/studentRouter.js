import express from "express"

import {  getStudents,createStudent,deleteStudent , updateStudent} from "../controllers/studentController.js"

const studentRouter = express.Router();

studentRouter.get("/", getStudents);
studentRouter.post("/", createStudent);
studentRouter.put("/", updateStudent);
studentRouter.delete("/", deleteStudent);

export default studentRouter; 