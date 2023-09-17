import { deleteUserById, getUsers } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest , res: NextResponse)=>{
    try {

        const urlParams = new URL(req.url);
        // console.log(urlParams);
        const id = urlParams.searchParams.get('id')!;

        if(await deleteUserById(id)){

            const response = NextResponse.json({
                message: "LogOut Successfully",
                success: true
            });
            response.cookies.set(process.env.TOKEN_NAME!, "", {
                httpOnly: true,
                expires: new Date(0)
            });

            return NextResponse.json({message: 'User deleted successfully'},response);
        }else{
            return NextResponse.json({message: 'Error deleting user'});
        }


    } catch (error) {
        console.log(error);
    }
}