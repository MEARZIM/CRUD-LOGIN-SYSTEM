import { getUserBySessionToken, getUsers } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, responce: NextResponse)=>{
    try {
        const sessionToken = request.cookies.get(process.env.TOKEN_NAME!)?.value
        
        const verifiedUser = await getUserBySessionToken(sessionToken!);
        // console.log(verifiedUser);

        const allUsers = await getUsers();

        return NextResponse.json({allUsers,verifiedUser});

        
    } catch (error) {
        console.log(error);
    }
}
