import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../Redux/user/userSlice';
import { Link } from 'react-router-dom';

// firebase storage rules =>
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
   const { currentUser, loading, error} = useSelector((state) => state.user)
   const fileRef = useRef(null);
   const  [file, setFile] = useState(undefined);
   const [ filePerc, setFilePerc] = useState(0);
   const [fileUploadError, setfileUploadError] = useState(false);
   const [formdata, setFormData] = useState({});
   const [updateSuccess, setUpdateSuccess] = useState(false);
   const dispatch = useDispatch();
   const [showListingsError, setShowListingsError] = useState(false);
   const [userListings, setUserListings] = useState();
// console.log(file);
// console.log(filePerc);
//  console.log(formdata);
// console.log(fileUploadError);
console.log(currentUser);

   useEffect(()=>{
      if(file){
        handleFileUpload(file);
      }
   }, [file]);

  const  handleFileUpload = (file) =>{
       const storage = getStorage(app);
       const fileName = new Date().getTime() + file.name;
       const storageRef = ref(storage, fileName); 
       const uploadTask = uploadBytesResumable(storageRef, file);

       uploadTask.on('state_changed',
       (snapshot) =>{
           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + '% done');
           setFilePerc(Math.round(progress));
       },
       (error)=>{
           setfileUploadError(true);
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
               setFormData({ ...formdata, avatar: downloadURL});
        });
       }
       );
  }

  const handleChange = (e) =>{
      setFormData({ ...formdata, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
          dispatch(updateUserStart());
          if(currentUser.hasOwnProperty('rest')){
            const res = await fetch(`/api/user/update/${currentUser.rest._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formdata),
            });
            const data = await res.json();
            if(data.success === false){
              dispatch(updateUserFailure(data.message));
              return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
          }else{

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formdata),
            });
  
            const data = await res.json();
            if(data.success === false){
              dispatch(updateUserFailure(data.message));
              return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
          }

      }catch(error){
         dispatch(updateUserFailure(error.message));
      }
  }

  const handleDeleteUser = async()=>{
      try {
         dispatch(deleteUserStart());
         const res = await fetch(`/api/user/delete/${currentUser._id}`, {
               method: 'DELETE',
         });
         const data = await res.json();
         if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return
         }
         dispatch(deleteUserSuccess(data));

      }catch(error){
        dispatch(deleteUserFailure(error.message));
      }
  }

 const handleSignOut = async()=>{
     try{
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return
      }
      dispatch(signOutUserSuccess(data));

     }catch(error){
      dispatch(signOutUserFailure(data.message));
     }
 }

 const handleShowListings = async()=>{
       try {
             setShowListingsError(false);
             const res = await fetch(`/api/user/listings/${currentUser._id}`);
             const data = await res.json();
             if(data.success === false){
              setShowListingsError(true);
              return
             }

             setUserListings(data);
       }catch(error){
       setShowListingsError(true);
       }
 }

const handleListingDelete = async (listingId)=>{
       try {
const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
});
   const data = res.json();
   if (data.success === false) {
      console.log(data.message);
      return
   }
   setUserListings((prev) => prev.filter((listing)=> listing._id !== listingId))
         
       }catch(error){
        console.log(error.message);
       }
}

return (
    <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
          <img  src={formdata.avatar || currentUser.avatar}  onClick={()=> fileRef.current.click()}
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            alt="profile"
          />
          <p className='text-sm self-center'>
            { fileUploadError ? (
                 <span className='text-red-700'>Error Image Upload (image must be lass then 2mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
                 <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'> Image successfully uploaded!</span>
            ) : (
              ''
            )
             }
          </p>
          <input id="username" type="text" placeholder='username' className='border p-3 rounded-lg' defaultValue={currentUser.username} onChange={handleChange}/>
          <input id="email" type="email" placeholder='email' className='border p-3 rounded-lg' defaultValue={currentUser.email} onChange={handleChange}/>
          <input id="password" type="password" placeholder='password' className='border p-3 rounded-lg' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
            {loading ? 'Loading' : 'Update'}
            </button>
            <Link to={'/create-listing'} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover: opacity-90'>
              Create Listing
            </Link>
         </form>

         <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser}  className='text-red-700 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
         </div>
         <p className='text-red-700 mt-5'>{error ? error : ''}</p>
         <p className='text-green-700 mt-5'>{updateSuccess ? "User is updated successfully!" : ''}</p>
         <buton onClick={handleShowListings} className="text-green-700  w-full cursor-pointer"> Show Listings</buton>
         <p>{ showListingsError ? "Error showing listings" : ""}</p>
  
          {userListings && userListings.length > 0 &&
          <div className='flex flex-col gap-4'>
            <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
                  {   userListings.map((listing)=>
           
           (        <div className='border rounded-lg p-3 flex justify-between items-center hover:shadow-md gap-4'  key={listing._id} >
                     <Link to={`/listing/${listing._id}`}>
                       <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain rounded-lg'/>
                     </Link>
                     <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate'>
                        <p>{listing.name}</p>
                     </Link>
                     <div className='flex flex-col items-center'>

                       <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>

                       <Link to={`/update-listing/${listing._id}`}>
                       <button className='text-green-700'>Edit</button>
                       </Link>
                       
                     </div>
                   </div>)
         
                   )}
          </div>}
     
    </div>
  )
}
