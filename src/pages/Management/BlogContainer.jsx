import React, { useEffect } from 'react'
import { getBlogs } from './api'
import config from '../../config/config'
import { useNavigate } from 'react-router-dom'

function BlogContainer() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = React.useState([])
    useEffect(() => {
        getBlogs().then(res => {
            console.log(res)
            setBlogs(res.data)

        })
    }, [])
  return (
    <div className='mb-10'>
        <div className='text-center text-2xl text-primary font-custom-bold mt-10 mb-5'>My Blogs</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 container mx-auto '>
            {
                blogs && blogs.map(blog => {
                    return (
                        <div key={blog.id} className='flex gap-5 h-30 w-full cursor-pointer'
                        onClick={() => {
                            navigate(`/management/blog/${blog.id}`,{state: {blog: blog}})
                        }}
                        >
                            <div className='w-96 justify-center rounded-lg'>
                                <img src={`${config.STRAPI_URL}`+blog.attributes.headerImage.data.attributes.url} alt={`${config.STRAPI_URL}/`+blog.attributes.headerImage.data.attributes.url} className='h-32 w-full object-stretch'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='text-lg font-bold'>{blog.attributes.title}</div>
                                <div className='text-sm pr-10 line-clamp-3'>{blog.attributes.description}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BlogContainer