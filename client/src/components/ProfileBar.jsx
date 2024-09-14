import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebaseGoogle.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProfileBar() {
  const { currentUser } = useSelector(state => state.user)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState()
  const [uploadError, setUploadError] = useState(null)
  const imageRef = useRef()

  const handleChange = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      setImage(imageFile)
      setImageUrl(URL.createObjectURL(imageFile))
    }
  }
  useEffect(() => {
    if (image) {
      imageUpload()
    }
  }, [image])
  const imageUpload = async () => {
    setUploadError(null)
    const storage = getStorage(app)
    const name = new Date().getTime() + image.name
    const storageReference = ref(storage, name)
    const uploadTask = uploadBytesResumable(storageReference, image)
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        const progress = (snapShot.bytesTransferred / snapShot.totalBytes * 100)
        setUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setUploadError("Image Upload Failed!")
        setUploadProgress(null)
        setImage(null)
        setImageUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url => {
          setImageUrl(url)
        }))
      }
    )
  }
  return (
    <div className='max-w-lg w-full mx-auto p-3 mt-3'>
      <h1 className='text-center text-3xl font-semibold p-3'>Profile</h1>
      <input type='file' accept='image/*' onChange={handleChange} ref={imageRef} hidden />
      <form className='flex flex-col gap-5'>
        <div className=' relative flex items-center justify-center h-32 w-32 self-center shadow-md cursor-pointer rounded-full overflow-hidden'>
          {
            uploadProgress &&
            (
              <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`}
                strokeWidth={5}
                styles={
                  {
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgb(62,152,199, ${uploadProgress / 100})`
                    }
                  }
                }
              />
            )
          }
          <img src={imageUrl || currentUser.photoUrl}
            className={`h-full w-full rounded-full object-cover ${uploadProgress && uploadProgress < 100 ? 'opacity-60' : ''}`}
            onClick={() => imageRef.current.click()}
          />
        </div>
        {
          uploadError &&
          <Alert color='failure'>{uploadError}</Alert>
        }
        <TextInput type='text' id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput type='text' id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput id='password'
          placeholder='password'
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' >Update</Button>
      </form>
      <div className='text-red-500 text-sm flex justify-between mt-3 px-2'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}

