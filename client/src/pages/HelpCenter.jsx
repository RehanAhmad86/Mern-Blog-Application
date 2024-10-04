import { Button } from 'flowbite-react';
import React from 'react';

export default function HelpCenter() {
    const email = "rehan048686@gmail.com";
    const subject = "Query from Help Center";
    const body = "Please enter your query here...";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const handleButtonClick = () => {
        window.location.href = mailtoLink;
    };

    return (
        <div className='min-h-screen max-w-4xl mx-auto p-5 mt-10'>
            <div>
                <h1 className='text-3xl text-gray-500 dark:text-gray-300 text-center font-semibold'>Help Center</h1>
                <div className='flex flex-col gap-5 font-medium mt-5'>
                    <p>
                        At Rehan Blog, we are dedicated to providing prompt and helpful support to our users. Our team is committed to responding to your inquiries as quickly as possible. Whether you have a question about our content or need assistance with navigating our site, we’re here to help!
                    </p>
                    <p>
                        We have resolved numerous issues for our readers, ranging from account setup questions to content-related inquiries. Your satisfaction is our priority, and we continuously strive to enhance your experience. If you encounter any challenges or have feedback, please don’t hesitate to reach out.
                    </p>
                    <p className='text-center'>For support, please contact us:<b className='ml-2 whitespace-nowrap'>rehan048686@gmail.com</b></p>
                    {/* <div className='border-t mt-5 pt-5 flex gap-5'>
                        <p className='font-bold'>For support, please contact us at:</p>
                        <p>rehan048686@gmail.com</p>
                    </div> */}
                    <Button onClick={handleButtonClick} className='font-medium' gradientDuoTone='pinkToOrange' outline>Email Us!</Button>
                </div>
            </div>
        </div>
    );
}

