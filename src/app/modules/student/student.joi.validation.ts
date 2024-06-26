import Joi from "joi";

//creating a schema validatin using Joi
 const userNameValidationSchema = Joi.object({
    firstName: Joi.string().required().max(20),
    middleName: Joi.string(),
    lastName: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+$')),
  });
  
  // Define Joi schema for Guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });
  
  // Define Joi schema for LocalGuardian
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  // Define Joi schema for Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

   export default studentValidationSchema;