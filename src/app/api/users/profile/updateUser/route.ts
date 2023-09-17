import { authentication } from "@/helpers/encryption";
import { getUserByEmail, getUserById, updateUserById } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse)=>{
    try {

        const urlParams = new URL(req.url);
        const id = urlParams.searchParams.get('id')
        // console.log(id);

        const userDetails = await getUserById(id!);
        // console.log(userDetails);

        return NextResponse.json(userDetails);
        
    } catch (error) {
        console.log(error)
    }
}

export const POST =  async (req: NextRequest, res: NextResponse) => {
    try {

        const body = await req.json();
        const resData = body.updatedData;
        // console.log(body.updatedData);

        const getFormDataBase = await getUserById(resData._id);
        // console.log(getFormDataBase);

        if(resData._id == getFormDataBase._id) {

            const verifiedUser = await getUserByEmail(getFormDataBase.email).select('+authentication.salt + authentication.password');

            if (!verifiedUser) {
                return NextResponse.json({ error: "User Not Found" },{status: 404});
            }
            
            if (verifiedUser.authentication && verifiedUser.authentication.salt) {
    
                const expectedHash = authentication(verifiedUser.authentication.salt, resData.password);
              
                if (expectedHash !== verifiedUser.authentication.password) {
    
                    // If passwords do not match, return an error response with a 408 status code
                    return NextResponse.json({ error: "Password Not matched" }, { status: 408 });
    
                } else {
    
                    // Passwords match
                    // console.log("Passwords match");
                    const response = await updateUserById(resData._id, resData)

                    return NextResponse.json({message: "OK"},response);
                }
        }else{
            return NextResponse.json({message: "User Not Found"},{status: 404});
        }
    }
        
    } catch (error) {
        console.log(error);
    }

}