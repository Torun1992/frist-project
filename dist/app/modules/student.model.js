"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = new mongoose_1.Schema({
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
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not valid...'
        }
    },
});
const guardianSchema = new mongoose_1.Schema({
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
const localGuardianSchema = new mongoose_1.Schema({
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
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
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
}, {
    toJSON: {
        virtuals: true,
    },
});
//virtual 
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
});
//query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//creating a custom static method
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Student.findOne({ id });
        return existingUser;
    });
};
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
