import connectDB from "@/dataBase/dbconfig";
import { random,authentication } from "@/helpers/encryption";
import { createUser, getUserByEmail } from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest, res: NextResponse)=>{
    try {
        const data = await req.json();
        const {username, email ,password} = data;
        // console.log(data);

        if (!username || !email || !password) {
            return NextResponse.json({error: "Enter username or email"},{status:404});
        }

        const existUser = await getUserByEmail(email);
        console.log(existUser);
        if (existUser) {
            console.log("User already exists");
            return NextResponse.json({error: 'User already exists'},{status: 409});
        }
        
        const salt = random();

        // Create a new user with the same password but encrypted
        createUser({
            username: username,
            email: email,
            authentication: {
                salt,
                password : authentication(salt, password),
            }
        })

        return NextResponse.json({message: "User created"},{status: 200});
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message},{status:404});
    }
}