import { NextFunction, Request, Response } from "express";
import { Userservices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {password, student: studentData } = req.body;
    // const zodparsedData = studentValidationSchema.parse(studentData)
  
     const result = await Userservices.createStudentIntoDB(password, studentData);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student is created sucessfully',
        data: result,
      });
    } catch (err) {
     next(err)
    }
  };
  
  export const UserControllers = {
    createStudent,
  };