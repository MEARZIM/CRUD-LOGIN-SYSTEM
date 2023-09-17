"use client"
import React, { useEffect, useState } from 'react'
import { MdDoNotDisturb } from 'react-icons/md';
import { BiSearchAlt, BiSolidEdit } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5'
import { AiFillDelete } from "react-icons/ai";
import FeatureButton from '@/app/components/buttons/featureButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const page = () => {

    const router = useRouter();
    const [updateMenu, setUpdateMenu] = useState<boolean>(false);
    const [user, setUser] = useState([]);
    const [verifiedUser, setVerifiedUser] = useState<any>();

    useEffect(() => {
        const tokenVerification = async () => {

            try {

                const response = await axios.get('/api/users/profile');
                const { data } = response;
                const { allUsers, verifiedUser } = data;

                setUser(allUsers);
                setVerifiedUser(verifiedUser);

            } catch (error) {
                console.log(error);
            }
        }
        tokenVerification();

    }, [])


    const deleteUser = async (id : string) => {
        console.log(id);
        try {
            
            const response = await axios.delete(`/api/users/profile/deleteUser?id=${id}`);
            console.log(response.status);
            if (response.status === 200) {
                router.push('/login');           
            }else{
                console.log(response.status);
            }
            

        } catch (error) {
            console.log(error);
        }
    }



    // console.log(verifiedUser, user);
    return (
        <div>
            <div className='mt-16'>

                <section className="bg-gray-50 dark:bg-white-900 p-3 sm:p-5 antialiased">
                    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-1/2">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <BiSearchAlt size={25} color="white" />
                                            </div>
                                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div className="overflow-x-auto">
                                <table className="text-center w-full text-m text-gray-500 dark:text-gray-400 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-4 py-4">UserName</th>
                                            <th scope="col" className="px-4 py-3">Email</th>
                                            <th scope="col" className="px-4 py-3">ID</th>
                                            <th scope="col" className="px-4 py-3">Edit</th>
                                            <th scope="col" className="px-4 py-3">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody className='max-h-2 '>
                                        {user.map((usersData: any, index) => (
                                            <tr key={index} className=" border-b dark:border-gray-700">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{usersData?.username}</th>
                                                <td className="px-4 py-3">{usersData.email}</td>
                                                <td className="px-4 py-3">{usersData._id}</td>
                                                <td className="px-4 py-3 ">

                                                    {verifiedUser._id === usersData._id ?
                                                        (<button className='hover:cursor-pointer'
                                                            onClick={() => {
                                                                router.push(`profile/${usersData._id}`);
                                                            }}>
                                                                {/* edit button */}
                                                            <BiSolidEdit size={20} />
                                                        </button>) : (<button className='hover:cursor-pointer'>
                                                                {/* preview button */}
                                                            <IoEyeSharp size={20} />
                                                        </button>)
                                                    }

                                                </td>
                                                <td className="px-4 py-3 " >

                                                    {verifiedUser._id === usersData._id ?
                                                        (<button className='hover:cursor-pointer' onClick={()=>{
                                                            window.alert("Your account has been deleted successfully");
                                                            deleteUser(verifiedUser._id)
                                                        }}>
                                                            <AiFillDelete size={20} color="red" />
                                                        </button>) : (<button className='hover:cursor-no-drop' >
                                                            <MdDoNotDisturb size={20} color="red" />
                                                        </button>)
                                                    }

                                                </td>

                                            </tr>
                                        ))}


                                    </tbody>


                                </table>

                            </div>

                        </div>
                    </div>
                </section>



            </div>
        </div>
    )
}

export default page
