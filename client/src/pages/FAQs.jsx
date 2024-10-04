import { Button } from 'flowbite-react';
import React from 'react';

export default function FAQs() {
    const email = 'rehan048686@gmail.com'
    const subject = 'Asking questions'
    const body = 'Write down your questions please!'
    const mail = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const SendEmail = () => {
        window.location.href = mail
    }
    return (
        <div className='min-h-screen max-w-4xl mx-auto p-5'>
            <div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl text-gray-500 dark:text-gray-300 text-center font-semibold'>Frequently Asked Questions</h1>
                    <div className='flex flex-col gap-5 font-medium'>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>What is Rehan Blog?</p>
                            <p>Rehan Blog is a platform for sharing engaging and insightful content on various topics.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>How can I contact you?</p>
                            <p>You can reach us at rehan048686@gmail.com for any inquiries or support.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>Can I contribute to the blog?</p>
                            <p>Yes! We welcome guest contributions. Please reach out via email for more details.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>What kind of topics do you cover?</p>
                            <p>We cover a wide range of topics, including technology, lifestyle, personal growth, and more.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>Is my personal information safe?</p>
                            <p>Yes, we take your privacy seriously and implement measures to protect your information.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>How often do you publish new content?</p>
                            <p>We aim to publish new articles regularly. Stay tuned for updates!</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>What should I do if I find inappropriate content?</p>
                            <p>Please report any inappropriate content to us at rehan048686@gmail.com.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>Can I share articles from Rehan Blog?</p>
                            <p>Yes, feel free to share our articles, but please credit Rehan Blog.</p>
                        </div>
                        <div className='border-b pb-3'>
                            <p className='font-bold'>Do you have a mobile app?</p>
                            <p>Currently, we do not have a mobile app, but our site is mobile-friendly.</p>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <p className='font-semibold text-center'>Have more Questions? Mail us!</p>
                            <Button onClick={SendEmail} className='font-medium w-full m-2' gradientDuoTone='pinkToOrange' outline>Send Mail</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

