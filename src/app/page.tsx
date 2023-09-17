import React from 'react'
import ProfileIMG from '../assets/me1.png'
import BannerIMG from '../assets/banner.png'
import Image from 'next/image'

export default function Home(): React.JSX.Element {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src="https://i.ytimg.com/vi/amxclbwoSkk/maxresdefault.jpg" />
            </div>
            <div className="flex flex-row sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <Image src={ProfileIMG} className='h-20 w-20 rounded-full' alt="profile" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Ayan Saha</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">Builded a full-stack CRUD application with login system on Nextjs. Hopefully it will increase you Nextjs 
                  knowledge.
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">

                <p className="leading-relaxed text-lg mb-4">
                A CRUD (Create, Read, Update, Delete) application is a fundamental software system that serves as the backbone 
                for managing data in various domains. One prominent use case for a CRUD application is in customer relationship 
                management (CRM) systems. <br/>
                A login and registration application is a fundamental component in numerous digital platforms, enabling user authentication and onboarding. 
                One prominent use case for such an application is in the context of a social media platform.
                </p>

                <span className="text-indigo-500 inline-flex items-center">Thank you...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
