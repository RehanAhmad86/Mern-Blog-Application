import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebaseGoogle';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function CreatePost() {
  const [image, setImage] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})

  const imageUpload = () => {
    if (!image) {
      setImageUploadError("No image is selected!")
      return;
    }
    try {
      setImageUploadError(null)
      //setImageUploadProgress(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + image
      const storageReference = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageReference, image)
      uploadTask.on(
        'state_changed',
        (snapShot) => {
          const progress = (snapShot.bytesTransferred / snapShot.totalBytes * 100)
          setImageUploadProgress(Number(progress.toFixed(0)))
        },
        (error) => {
          imageUploadError("Error in uploading image!")
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUploadError(null)
            setImageUploadProgress(null)
            setFormData({
              ...formData,
              imageUrl: url
            })
          })
        }
      )
    } catch (error) {
      console.log(error)
      setImageUploadError(error.message)
    }
  }


  return (
    <div className='p-5 max-w-5xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl font-semibold mb-5'>Create post</h1>
      <form>
        <div className='flex flex-col sm:flex-row gap-4 mb-5'>
          <TextInput
            type='text' className='flex-1' placeholder='Title' required
            id='title'
          />
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='JavaScript'>JavaScript</option>
            <option value='Reactjs'>React js</option>
            <option value='Nodejs'>Node js</option>
            <option value='mongodb'>Mongo DB</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between p-3 border-2
        border-gray-300 border-dashed rounded-lg mb-5'>
          <FileInput className='' type='file' accept='image/*' onChange={event => setImage(event.target.files[0])} />
          <Button disabled={imageUploadProgress} gradientDuoTone='purpleToBlue' outline onClick={imageUpload} >
            {
              imageUploadProgress ? (
                <CircularProgressbar className='w-10 h-10' value={imageUploadProgress} text={`${imageUploadProgress}`} />
              ) : (
                'Upload image'
              )
            }
          </Button>
        </div>
        {
          imageUploadError && (
            <Alert className='m-3' color='failure'>{imageUploadError}</Alert>
          )
        }
        {
          imageUploadProgress > 0 && imageUploadProgress < 100 && (
            <Alert className='m-3' color='success'>Image is {imageUploadProgress} uploaded!</Alert>
          )
        }
        {
          formData.imageUrl &&
          (
            <img
              src={formData.imageUrl}
              className='w-full h-80 object-contain'
            />
          )
        }

        <ReactQuill theme="snow" className='h-72 mb-14' required />
        <Button type='submit' className='w-full' gradientDuoTone='purpleToPink'>Post</Button>
      </form>

    </div>
  )
}
