import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
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
            <FileInput className='' type='file' accept='image/*'/>
            <Button gradientDuoTone='purpleToBlue' outline >Upload image</Button>
        </div>
        <ReactQuill theme="snow" className='h-72 mb-14' required/>
        <Button type='submit' className='w-full' gradientDuoTone='purpleToPink'>Post</Button>
</form>
       
    </div>
  )
}
