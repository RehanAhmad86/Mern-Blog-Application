import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebaseGoogle';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const { currentUser } = useSelector( state => state.user)
    const [image, setImage] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [postError, setPostError] = useState(null)
    const { postId } = useParams()
    //console.log(formData)

    useEffect(() => {
        try {
            setPostError(null)
            const updateUserPost = async () => {
                const result = await fetch(`http://localhost:5000/post/getposts?postId=${postId}`)
                const data = await result.json()
                if (!result.ok) {
                    setPostError(data.message)
                    console.log(data.message)
                    return
                }
                if (result.ok) {
                    setPostError(null)
                    setFormData(data.posts[0])
                }
            }
            updateUserPost()
        }
        catch(error)
        { console.log(error.message) }

    }, [postId])



    const handlePost = async (e) => {
        e.preventDefault()
        try {
            setPostError(null)
            const result = await fetch(`http://localhost:5000/post/update-post/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            })
            const data = await result.json()
            if (!result.ok) {
                setPostError(data.message)
                return
            }
            if (result.ok) {
                console.log(formData)
                setPostError(null)
                navigate(`/post/${data.post.slug}`)
            }
        }
        catch (error) {
            setPostError(error.message)
        }
    }

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
                    setImageUploadError("Error in uploading image!")
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
            <h1 className='text-center text-3xl font-semibold mb-5'>Edit post</h1>
            <form>
                <div className='flex flex-col sm:flex-row gap-4 mb-5'>
                    <TextInput
                        type='text' className='flex-1' placeholder='Title' required
                        value={formData.title}
                        id='title' onChange={event => setFormData({ ...formData, title: event.target.value })}
                    />
                    <Select
                        value={formData.category}
                        onChange={event => setFormData({ ...formData, category: event.target.value })}>
                        <option value='uncategorized'>Select a category</option>
                        <option value='JavaScript'>JavaScript</option>
                        <option value='ReactJs'>React js</option>
                        <option value='NodeJs'>Node js</option>
                        <option value='MongoDB'>Mongo DB</option>
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
                            className='w-full h-80 object-contain p-5'
                        />
                    )
                }

                <ReactQuill theme="snow" className='h-72 mb-14' required
                    onChange={(value) => { setFormData({ ...formData, content: value }) }}
                    value={formData.content} />
                <Button onClick={handlePost} type='submit' className='w-full' gradientDuoTone='purpleToPink'>
                    Update Post</Button>
            </form>
            {
                postError &&
                <Alert className='mt-5' color='failure'>{postError}</Alert>
            }

        </div>
    )
}
