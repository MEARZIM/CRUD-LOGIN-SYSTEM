import mongoose, { Model } from "mongoose";
import connectDB from "@/dataBase/dbconfig";

connectDB();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },
    email: {
        type: String,
        required: [true, "Please enter a email address"],
    },
    authentication: {
        password: {
            type: String,
            required: [true, "Please enter a password"],
            select: false
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    }
});
// const userModel = mongoose.model("users", userSchema);  


//- error Error [OverwriteModelError]: Cannot overwrite `users` model once compiled.
// The next part will help to handle the above error
let userModel : Model<any>;

try {
    userModel = mongoose.model('users');
} catch {
    userModel = mongoose.model('users', userSchema);  
}


//actions
export const getUsers = () => userModel.find();
export const getUserByEmail = (email : string) => userModel.findOne({email});
export const getUserBySessionToken = (sessionToken :string) => userModel.findOne({"authentication.sessionToken" : sessionToken});
export const getUserById = (id : string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user: any) => user.toObject());
export const deleteUserById = (id : string) => userModel.findByIdAndDelete({_id : id});
export const updateUserById = (id : string , value : Record<string,any>) => userModel.findByIdAndUpdate(id, value);

  