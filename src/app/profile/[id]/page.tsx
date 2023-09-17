"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }: any) => {
  const router =  useRouter()
  const [userData, setUserData] = useState<any>()
  const [updatedData, setUpdatedData] = useState({
    _id: params.id,
    username: '',
    email: '',
    password: '',
  })

  useEffect ( ()=>{
    const handleUsersData = async (id : any) => {
      try {

        const response = await axios.get(`http://localhost:3000/api/users/profile/updateUser?id=${params.id}`); 
        // console.log(response.data);
        setUserData(response.data);
        
      } catch (error) {
        console.log(error);
      }
    }

    handleUsersData(params);
  },[])
  // console.log(updatedData);

  const handleUpdatedData = async (e: any) =>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/profile/updateUser',{updatedData})
      console.log(response);
      window.alert('Data updated successfully');
      if (response.status===200){
        router.push('/profile');
      }

    } catch (error:any) {
      if(error.response.status === 408){
        window.alert(error.response.data.error);
      }else if(error.response.status === 404){
        window.alert(error.response.data.error);
      }else{
        console.log(error);
      }
    }

  }


  return (
    <div className='flex justify-center items-center'>

      <form className='m-10 p-10 w-6/12' onSubmit={handleUpdatedData}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
          <input type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
          placeholder={userData?.email!}
          value={updatedData.email}
          onChange={(e)=>{setUpdatedData({...updatedData, email: e.target.value})}}
          required />
        </div>

        <div className="mb-6">
          <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your UserName</label>
          <input type="text"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={userData?.username!}
          value={updatedData.username}
          onChange={(e)=>{setUpdatedData({...updatedData, username: e.target.value})}}
          required />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
          <input type="password"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
          value={updatedData.password}
          onChange={(e)=>{setUpdatedData({...updatedData ,password: e.target.value})}}
          required />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input  type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
      </form>

    </div>
  )
}

export default page
