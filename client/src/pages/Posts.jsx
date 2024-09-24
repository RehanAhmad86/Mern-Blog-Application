import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner, Button } from "flowbite-react";
import CallToAction from '../components/CallToAction';

export default function Posts() {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const result = await fetch(`http://localhost:5000/post/getposts?slug=${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const data = await result.json()
                if (!result.ok) {
                    setError(true)
                    setLoading(false)
                    return
                }
                if (result.ok) {
                    setError(false)
                    setPost(data.posts[0])
                    setLoading(false)
                }
            }
            fetchPost()
        }
        catch (error) { console.log(error) }
    }, [slug])

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen' >
            <Spinner color="purple" size="xl" />
        </div>
    }

    console.log(post)

    return (
        <main className='min-h-screen flex flex-col max-w-6xl mx-auto p-3'>
            <h1
                className='text-3xl mx-auto p-3 text-center font-serif max-w-2xl mt-5
            lg:text-4xl'>{post && post.title}
            </h1>
            <Link className='self-center mt-5' to={`/search?category=${post && post.category}`}>
                <Button color='gray' pill size='sm'>
                    {post && post.category}
                </Button>
            </Link>
            <img
                src={post.imageUrl}
                alt={post.slug}
                className='mt-5 max-h-[600px] object-cover w-full p-3'
            />
            <div className='flex justify-between p-3 mx-auto w-full text-sm border-b border-gray-400'>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post && (post.content.length / 1000).toFixed(0)} minute read.</span>
            </div>

            <div dangerouslySetInnerHTML={{ __html: post && post.content }}
                className='max-w-2xl w-full mt-5 p-3 mx-auto postStyling'>
            </div>
            <div className='max-w-4xl mx-auto p-5 w-full'>
               <CallToAction/>
            </div>
        </main>
    )
}
