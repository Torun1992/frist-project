import { Schema, model } from "mongoose";
import validator from "validator";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student/student.interface";


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required..."],
    trim: true,
    maxlength: [20, "Frist Name can not be more then  20"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.chartAt(0).toUpperCase() + value.slice(1); //Torun
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate:{
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid...'
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user:{
   type : Schema.Types.ObjectId,
   required: [ true , 'User ID is required'],
   unique: true,
   ref: 'User'
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { 
    type: String,
    required: true, 
    unique: true, 
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type'

    // }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON:{
    virtuals: true,
  },
},
);

//virtual 
studentSchema.virtual('fullName').get(function() {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});



//query Middleware
studentSchema.pre('find', function(next){
this.find({isDeleted: {$ne: true}});
next();
});
studentSchema.pre('findOne', function(next){
this.find({isDeleted: {$ne: true}});
next();
});

studentSchema.pre('aggregate', function(next){
this.pipeline().unshift({$match: {isDeleted : {$ne : true}}})
next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await Student.findOne({id})
  return existingUser;
}

export const Student = model<TStudent, StudentModel>("Student", studentSchema);

