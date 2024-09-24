import React from 'react'
import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row gap-3 border-2 border-teal-300 p-5 rounded-tl-3xl rounded-br-3xl'>
            <div className='flex flex-col gap-2 justify-center items-center text-center '>
                <h1 className='text-2xl'>Learn JavaScript in 100 days</h1>
                <p className='text-gray-300'>Join our community of web Development & learn web Development.</p>
                <a href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>
                    <Button
                    gradientDuoTone='purpleToPink' className='rounded-tr-sm rounded-bl-sm min-w-44'>
                    Learn More
                    </Button>
                </a>
            </div>
            <div className='p-3 max-w-4xl mx-auto w-full'>
                <img
                    className='rounded-xl'
                    src='https://www.i2tutorials.com/wp-content/media/2018/11/Java-Scripti2tutorials.com_.png'
                    alt='js-image'
                />
            </div>
        </div>
    )
}
