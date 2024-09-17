import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebaseGoogle.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/User/userSlice.js'


export default function ProfileBar() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState()
  const [uploadError, setUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageUploading, setImageUploading] = useState(false)
  const imageRef = useRef()
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [updateError, setUpdateError] = useState(null)

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
    setImageUploading(true)
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
        setImageUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url => {
          setImageUrl(url)
          setFormData({ ...formData, photoUrl: url })
          setImageUploading(false)
        }
        ))
      }
    )
  }
  console.log(formData)
    
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateSuccess(null)
    setUpdateError(null)
    if (Object.keys(formData).length === 0) {
      setUpdateError("No changes made!")
      return
    }
    if (imageUploading) {
      setUpdateError("Wait for image to upload!")
      return;
    }
    try {
      dispatch(updateUserStart())
      const result = await fetch(`http://localhost:5000/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
      })
      const data = await result.json()
      console.log(currentUser._id)
      if (!result.ok) {
        dispatch(updateUserFailure(data.message))
        setUpdateError(data.message)
      }
      else {
        dispatch(updateUserSuccess(data))
        setUpdateSuccess("User is updated Successfully!")
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      setUpdateError(error.message)
    }
  }


  return (
    <div className='max-w-lg w-full mx-auto p-3 mt-3'>
      <h1 className='text-center text-3xl font-semibold p-3'>Profile</h1>
      <input type='file' accept='image/*' onChange={handleChange} ref={imageRef} hidden />
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
          onChange={handleFormData}
        />
        <TextInput type='text' id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleFormData}
        />
        <TextInput id='password'
          placeholder='password'
          onChange={handleFormData}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' >Update</Button>
      </form>
      <div className='text-red-500 text-sm flex justify-between mt-3 px-2'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
      {
        updateSuccess && (
          <Alert color='success' className='mt-5'>
            {updateSuccess}
          </Alert>
        )
      }
      {
        updateError && (
          <Alert color='failure' className='mt-5'>
            {updateError}
          </Alert>
        )
      }
    </div>
  )
}

