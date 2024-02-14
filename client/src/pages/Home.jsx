import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

import ListingItem from '../components/ListingItem';

export default function Home() {

  const  [offerListings, setOfferListings] = useState([]);
  const  [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings ] = useState([]);
  SwiperCore.use(Navigation);
  console.log(offerListings)
console.log(saleListings);
  useEffect(()=>{
     // function 1
   const fetchOfferListings = async() =>{
   try{
     const res = await fetch(`/api/listing/get?offer=true&limit=4`);
     const data = await res.json();
     setOfferListings(data);
     fetchRentListings();
     fetchSaleListing();
   }catch(error){
    console.log(error);
   }
   }
    // function 2
    const fetchRentListings = async()=>{
     try{
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
     }catch(error){
      console.log(error);
     }

    }
    // function 3
    const fetchSaleListing = async()=>{
        try{
           const res = await fetch(`/api/listing/get?type=sale&limit=4`);
           const data = await res.json();
           setSaleListings(data);
        }catch(error){
          console.log(error);
        }
    }

   fetchOfferListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>Dream</span>
          <br />
          home with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Dream Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
   </div>
      {/* swiper */}
      <Swiper navigation>

       {
        offerListings && offerListings.length > 0 &&
        offerListings.map((listing)=>(
          <SwiperSlide>
            <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} className='h-[500px]' key={listing._id}>

            </div>
          </SwiperSlide>
        ))
       }
      </Swiper>

   {/* listing results for offer, sale and rent */}

   
   <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='pt-3 flex-1 flex-col bg-slate-700 text-white'>
        <div className='max-w-6xl mx-auto p-8 flex flex-col gap-8 '>
           <div className='flex flex-col flex-1 items-center'>
            <fa-house/>
               <p className='lowercase p-4'>Find your Dream Home with Us</p>
               <button className='uppercase p-6 border-style:solid border-2 border-gray-500 px-12 md:shadow-2xl rounded-lg mt-4  font-bold text-xl hover:bg-slate-800 hover:scale-110 duration-500'>Contact Us</button>
              <h1 className='flex text-center uppercase p-8 font-smibold text-2xl tracking-widest'>Dream Estate</h1>
              <hr className='w-full border-2 cursor-pointer hover:border-slate-500 duration-500'/>
           </div>
        
             {/* <div>
              <h1 className=''>Our Atlanta Locations:</h1>
             </div> */}
         

        </div>
      </div>

    </div>
  )
}
