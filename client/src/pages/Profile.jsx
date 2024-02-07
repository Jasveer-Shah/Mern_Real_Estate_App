import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

// firebase storage rules =>
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
   const  {currentUser} = useSelector((state) => state.user)
   const fileRef = useRef(null);
   const  [file, setFile] = useState(undefined);
   const [ filePerc, setFilePerc] = useState(0);
   const [fileUploadError, setfileUploadError] = useState(false);
   const [formdata, setFormData] = useState({});
// console.log(file);
// console.log(filePerc);
// console.log(formdata);
// console.log(fileUploadError);

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
           console.log("Upload is " + progress + '% done');
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

return (
    <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
         <form className='flex flex-col gap-4'>
          <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
          <img  onClick={()=> fileRef.current.click()} src={formdata.avatar || currentUser.avatar} alt="profile-pic" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
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
          <input id="username" type="text" placeholder='username' className='border p-3 rounded-lg' />
          <input id="email" type="email" placeholder='email' className='border p-3 rounded-lg' />
          <input id="password" type="password" placeholder='password' className='border p-3 rounded-lg' />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
         </form>

         <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
         </div>
    </div>
  )
}
