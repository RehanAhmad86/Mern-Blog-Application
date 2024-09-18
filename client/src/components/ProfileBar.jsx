import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebaseGoogle.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutSucces
} from '../redux/User/userSlice.js'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom'


export default function ProfileBar() {
  const dispatch = useDispatch()
  const { currentUser, error } = useSelector(state => state.user)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState()
  const [uploadError, setUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageUploading, setImageUploading] = useState(false)
  const imageRef = useRef()
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [updateError, setUpdateError] = useState(null)
  const [modal, setModal] = useState(null)

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

  const deleteUser = async () => {
    setModal(false)
    try {
      dispatch(deleteUserStart())
      const result = await fetch(`http://localhost:5000/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include"
      })
      console.log(currentUser._id)
      const data = await result.json()
      if (!result.ok) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const signOut = async () => {
    try {
      const result = await fetch('http://localhost:5000/user/signout', {
        method: "POST",
      })
      const data = await result.json()
      if (!result.ok) {
        console.log(data.message)
      }
      dispatch(signOutSucces(data))
    } catch (error) {
      console.log(error.message)
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
        <Button type='submit' gradientDuoTone='purpleToBlue'
          disabled={imageUploading} >
            {/* || Object.keys(formData).length === 0 */}
          {imageUploading ? 'Updating Image...' : 'Update'}
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/create-post'}>
            <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
             Create a post
            </Button>
            </Link>
          )
        }
      </form>
      <div className='text-red-500 text-sm flex justify-between mt-3 px-2'>
        <span onClick={() => setModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={signOut} className='cursor-pointer'>Sign Out</span>
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
      {
        error && (
          <Alert color='failure' className='mt-5'>
            {error}
          </Alert>
        )
      }

      {
        modal && (
          <Modal show={modal} onClose={() => { setModal(false) }} popup size='md'>
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle
                  className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-5 mx-auto border-none 
                outline-none focus:outline-none'
                />
                <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Do you want to Delete Your account?</h3>
              </div>
              <div className='flex justify-center gap-5'>
                <Button onClick={deleteUser} color='failure'>Yes, Delete</Button>
                <Button onClick={() => { setModal(false) }}>No, Cancel</Button>
              </div>
            </Modal.Body>
          </Modal>
        )
      }
    </div>
  )
}

