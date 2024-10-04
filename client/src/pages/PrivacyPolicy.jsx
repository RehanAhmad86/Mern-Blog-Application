import React from 'react'

export default function PrivacyPolicy() {
    return (
        <div className='min-h-screen max-w-4xl mx-auto p-5'>
            <div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl text-gray-500 dark:text-gray-300 text-center font-semibold'>Privacy Policy</h1>
                    <div className='flex flex-col gap-5 font-medium text-center'>
                        <p className='text-center'>At Rehan Blog, we respect your privacy. This policy outlines how we collect, use,
                            and protect your personal information:
                        </p>
                        <p className='text-center flex flex-col gap-1'>
                           <span><b>Information Collection:</b> We may collect personal information such as your name and email address when you subscribe or contact us.</span><br/>
                           <span><b>Use of Information: </b>  Your information is used to improve our website, respond to inquiries, and send periodic emails.</span><br/>               
                           <span><b>Data Protection: </b> We implement a variety of security measures to maintain the safety of your personal information.</span><br/>         
                           <span><b>Cookies: </b> Our site may use cookies to enhance your experience. You can choose to accept or decline cookies.</span><br/>
                           <span><b>Third-Party Disclosure: </b> We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent.</span><br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
