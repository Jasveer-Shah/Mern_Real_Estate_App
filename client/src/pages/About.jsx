import React from 'react'
import image from '../../public/images/real-estate4.jpg'


export default function About() {
  return (
    <div className='flex flex-col  pt-10  mx-auto gap-4'>
    <div className='flex flex-col sm:flex-row  px-4 max-w-6xl sm:flex:1 mx-auto'>
      <div className='flex flex-col py-20 px-4 max-w-2xl  mx-auto gap-4 bg-slate-50' >
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Dream Estate</h1>
      <p className='mb-4 text-slate-700'>Dream Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
      <p className='mb-4 text-slate-700'>
      Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>
      <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
      </div>
      
     <div className='flex  max-w-2xl sm:flex:1 bg-slate-50 sm:py-10 px-2'>
      <img  className='flex object-cover ' src="https://media.istockphoto.com/id/1498811925/photo/real-estate-agent-or-real-estate-agent-was-holding-the-key-to-the-new-landlord-tenant-or.webp?b=1&s=170667a&w=0&k=20&c=llN8VkgxCJN89WHiL3yByIiQ7HlWSEaHvpTMV_g5Y9U="/>
     </div>
    </div>
     
    <div className='flex  h-[335px] sm:flex-1 bg-slate-50'>
      <img  className='h-[300px] sm:h-[335px]  object-cover' src={image}/>
      <div className='flex flex-col  w-full text-center'>

      <p className='text-white-700 text-lg tracking-wide p-20'>Everyone has dreams and aspirations for a new home, we are here to help you to make your dream come true! </p>
      <h1 className='flex justify-center p-3 tracking-wide text-xl text-white bg-slate-500 hover:shadow-lg cursor-pointer'>Dream Estate</h1>
      </div>
     </div>
 
 
    </div>
  )
}
