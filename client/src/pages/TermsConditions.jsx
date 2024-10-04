import React from 'react'

export default function TermsConditions() {
    return (
        <div className='min-h-screen max-w-4xl mx-auto p-5'>
            <div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl text-gray-500 dark:text-gray-300 text-center font-semibold'>Terms & Conditions</h1>
                    <div className='flex flex-col gap-5 font-medium text-center'>
                        <p className='text-center'>Welcome to Rehan Blog! By accessing our website, you agree to 
                          comply with and be bound by the following terms and conditions:
                        </p>
                        <p className='text-center flex flex-col gap-1'>
                           <span><b>Acceptance of Terms: </b>By using our site, you confirm that you accept these terms and conditions and that you agree to abide by them.</span><br/>
                           <span><b>User Responsibility: </b>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</span><br/>               
                           <span><b>Content Ownership: </b>All content on this site, including text, graphics, logos, and images, is the property of Rehan Blog and is protected by copyright laws.</span><br/>         
                           <span><b>User Conduct:</b>You agree not to post or transmit any harmful, unlawful, or objectionable content.</span><br/>
                           <span><b>Limitation of Liability:</b>Rehan Blog shall not be liable for any damages arising from your use of the site or any information contained therein.</span><br/>
                           <span><b>Changes to Terms: </b>We reserve the right to modify these terms at any time, and your continued use of the site constitutes acceptance of those changes.</span><br/>
                           </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
