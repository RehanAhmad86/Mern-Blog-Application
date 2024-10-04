import { Footer, FooterDivider, FooterTitle } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsInstagram, BsDribbble, BsTwitter, BsThreads } from 'react-icons/bs';

export default function FooterComponent() {
    return (
        <Footer container className='border border-t-8 border-teal-400 flex flex-col'>
            <div className='w-full flex justify-around items-center max-w-7xl mx-auto gap-5 mb-3 p-3 sm:px-5'>
                <div>
                    <Link to={'/'} className='self-center whitespace-nowrap font-semibold text-xl sm:text-3xl dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Rehan</span>
                        Blog</Link>
                </div>

                <div className='grid grid-cols-2 mt-4 sm:grid-cols-4 gap-5'>
                    <div>
                        <FooterTitle title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='http://www.100jsprojects.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                100 JS Projects
                            </Footer.Link>
                            <Link to='/about'>
                                <Footer.Link>
                                    About
                                </Footer.Link>
                            </Link>
                        </Footer.LinkGroup>
                    </div>

                    <div>
                        <FooterTitle title='Follow Us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://github.com/RehanAhmad86'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Github
                            </Footer.Link>
                            <Footer.Link
                                href='https://www.linkedin.com/in/rehan-ahmad-05ba0a2a2/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Linked In
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Legal' />
                        <Footer.LinkGroup col>
                            <Link to='/privacy-policy'>
                                <Footer.Link>
                                    Privacy Policy
                                </Footer.Link>
                            </Link>
                            <Link to='/terms-conditions'>
                                <Footer.Link>
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Customer Support' />
                        <Footer.LinkGroup col>
                            <Link to='/faqs'>
                                <Footer.Link>
                                    FAQ's
                                </Footer.Link>
                            </Link>
                            <Link to='/help-center'>
                                <Footer.Link>
                                    Help Center
                                </Footer.Link>
                            </Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col sm:flex-row justify-between p-3 sm:px-10 items-center gap-3'>
                <Footer.Copyright year={new Date().getFullYear()} by="Rehan's Blog" href='#' />
                <div className='flex gap-5'>
                    <Footer.Icon href='#' icon={BsTwitter} />
                    <Footer.Icon href='#' icon={BsFacebook} />
                    <Footer.Icon href='https://github.com/RehanAhmad86' icon={BsGithub} />
                    <Footer.Icon href='#' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsDribbble} />
                    <Footer.Icon href='#' icon={BsThreads} />
                </div>
            </div>
        </Footer>
    );
}
