"use client"
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import {FiLogOut} from 'react-icons/fi'


const navbar = () => {

    const location = usePathname();
    const router = useRouter();

    const handelLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="" className="flex items-center">
                        <img src="https://assets.website-files.com/5ff66329429d880392f6cba2/63fdf75ad4a978704fe9ac9c_CRUD%20%20Preview.jpeg" className="h-10 mr-3" alt="Logo" />
                        <span className="self-center text-l font-semibold whitespace-nowrap dark:text-white">CRUD-LOGIN-SYSTEM</span>
                    </Link>
                    <div className="flex md:order-2">
                        <button type="button"
                            className={`text-rose-700 bg-blue-700 hover:bg-blue-800 
                                        focus:ring-4 focus:outline-none
                                        focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                                        text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700
                                      dark:focus:ring-rose-700 ${location.startsWith('/profile') ? null : 'hidden' }` 
                                }
                            
                            onClick={handelLogout}
                        >
                            <FiLogOut color='red'/> LogOut
                        </button>

                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="register" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</Link>
                            </li>
                            <li>
                                <Link href="" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default navbar
